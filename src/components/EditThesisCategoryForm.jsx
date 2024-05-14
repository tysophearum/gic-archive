import React, { useState, useEffect } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import QUERIES from "../util/queries";
import { useMutation, useQuery } from "@apollo/client";

const EditThesisCategoryForm = ({ onClose, onComplete, categoryId }) => {
  const [updateThesisCategory] = useMutation(QUERIES.updateThesisCategory);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const {data, loading, error} = useQuery(QUERIES.getThesisCategoryById, {
    variables: {
      categoryId
    }
  })

  useEffect(() => {
    if (data) {
      setName(data.getThesisCategoryById.name);
      setDescription(data.getThesisCategoryById.description);
    }
  }, [data]);

  const handleUpdateThesisCategory = () => {
    updateThesisCategory({
      variables: {
        thesis: {
          id: categoryId,
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} {categoryId}</p>;
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Create new category</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          label="Name"
          value={name}
          onValueChange={(value) => { setName(value) }}
        />
        <Textarea
          label="Description"
          placeholder="Enter your description"
          value={description}
          onValueChange={(value) => { setDescription(value) }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={handleUpdateThesisCategory}>
          Update
        </Button>
      </ModalFooter>
    </>
  )
}

export default EditThesisCategoryForm;