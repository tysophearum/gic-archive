import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, useDisclosure, Modal, ModalContent } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EyeIcon } from "../icons/EyeIcon";
import { columns, users } from "../pages/data";
import ViewDetail from "./ViewDetail";
import Feedbacks from "./Feedbacks";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TestTable() {
  const viewPopup = useDisclosure();
  return (
    <>
      <h1 className="text-lg font-semibold mb-2">Pending posts</h1>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <User
                avatarProps={{ radius: "lg", src: users[0].avatar }}
                description={users[0].email}
                name={users[0].name}
              >
                {users[0].email}
              </User>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{users[0].role}</p>
                <p className="text-bold text-sm capitalize text-default-400">{users[0].team}</p>
              </div>
            </TableCell>
            <TableCell>
              <Chip className="capitalize" color={statusColorMap[users[0].status]} size="sm" variant="flat">
                {users[0].status}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={viewPopup.onOpen}>
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Edit user">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
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
              <ViewDetail />
              <Feedbacks />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
