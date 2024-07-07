import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const ConfirmationAlert = ({title, message, ActionButton, action, color, buttonText}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <ActionButton onPress={onOpen} />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>{message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color={color} onPress={() => {action(); onClose()}}>
                  {buttonText}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmationAlert;
