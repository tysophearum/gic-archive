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
import { EyeIcon } from "../icons/EyeIcon";
import { StarIconFill } from "../icons/StarIconFill";
import ViewDetail from "../components/ViewDetail";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import unixToTime from "../util/unixToTime";
import BannerLoading from "./loading/BannerLoading";
import { CrossIcon } from "../icons/CrossIcon";
import ConfirmationAlert from "./ConfirmationAlert";

const ManageApprovedClassProjectTable = ({classProjectCategoryId}) => {
  const viewPopup = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const featuredClassProjectResponse = useQuery(QUERIES.listFeaturedClassProject)
  const classProjectResponse = useQuery(QUERIES.listApprovedClassProjectByCategory, {
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
  const [variable, setVariable] = useState(null);
  const [viewQuery, setViewQuery] = useState(null);
  const [addFeaturedClassProject] = useMutation(QUERIES.addFeaturedClassProject);
  const [removeFeaturedClassProject] = useMutation(QUERIES.removeFeaturedClassProject);
  const [unapproveClassProject] = useMutation(QUERIES.updateClassProjectApproval);

  useEffect(() => {
    try {
      classProjectResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }, [page, limit])

  const handleUnapproveClassProject = async (classProjectId) => {
    const { errors } = await unapproveClassProject({ variables: { classProjectId,  approval: false } });
    if (errors) {
      console.log(errors);
    }
    classProjectResponse.refetch()
  }

  const handleClassProjectFeature = async (classProjectId) => {
    try {
      await addFeaturedClassProject({ variables: { classProjectId } });
      featuredClassProjectResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveClassProjectFeature = async (classProjectId) => {
    try {
      await removeFeaturedClassProject({ variables: { classProjectId } });
      featuredClassProjectResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  if (classProjectResponse.loading || classProjectCategoryResponse.loading || featuredClassProjectResponse.loading) {
    return (
      <>
        <BannerLoading />
      </>
    );
  }
  if (classProjectResponse.error || classProjectCategoryResponse.error || featuredClassProjectResponse.error) {
    return <p>Error: {classProjectResponse.error.message}</p>; // Render error state
  }
  return (
    <>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <>
            <h1 className="text-2xl font-semibold">Featured Class Projects</h1>
          </>
        }
      >
        <TableHeader columns="{columns}">
          <TableColumn>TITLE</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {featuredClassProjectResponse.data.listFeaturedClassProject.map((classProject) => {
            return (
              <TableRow key={classProject.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `${classProject?.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}` }}
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
                        setVariable({ classProjectId: classProject.id });
                        setViewQuery(QUERIES.getClassProjectById);
                        viewPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Feature project" className="bg-yellow-500">
                      <span onClick={() => {handleRemoveClassProjectFeature(classProject.id)}} className="text-lg cursor-pointer active:opacity-50 text-white border p-1 rounded-full bg-yellow-500">
                        <StarIconFill />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
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
              total={classProjectResponse.data.listApprovedClassProjectByCategory.pagination.totalPages}
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
          {classProjectResponse.data.listApprovedClassProjectByCategory.data.map((classProject) => {
            return (
              <TableRow key={classProject.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `${classProject?.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}` }}
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
                        setVariable({ classProjectId: classProject.id });
                        setViewQuery(QUERIES.getClassProjectById);
                        viewPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Unapprove project">
                      <span>
                        <ConfirmationAlert
                          buttonText="Unapprove"
                          color="danger"
                          title={"Unapproval comfirmation"}
                          ActionButton={({ onPress }) => (
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"  onClick={onPress}>
                              <CrossIcon height={18} width={18}/>
                            </span>
                          )} message={"Are you sure you want to unapprove this document?"}
                          action={() => {handleUnapproveClassProject(classProject.id)}}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Feature project" className="bg-yellow-500">
                      <span onClick={() => {handleClassProjectFeature(classProject.id)}} className="text-lg cursor-pointer active:opacity-50 text-yellow-500 border p-1 rounded-full border-yellow-500">
                        <StarIconFill />
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
              <ViewDetail query={viewQuery} variables={variable} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ManageApprovedClassProjectTable;