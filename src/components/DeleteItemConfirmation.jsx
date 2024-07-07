import React from "react";
import {
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { WarningIcon } from "../icons/WarningIcon";

const DeleteItemConfirmation = ({ onClose, onComplete }) => {
  return (
    <>
      <ModalBody>
        <div className="flex flex-col items-center text-red-500 w-full">
          <WarningIcon height={120} width={120}/>
          <h1>Are you sure?</h1>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="danger" onPress={onClose}>
          Yes
        </Button>
      </ModalFooter>
    </>
  )
}

export default DeleteItemConfirmation;