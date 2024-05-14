import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import QUERIES from "../util/queries";
import { useMutation } from "@apollo/client";

const CreateThesisCategoryForm = ({ onClose, onComplete }) => {
  const [CreateThesisCategory] = useMutation(QUERIES.createThesisCategory);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateThesisCategory = () => {
    CreateThesisCategory({
      variables: {
        thesis: {
          name,
          description,
        }
      }
    }).then(() => {
      onComplete();
      onClose();
    }).catch((error) => {
      console.log(error);
    })
  }
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Create new category</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          label="Title"
          onValueChange={(value) => { setName(value) }}
        />
        <Textarea
          label="Description"
          placeholder="Enter your description"
          onValueChange={(value) => { setDescription(value) }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={handleCreateThesisCategory}>
          Create
        </Button>
      </ModalFooter>
    </>
  )
}

export default CreateThesisCategoryForm;