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
import { EyeIcon } from "../icons/EyeIcon";
import { useMutation, useQuery } from "@apollo/client";
import QUERIES from "../util/queries";
import axios from "axios";

const ManageStudentsTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

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

  const handleCreateUser = async () => {
    const { data, errors } = await createUser({ variables: { user: { name, studentId, email, password, gender } } });
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
    axios.post('http://localhost:4000/upload/user/csv', formData, {
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

  useEffect(() => {
    try {
      refetch()
    } catch (error) {
      console.log(error);
    }
  }, [page, limit])

  if (loading) return <p>Loading...</p>;
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
                      <input type="file" onChange={(e) => {setCsvFile(e.target.files[0])}}/>
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
            <Button color="primary" onPress={onOpen}>
              Add User(s)
            </Button>
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
          {data.listStudents.users.map((student) => {
            return (
              <TableRow key={student.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg" }}
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
                    <Tooltip content="View user">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Edit document">
                      <span className="text-lg text-primary cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete document">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50" >
                        <DeleteIcon />
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
    </>
  );
}

export default ManageStudentsTable;