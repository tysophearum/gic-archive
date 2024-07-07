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
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { EyeIcon } from "../../../icons/EyeIcon";
import { CheckIcon } from "../../../icons/CheckIcon";
import ViewDetail from "../../../components/ViewDetail";
import Feedbacks from "../../../components/Feedbacks";
import QUERIES from "../../../util/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import unixToTime from "../../../util/unixToTime";
import ConfirmationAlert from "../../../components/ConfirmationAlert";
import BannerLoading from "../../../components/loading/BannerLoading";

const ManageUnapprovedThesis = () => {
  const viewPopup = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const thesisResponse = useQuery(QUERIES.listUnapprovedThesisByTeacherId, {
    variables: {
      pager: {
        page: page,
        limit: parseInt(limit),
      }
    },
  });
  const [viewQuery, setViewQuery] = useState(null);
  const [selectedId,  setSelectedId] = useState(null);
  const [deleteThesis] = useMutation(QUERIES.deleteThesis);
  const [approveThesis] = useMutation(QUERIES.updateThesisApproval);

  useEffect(() => {
    try {
      thesisResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }, [page, limit])

  const handleDeleteThesis = async (thesisId) => {
    try {
      await deleteThesis({ variables: { thesisId } });
      thesisResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  const handleApproveThesis = async (thesisId) => {
    try {
      await approveThesis({ variables: { thesisId,  approval: true } });
      thesisResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  if (thesisResponse.loading) {
    return (
      <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
        <BannerLoading />
      </div>
    ); // Render loading state
  }
  if (thesisResponse.error) {
    return <p>Error: {thesisResponse.error.message}</p>; // Render error state
  }
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/teacherDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
            Manage Unapproved Thesis
        </BreadcrumbItem>
      </Breadcrumbs>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <>
            <h1 className="text-2xl font-semibold">Manage Unapproved Thesis</h1>
          </>
        }
        bottomContent={
          <div className="flex">
            <Pagination
              total={thesisResponse.data.listUnapprovedThesisByTeacherId.pagination.totalPages}
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
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>USER</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {thesisResponse.data.listUnapprovedThesisByTeacherId.data.map((thesis) => {
            return (
              <TableRow key={thesis.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `${thesis.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}` }}
                    description={thesis.description.substring(0, 10)}
                    name={thesis.title}
                  />
                </TableCell>
                <TableCell>
                  {thesis.category.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Avatar className="w-6 h-6 text-tiny" />
                    <p className="text-bold text-sm capitalize ml-1">{thesis.user.name}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {unixToTime(thesis.createdAt)}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="View project">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                        setSelectedId(thesis.id);
                        setViewQuery(QUERIES.getThesisById);
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
                          action={() => {handleApproveThesis(thesis.id)}}
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
                          action={() => {handleDeleteThesis(thesis.id)}}
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
              <ViewDetail query={viewQuery} variables={{ thesisId: selectedId }} />
              <Feedbacks type={'thesis'} id={selectedId} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ManageUnapprovedThesis;