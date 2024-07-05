import React, { useState } from "react";
import {
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell,
  Tooltip,
  Modal,
  ModalContent,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EditIcon } from "../../../icons/EditIcon";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { useQuery } from "@apollo/client";
import QUERIES from "../../../util/queries";
import CreateClassProjectCategoryForm from "../../../components/CreateClassProjectCategoryForm";
import { useMutation } from "@apollo/client";
import EditClassProjectCategoryForm from "../../../components/EditClassProjectCategoryForm";
import DeleteItemConfirmation from "../../../components/DeleteItemConfirmation";
import BannerLoading from "../../../components/loading/BannerLoading";
import ConfirmationAlert from "../../../components/ConfirmationAlert";

const ManageClassProjectCategory = () => {
  const { data, error, loading, refetch } = useQuery(QUERIES.listClassProjectCategory);
  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const [editId, setEditId] = useState(null);
  const [deleteClassProjectCategory] = useMutation(QUERIES.deleteClassProjectCategory);

  const handleDeleteClassProjectCategory = (classProjectId) => {
    deleteClassProjectCategory({
      variables: {
        classProjectId,
      },
    })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (loading) {
    return (
      <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
        <BannerLoading />
      </div>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Modal isOpen={false} size="xl">
        <ModalContent>
          {(onClose) => (
            <DeleteItemConfirmation onClose={onClose} />
          )}
        </ModalContent>
      </Modal>
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/adminDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Manage Project Category</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        <Modal size="2xl" placement="center" isOpen={createModal.isOpen} onOpenChange={createModal.onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <CreateClassProjectCategoryForm onClose={onClose} onComplete={refetch} />
            )}
          </ModalContent>
        </Modal>
        <h1 className=" font-semibold text-2xl mb-4">Manage Project Category</h1>
        <Divider />
        <Table
          className=" mt-4"
          topContent={
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-xl">Class Project Categories</h1>
              <Button onPress={createModal.onOpen} startContent={<h1 className="text-xl">+</h1>} color="primary" className="text-white font-semibold">Create</Button>
            </div>
          }
          aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {data.listClassProjectCategory.map((category) => {
              return (
                <TableRow>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip color="primary" content="Edit">
                        <span
                          onClick={() => {
                            setEditId(category.id);
                            editModal.onOpen();
                          }}
                          className="text-lg cursor-pointer active:opacity-50 text-primary">
                          <EditIcon height={18} width={18} />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete">
                        <span>
                          <ConfirmationAlert
                            buttonText="Delete"
                            color="danger"
                            title={"Delete comfirmation"}
                            ActionButton={({ onPress }) => (
                              <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={onPress}>
                                <DeleteIcon />
                              </span>
                            )} message={"Are you sure you want to delete this category?"}
                            action={() => { handleDeleteClassProjectCategory(category.id) }}
                          />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Modal size="2xl" placement="center" isOpen={editModal.isOpen} onOpenChange={editModal.onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <EditClassProjectCategoryForm onClose={onClose} onComplete={refetch} categoryId={editId} />
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default ManageClassProjectCategory;