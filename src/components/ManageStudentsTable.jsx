import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Button,
  Tooltip,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Tabs,
  Tab
} from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useMutation, useQuery } from "@apollo/client";
import QUERIES from "../util/queries";
import axios from "axios";
import EditProfileForm from "../components/EditProfileForm";
import fetchData from '../util/fetchData';
import BannerLoading from "./loading/BannerLoading";
import ConfirmationAlert from "./ConfirmationAlert";

const ManageStudentsTable = () => {
  const profilePopup = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [students, setStudents] = useState([]);
  const endpoint = process.env.REACT_APP_GRAPHQL;

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const [selectedViewUser, setSelectedViewUser] = useState(null);

  const [csvFile, setCsvFile] = useState(null)

  const { data, loading, error, refetch } = useQuery(QUERIES.listStudents, {
    variables: {
      pager: {
        page: page,
        limit: parseInt(limit),
      }
    }
  })

  const [createUser] = useMutation(QUERIES.register)
  const [deleteUser] = useMutation(QUERIES.deleteUserById)

  const handleDeleteUser = async (id) => {
    const { errors } = await deleteUser({ variables: { userId: id } });
    if (errors) {
      console.log(errors);
    }
    refetch()
    onClose()
  }

  const handleCreateUser = async () => {
    const { errors } = await createUser({ variables: { user: { name, studentId, email, password, gender } } });
    if (errors) {
      console.log(errors);
    }
    refetch()
    onClose()
  }

  const handleUploadCSV = () => {
    if (!csvFile) {
      alert('No CSV file was uploaded')
    }
    let formData = new FormData();
    formData.append('file', csvFile)
    axios.post(process.env.REACT_APP_ENDPOINT+'/upload/user/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data);
        refetch()
        onClose()
      })
      .catch(err => {
        console.log(err);
      })
  }
  async function searchStudent(input) {
    try {
      const [responseData, error] = await fetchData(endpoint, QUERIES.searchStudents, { name: input });
      if (error) {
        throw new Error(error.message);
      }
      return responseData.searchStudents;
    } catch (error) {
      console.log(error);
    }
  }
  const onSearchStudentInputChange = async (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      const result = await searchStudent(value);
      console.log(result);
      setStudents(result);
    }
    else if (value.length === 0) {
      refetch();
      setStudents(data.listStudents?.users);
    }
  }

  useEffect(() => {
    try {
      if (data && data.listStudents) {
        setStudents(data.listStudents?.users);
      }
      refetch()
    } catch (error) {
      console.log(error);
    }
  }, [page, limit, data])

  if (loading) return <BannerLoading />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create user</ModalHeader>
              <Tabs className="mx-6">
                <Tab title="Add one user">
                  <ModalBody>
                    <div className="grid grid-cols-[80%,20%] gap-3">
                      <Input
                        autoFocus
                        placeholder="Enter student name"
                        variant="bordered"
                        value={name}
                        onValueChange={(value) => setName(value)}
                      />
                      <Select
                        label="Gender"
                        value={gender}
                        onChange={(e) => { setGender('male') }}
                      >
                        <SelectItem value="male">
                          male
                        </SelectItem>
                        <SelectItem value="female">
                          female
                        </SelectItem>
                      </Select>
                    </div>
                    <Input
                      placeholder="Enter student id"
                      variant="bordered"
                      value={studentId}
                      onValueChange={(value) => setStudentId(value)}
                    />
                    <Input
                      placeholder="Enter student email"
                      variant="bordered"
                      value={email}
                      onValueChange={(value) => setEmail(value)}
                    />
                    <Input
                      placeholder="Enter student password"
                      variant="bordered"
                      type="password"
                      value={password}
                      onValueChange={(value) => setPassword(value)}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary"
                      onPress={handleCreateUser}
                    >
                      Create
                    </Button>
                  </ModalFooter>
                </Tab>
                <Tab title="CSV import" className="px-6">
                  <div className="h-44 border border-dashed border-gray-500 rounded-xl flex items-center justify-center">
                    {/* <label className="flex items-center justify-center border-2 rounded-full bg-gray-50 text-yellow-500 ml-[-40px] mt-[-2] z-50">
                      <Button startContent={<UploadIcon height={24} width={24} />}>Upload file</Button> */}
                    <input type="file" onChange={(e) => { setCsvFile(e.target.files[0]) }} />
                    {/* </label> */}
                  </div>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary"
                      onPress={handleUploadCSV}
                    >
                      Create
                    </Button>
                  </ModalFooter>
                </Tab>
              </Tabs>

            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Manage Students</h1>
            <div className="flex items-center justify-end w-1/2">
              <Input className="mr-2 w-56" size="sm" placeholder='Search for student' onChange={onSearchStudentInputChange} />
              <Button color="primary" onPress={onOpen} >
                Add User(s)
              </Button>
            </div>
          </div>
        }
        bottomContent={
          <div className="flex">
            <Pagination
              total={data.listStudents.pagination.totalPages}
              initialPage={data.listStudents.pagination.currentPage}
              shadow
              onChange={(page) => setPage(page)}
              showControls />
            <label className="flex items-center text-default-400 text-small ml-3">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small"
                onChange={(e) => { setLimit(e.target.value) }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        }
      >
        <TableHeader columns="{columns}">
          <TableColumn>NAME</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>GENDER</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {students?.map((student) => {
            return (
              <TableRow key={student.id}>
                <TableCell>
                  <User
                    avatarProps={{ 
                      radius: "lg",
                      src: `${student.image ? student.image : "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`
                    }}
                    description={student.studentId}
                    name={student.name}
                  >
                    some
                  </User>
                </TableCell>
                <TableCell>
                  <p className="text-bold text-sm capitalize ml-1">{student.studentId}</p>
                </TableCell>
                <TableCell>
                  {student.gender}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip color="primary" content="Edit user">
                      <span onClick={() => {setSelectedViewUser(student); profilePopup.onOpen()}} className="text-lg text-primary cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                      <span>
                        <ConfirmationAlert
                          buttonText="Delete"
                          color="danger"
                          title={"Delete comfirmation"}
                          ActionButton={({ onPress }) => (
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={onPress}>
                              <DeleteIcon />
                            </span>
                          )} message={"Are you sure you want to delete this user?"}
                          action={() => {handleDeleteUser(student.id)}}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          }
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={profilePopup.isOpen}
        placement='center'
        onOpenChange={profilePopup.onOpenChange}
        size="2xl"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <EditProfileForm onClose={onClose} onComplete={refetch} user={selectedViewUser} />
            // <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quae possimus ab quam sunt, quas aliquid tempora labore tempore perspiciatis. Dolorem accusantium dolores voluptatibus reiciendis vel itaque consequatur cupiditate fugiat?</p>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageStudentsTable;