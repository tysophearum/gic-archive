import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, useDisclosure, Modal, ModalContent, Pagination } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import ViewDetail from "./ViewDetail";
import Feedbacks from "./Feedbacks";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function PendingPostTable({ fetchData }) {
  const viewThesisPopup = useDisclosure();
  const viewClassProjectPopup = useDisclosure();
  const classProjectResponse = useQuery(QUERIES.listMyUnapprovedClassProject);
  const thesisResponse = useQuery(QUERIES.listMyUnapprovedThesis);
  const [viewQuery, setViewQuery] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [deleteClassProject] = useMutation(QUERIES.deleteClassProject);
  const [deleteThesis] = useMutation(QUERIES.deleteThesis);

  useEffect(() => {
    thesisResponse.refetch()
    classProjectResponse.refetch()
  }, [fetchData])

  const handleDeleteClassProject = async (classProjectId) => {
    try {
      const { data } = await deleteClassProject({ variables: { classProjectId } });
      classProjectResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteThesis = async (thesisId) => {
    console.log("here");
    try {
      const { data } = await deleteThesis({ variables: { thesisId } });
      thesisResponse.refetch()
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  if (classProjectResponse.loading) {
    return <p>Loading...</p>; // Render loading state
  }
  if (classProjectResponse.error) {
    return <p>Error: {classProjectResponse.error.message}</p>; // Render error state
  }
  return (
    <>
      <h1 className="text-lg font-semibold mb-2">Pending posts</h1>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns="{columns}">
          <TableColumn>TITLE</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>TYPE</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {thesisResponse.data?.listMyUnapprovedThesis.data.map((thesis) => {
            return (
              <TableRow key={thesis.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: thesis.image }}
                    description={thesis.description.substring(0, 10)}
                    name={thesis.title}
                  >
                    some
                  </User>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{thesis.thesisCategory.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip className="capitalize" color={statusColorMap.vacation} size="sm" variant="flat">
                    Thesis
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                        setSelectedId(thesis.id);
                        setViewQuery(QUERIES.getThesisById);
                        viewThesisPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Edit document">
                      <span className="text-lg text-primary cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete document">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteThesis(thesis.id)}>
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
          {classProjectResponse.data?.listMyUnapprovedClassProject.data.map((classProject) => {
            return (
              <TableRow key={classProject.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: classProject.image }}
                    description={classProject.description.substring(0, 10)}
                    name={classProject.title}
                  >
                    some
                  </User>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-sm capitalize">{classProject.classProjectCategory.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip className="capitalize" color={statusColorMap.active} size="sm" variant="flat">
                    Class project
                  </Chip>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Details">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                        setSelectedId(classProject.id);
                        setViewQuery(QUERIES.getClassProjectById);
                        viewClassProjectPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Edit document">
                      <span className="text-lg text-primary cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete document">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDeleteClassProject(classProject.id)}>
                        <DeleteIcon />
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
        isOpen={viewThesisPopup.isOpen}
        onOpenChange={viewThesisPopup.onOpenChange}
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
              <ViewDetail query={viewQuery} variables={{ thesisId: selectedId }} />
              <Feedbacks type={'thesis'} id={selectedId}/>
            </div>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={viewClassProjectPopup.isOpen}
        onOpenChange={viewClassProjectPopup.onOpenChange}
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
              <div className="mt-6">
                <Feedbacks type={'classProject'} id={selectedId}/>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
