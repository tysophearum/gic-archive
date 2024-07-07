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
} from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { useMutation, useQuery } from "@apollo/client";
import QUERIES from "../util/queries";
import EditProfileForm from "../components/EditProfileForm";
import BannerLoading from "./loading/BannerLoading";
import ConfirmationAlert from "./ConfirmationAlert";

const ManageAdminsTable = () => {
  const profilePopup = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [teachers, setTeachers] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const [selectedViewUser, setSelectedViewUser] = useState(null);

  const { data, loading, error, refetch } = useQuery(QUERIES.listAdmins, {
    variables: {
      pager: {
        page: page,
        limit: parseInt(limit),
      }
    }
  })

  const [createUser] = useMutation(QUERIES.registerAdmin)
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
    const { errors } = await createUser({ variables: { user: { name, studentId: "Admin", email, password, gender } } });
    if (errors) {
      console.log(errors);
    }
    refetch()
    onClose()
  }

  useEffect(() => {
    try {
      if (data && data.listAdmins) {
        setTeachers(data.listAdmins?.users);
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
              <ModalBody>
                <div className="grid grid-cols-[80%,20%] gap-3">
                  <Input
                    autoFocus
                    placeholder="Enter teacher name"
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
                  placeholder="Enter teacher email"
                  variant="bordered"
                  value={email}
                  onValueChange={(value) => setEmail(value)}
                />
                <Input
                  placeholder="Enter teacher password"
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
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Manage Teachers</h1>
            <div className="flex items-center justify-end w-1/2">
              <Button color="primary" onPress={onOpen}>
                Add User(s)
              </Button>
            </div>
          </div>
        }
        bottomContent={
          <div className="flex">
            <Pagination
              total={data.listAdmins.pagination.totalPages}
              initialPage={data.listAdmins.pagination.currentPage}
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
          {teachers?.map((admin) => {
            return (
              <TableRow key={admin.id}>
                <TableCell>
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: `${admin.image ? admin.image : "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`
                    }}
                    description={admin.studentId}
                    name={admin.name}
                  >
                    some
                  </User>
                </TableCell>
                <TableCell>
                  <p className="text-bold text-sm capitalize ml-1">{admin.studentId}</p>
                </TableCell>
                <TableCell>
                  {admin.gender}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip color="primary" content="Edit user">
                      <span onClick={() => { setSelectedViewUser(admin); profilePopup.onOpen() }} className="text-lg text-primary cursor-pointer active:opacity-50">
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
                          action={() => {handleDeleteUser(admin.id)}}
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
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageAdminsTable;