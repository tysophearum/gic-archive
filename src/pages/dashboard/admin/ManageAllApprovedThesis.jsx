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
import { EyeIcon } from "../../../icons/EyeIcon";
import { StarIconFill } from "../../../icons/StarIconFill";
import ViewDetail from "../../../components/ViewDetail";
import Feedbacks from "../../../components/Feedbacks";
import QUERIES from "../../../util/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import unixToTime from "../../../util/unixToTime";
import { CrossIcon } from "../../../icons/CrossIcon";
import BannerLoading from "../../../components/loading/BannerLoading";
import ConfirmationAlert from "../../../components/ConfirmationAlert";

const ManageAllApprovedThesis = () => {
  const viewPopup = useDisclosure();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const featuredThesisResponse = useQuery(QUERIES.listFeaturedThesis)
  const thesisResponse = useQuery(QUERIES.listApprovedThesis, {
    variables: {
      pager: {
        page: page,
        limit: parseInt(limit),
      }
    },
  });
  const [variable, setVariable] = useState(null);
  const [viewQuery, setViewQuery] = useState(null);
  const [addFeaturedThesis] = useMutation(QUERIES.addFeaturedThesis);
  const [removeFeaturedThesis] = useMutation(QUERIES.removeFeaturedThesis);
  const [unapproveThesis] = useMutation(QUERIES.updateThesisApproval);

  useEffect(() => {
    try {
      thesisResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }, [page, limit])

  const handleUnapproveThesis = async (thesisId) => {
    const { errors } = await unapproveThesis({ variables: { thesisId,  approval: false } });
    if (errors) {
      console.log(errors);
    }
    thesisResponse.refetch()
  }

  const handleThesisFeature = async (thesisId) => {
    try {
      await addFeaturedThesis({ variables: { thesisId } });
      featuredThesisResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  const handleRemoveThesisFeature = async (thesisId) => {
    try {
      await removeFeaturedThesis({ variables: { thesisId } });
      featuredThesisResponse.refetch()
    } catch (error) {
      console.log(error);
    }
  }

  if (thesisResponse.loading) {
    return (
      <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
        <BannerLoading />
      </div>
    );
  }
  if (thesisResponse.error) {
    return <p>Error: {thesisResponse.error.message}</p>; // Render error state
  }
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/adminDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          Manage Approved Thesis
        </BreadcrumbItem>
      </Breadcrumbs>
      <Table
        aria-label="Example table with custom cells"
        topContent={
          <>
            <h1 className="text-2xl font-semibold">Highlight Thesis</h1>
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
          {featuredThesisResponse?.data?.listFeaturedThesis?.map((thesis) => {
            return (
              <TableRow key={thesis.id}>
                <TableCell>
                  <User
                    avatarProps={{ radius: "lg", src: `${thesis.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}` }}
                    description={thesis.description.substring(0, 10)}
                    name={thesis.title}
                  >
                    some
                  </User>
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
                        setVariable({ thesisId: thesis.id });
                        setViewQuery(QUERIES.getThesisById);
                        viewPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Feature project" className="bg-yellow-500">
                      <span onClick={() => {handleRemoveThesisFeature(thesis.id)}} className="text-lg cursor-pointer active:opacity-50 text-white border p-1 rounded-full bg-yellow-500">
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
            <h1 className="text-2xl font-semibold">Thesis</h1>
          </>
        }
        bottomContent={
          <div className="flex">
            <Pagination
              total={thesisResponse.data.listApprovedThesis.pagination.totalPages}
              initialPage={1}
              //shadow
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
          {thesisResponse.data.listApprovedThesis.data.map((thesis) => {
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
                        setVariable({ thesisId: thesis.id });
                        setViewQuery(QUERIES.getThesisById);
                        viewPopup.onOpen()
                      }}>
                        <EyeIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Unapprove">
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
                          action={() => {handleUnapproveThesis(thesis.id)}}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip color="primary" content="Feature project" className="bg-yellow-500">
                      <span onClick={() => {handleThesisFeature(thesis.id)}} className="text-lg cursor-pointer active:opacity-50 text-yellow-500 border p-1 rounded-full border-yellow-500">
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
              <Feedbacks />
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ManageAllApprovedThesis;