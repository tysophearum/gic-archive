import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Avatar,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  Pagination,
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { CheckIcon } from "../icons/CheckIcon";
import ViewDetail from "../components/ViewDetail";
import Feedbacks from "../components/Feedbacks";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import unixToTime from "../util/unixToTime";
import ConfirmationAlert from "./ConfirmationAlert";
import BannerLoading from "./loading/BannerLoading";

const ManageUnapprovedClassProjectTable = ({classProjectCategoryId}) => {
  const viewPopup = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const classProjectResponse = useQuery(QUERIES.listUnapprovedClassProjectByCategory, {
    variables: {
      categoryId: classProjectCategoryId,
      pager: {
        page: page,
        limit: parseInt(limit),
      }
    },
  });
  const classProjectCategoryResponse = useQuery(QUERIES.getClassProjectCategoryById, {
    variables: {
      categoryId: classProjectCategoryId,
    },
  })
  const [viewQuery, setViewQuery] = useState(null);
  const [selectedId,  setSelectedId] = useState(null);
  const [deleteClassProject] = useMutation(QUERIES.deleteClassProject);
  const [approveClassProject] = useMutation(QUERIES.updateClassProjectApproval);

  useEffect(() => {
    try {
      classProjectResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }, [page, limit])

  const handleDeleteClassProject = async (classProjectId) => {
    try {
      await deleteClassProject({ variables: { classProjectId } });
      classProjectResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  const handleApproveClassProject = async (classProjectId) => {
    const { errors } = await approveClassProject({ variables: { classProjectId,  approval: true } });
    if (errors) {
      console.log(errors);
    }
    classProjectResponse.refetch()
  }

  if (classProjectResponse.loading || classProjectCategoryResponse.loading) {
    return <BannerLoading />; // Render loading state
  }
  if (classProjectResponse.error || classProjectCategoryResponse.error) {
    return <p>Error: {classProjectResponse.error.message}</p>; // Render error state
  }
  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <>
            <h1 className="text-2xl font-semibold">{classProjectCategoryResponse.data.getClassProjectCategoryById.name}</h1>
          </>
        }
        bottomContent={
          <div className="flex">
            <Pagination
              total={classProjectResponse.data.listUnapprovedClassProjectByCategory.pagination.totalPages}
              initialPage={1}
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
          <TableColumn>TITLE</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {classProjectResponse.data.listUnapprovedClassProjectByCategory.data.map((classProject) => {
            return (
              <TableRow key={classProject.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `${classProject.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}` }}
                    description={classProject.description.substring(0, 10)}
                    name={classProject.title}
                  >
                    some
                  </User>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6 text-tiny" />
                    <p className="text-bold text-sm capitalize ml-1">{classProject.user.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {unixToTime(classProject.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="View project">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                        setSelectedId(classProject.id);
                        setViewQuery(QUERIES.getClassProjectById);
                        viewPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Approve project">
                      <span>
                        <ConfirmationAlert
                          buttonText="Approve"
                          color="primary"
                          title={"Approval comfirmation"}
                          ActionButton={({ onPress }) => (
                            <span className="text-lg text-primary cursor-pointer active:opacity-50"  onClick={onPress}>
                              <CheckIcon />
                            </span>
                          )} message={"Are you sure you want to approve this document?"}
                          action={() => {handleApproveClassProject(classProject.id)}}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete project">
                      <span>
                        <ConfirmationAlert
                          buttonText="Delete"
                          color="danger"
                          title={"Delete comfirmation"}
                          ActionButton={({ onPress }) => (
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={onPress}>
                              <DeleteIcon />
                            </span>
                          )} message={"Are you sure you want to delete this document?"}
                          action={() => {handleDeleteClassProject(classProject.id)}}
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
      <Modal
        isOpen={viewPopup.isOpen}
        onOpenChange={viewPopup.onOpenChange}
        size="full"
        placement='bottom'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeIn",
              },
            },
            exit: {
              y: 20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }
          }
        }}
      >
        <ModalContent className="h-[97%] overflow-scroll !rounded-t-3xl">
          {() => (
            <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
              <ViewDetail query={viewQuery} variables={{ classProjectId: selectedId }} />
              <Feedbacks type={'classProject'} id={selectedId} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageUnapprovedClassProjectTable;