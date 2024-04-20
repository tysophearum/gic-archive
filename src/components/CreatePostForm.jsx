import { Image } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { UploadIcon } from "../icons/UploadIcon";
import {
  ModalFooter,
  Button,
  ModalBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  ModalHeader,
  Autocomplete,
  AutocompleteItem,
  User,
  Card
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';
import fetchData from '../util/fetchData';
import QUERIES from '../util/queries';
import { gql, useMutation, useQuery } from '@apollo/client';

const CreatePostForm = ({ onClose }) => {
  const endpoint = process.env.REACT_APP_ENDPOINT;
  // const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const amimals = [{ name: 'dog' }, { name: 'cat' }]
  // const files = acceptedFiles.map(file => (
  //   <Card className="p-3" shadow="sm" key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </Card>
  // ));

  let payload = {
    classProject: {
      title: '',
      description: '',
      classProjectCategory: '',
      classProjectLink: '',
      repositoryLink: '',
      videoLink: '',
      collaborators: [],
    },
    file: null,
    image: null
  }

  const [uploadClassProject] = useMutation(QUERIES.createClassProject);

  async function createClassProject() {
    try {
      const { data } = await uploadClassProject({ variables: payload });
    } catch (error) {
      console.log(error);
    }
  }
  const { loading, error, data } = useQuery(QUERIES.listClassProjectCategory);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Add new post</ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-[80%,20%] gap-3">
          <div className="grid grid-cols-1 gap-3">
            <Input
              type="text"
              label="Title"
              onValueChange={(value) => {
                payload.classProject.title = value
              }}
            />
            <Textarea
              label="Description"
              placeholder="Enter your description"
              onValueChange={(value) => {
                payload.classProject.description = value
              }}
            />
          </div>
          <Image className="w-full h-44 rounded-lg object-cover" src="https://cdn.dribbble.com/users/59947/screenshots/17108611/muti_2.jpg" />
        </div>
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          className="mt-5"
          color="primary"
        >
          <Tab key="login" title="Class project">
            <div className="grid grid-cols-3 gap-2">
              <Select
                label="Select a category"
                className="mb-3"
                onChange={(e) => {
                  payload.classProject.classProjectCategory = e.target.value;
                }}
              >
                {data.listClassProjectCategory.map((category) => {
                  return (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  )
                })}
              </Select>
              <Input
                className="mb-3"
                type="text"
                label="Git repository"
                onValueChange={(value) => {
                  payload.classProject.repositoryLink = value
                }}
              />
              <Input
                className="mb-3"
                type="text"
                label="Video demo link"
                onValueChange={(value) => {
                  payload.classProject.videoLink = value
                }}
              />
            </div>
            <div className="mb-3 grid grid-cols-1 place-items-start">
              <h3 className=" font-semibold text-lg">Collaborators</h3>
              <Autocomplete
                label="Select an animal"
              >
                {amimals.map((animal) => {
                  return (
                    <AutocompleteItem key={animal.name} value={animal.name} data-disabled data-selectable='none'>
                      <span>{animal.name}</span>
                    </AutocompleteItem>
                  )
                })}
              </Autocomplete>
              <User
                name={(<h1 className="font-semibold">Ty Sophearum</h1>)}
                description="e20191219"
                className="my-2"
                avatarProps={{
                  src: "https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg",
                  size: 'md'
                }}
              />
            </div>
            <h3 className=" font-semibold text-lg mb-1">Reports</h3>
            {/* <section className="border w-full rounded-lg p-5">
              <div {...getRootProps({ className: 'dropzone' })} className="border border-primary bg-primary-50 text-gray-500 rounded p-3">
                <input {...getInputProps()} />
                <div className="grid grid-cols-1 place-items-center">
                  <UploadIcon width={60} height={60} />
                  <p>Drag & Drop or Choose file to upload</p>
                </div>
              </div>
              <aside className="mt-3">
                <div className="grid grid-cols-3 gap-2">{files}</div>
              </aside>
            </section> */}
            <input type="file" onChange={(e) => {
              payload.file = e.target.files
            }} />
          </Tab>
          <Tab key="sign-up" title="Thesis">
            <div className="grid grid-cols-3 gap-2">
              <Select
                label="Select a category"
                className="mb-3"
              >
                <SelectItem>
                  Web development
                </SelectItem>
                <SelectItem>
                  Mobile development
                </SelectItem>
                <SelectItem>
                  DevOp
                </SelectItem>
              </Select>
              <Input className="mb-3" type="text" label="Git repository" />
              <Input className="mb-3" type="text" label="Video demo link" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="mb-3 grid grid-cols-1 place-items-start">
                <h3 className=" font-semibold text-lg">Teacher</h3>
                <Autocomplete
                  label="Select an animal"
                >
                  {amimals.map((animal) => {
                    return (
                      <AutocompleteItem value={animal.name}>{animal.name}</AutocompleteItem>
                    )
                  })}
                </Autocomplete>
                <User
                  name={(<h1 className="font-semibold">Ty Sophearum</h1>)}
                  description="e20191219"
                  className="my-2"
                  avatarProps={{
                    src: "https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg",
                    size: 'md'
                  }}
                />
              </div>
              <div className="mb-3">
                <h3 className=" font-semibold text-lg">Collaborators</h3>
                <Autocomplete
                  placeholder="Search for users"
                  startContent={<SearchIcon />}
                  radius="full"
                  size="xs"
                >
                  {/* {users.map((user) => (
                    <AutocompleteItem key={user.name}>
                      dfgsf
                    </AutocompleteItem>
                  ))} */}
                </Autocomplete>
                <User
                  name={(<h1 className="font-semibold">Ty Sophearum</h1>)}
                  description="e20191219"
                  className="my-2"
                  avatarProps={{
                    src: "https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg",
                    size: 'md'
                  }}
                />
              </div>
            </div>
          </Tab>
        </Tabs>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => { console.log(data) }}>
          Close
        </Button>
        <Button color="primary" onClick={() => createClassProject()}>
          Submit
        </Button>
      </ModalFooter>
    </>
  )
}

export default CreatePostForm