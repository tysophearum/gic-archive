import { Image } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { CameraIcon } from "../icons/CameraIcon";
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
  User,
  Card,
} from "@nextui-org/react";
import React, { useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import fetchData from '../util/fetchData';
import QUERIES from '../util/queries';
import { useMutation, useQuery } from '@apollo/client';
import axios from "axios";
import ErrorAlert from "./ErrorAlert";

let classProjectPayload = {
  classProject: {
    title: '',
    description: '',
    category: '',
    files: '',
    repositoryLink: '',
    videoLink: '',
    collaborators: [],
  },
}
let thesisPayload = {
  thesis: {
    title: '',
    description: '',
    category: '',
    files: '',
    repositoryLink: '',
    videoLink: '',
    teacher: '',
    collaborators: [],
  },
}
let image = null;

const CreatePostForm = ({ onClose, onComplete }) => {
  const endpoint = process.env.REACT_APP_GRAPHQL;
  const [uploadClassProject] = useMutation(QUERIES.createClassProject);
  const [uploadThesis] = useMutation(QUERIES.createThesis);
  const classProjectCategory = useQuery(QUERIES.listClassProjectCategory);
  const thesisCategory = useQuery(QUERIES.listThesisCategory);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedTeacher, setSearchedTeacher] = useState([]);
  const [collaborator, setCollaborator] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [loading, setLoading] = useState(false);
  const [imageLink, setImageLink] = useState("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
  const files = acceptedFiles.map(file => (
    <Card className="p-3" shadow="sm" key={file.path}>
      {file.path} - {file.size} bytes
    </Card>
  ));

  async function searchStudent(input) {
    try {
      const [responseData, error] = await fetchData(endpoint, QUERIES.searchStudents, { name: input });
      if (error) {
        throw new Error(error.message);
      }
      return responseData.searchStudents;
    } catch (error) {
      console.log(error);
    }
  }

  async function searchTeacher(input) {
    try {
      const [responseData, error] = await fetchData(endpoint, QUERIES.searchTeachers, { name: input });
      if (error) {
        throw new Error(error.message);
      }
      return responseData.searchTeachers;
    } catch (error) {
      console.log(error);
    }
  }

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const handleClose = () => {
    setIsError(false);
  };
  const createClassProject = useCallback(async (event) => {
    try {
      if (!acceptedFiles.length) {
        throw new Error('No files to upload');
      }

      // Step 1: Upload the class project data
      const { data, errors } = await uploadClassProject({ variables: classProjectPayload });
      if (errors) {
        
      }

      if (data) {
        const classProjectId = data.createClassProject.id;

        // Step 2: Prepare formData for files
        let formData = new FormData();
        formData.append('classProjectId', classProjectId);
        acceptedFiles.forEach(file => {
          formData.append('files', file); // Append each file individually
        });

        // Step 3: Upload files
        await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/classProject/files', formData);

        if (image) {
          // Step 4: Prepare formData for image
          formData = new FormData();
          formData.append('classProjectId', classProjectId);
          formData.append('image', image);
          console.log(image);

          // Step 5: Upload image
          await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/classProject/image', formData);
        }

        // Step 6: Call completion handlers if all uploads are successful
        onComplete();
        onClose();
      }
    } catch (error) {
      setLoading(false)
      const message = error.message
      setErrorMessage(message)
      setIsError(true)
    }
  }, [classProjectPayload, acceptedFiles, image, onComplete, onClose, uploadClassProject]);

  const createThesis = useCallback(async (event) => {
    try {
      if (!acceptedFiles.length) {
        throw new Error('No files to upload');
      }

      // Step 1: Upload the class project data
      const { data, errors } = await uploadThesis({ variables: thesisPayload });
      if (errors) {
        
      }

      if (data) {
        const thesisId = data.createThesis.id;

        // Step 2: Prepare formData for files
        let formData = new FormData();
        formData.append('thesisId', thesisId);
        acceptedFiles.forEach(file => {
          formData.append('files', file); // Append each file individually
        });

        // Step 3: Upload files
        await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/thesis/files', formData);

        if (image) {
          // Step 4: Prepare formData for image
          formData = new FormData();
          formData.append('thesisId', thesisId);
          formData.append('image', image);
          console.log(image);

          // Step 5: Upload image
          await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/thesis/image', formData);
        }

        // Step 6: Call completion handlers if all uploads are successful
        onComplete();
        onClose();
      }
    } catch (error) {
      setLoading(false)
      const message = error.message
      setErrorMessage(message)
      setIsError(true)
    }
  }, [classProjectPayload, acceptedFiles, image, onComplete, onClose, uploadThesis]);  

  const onSearchStudentInputChange = async (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      const result = await searchStudent(value);
      setSearchedUsers(result);
    }
    else if (value.length === 0) {
      setSearchedUsers([]);
    }
  }

  const onSearchTeacherInputChange = async (e) => {
    const value = e.target.value;
    if (value.length > 2) {
      const result = await searchTeacher(value);
      setSearchedTeacher(result);
    }
    else if (value.length === 0) {
      setSearchedTeacher([]);
    }
  }

  const removeSearchedUser = (idToRemove) => {
    classProjectPayload.classProject.collaborators = classProjectPayload.classProject.collaborators.filter(item => item !== idToRemove);
    thesisPayload.thesis.collaborators = thesisPayload.thesis.collaborators.filter(item => item !== idToRemove);
    const updatedUsers = collaborator.filter(item => item.id !== idToRemove);
    setCollaborator(updatedUsers);
  };
  const handleImageChange = (e) => {
    image = e.target.files[0]
    setImageLink(URL.createObjectURL(e.target.files[0]))
  }
  if (classProjectCategory.loading || thesisCategory.loading) return <p>Loading...</p>;
  if (classProjectCategory.error || thesisCategory.error) return <p>Error: {classProjectCategory.error.message}</p>;
  return (
    <>
      <ErrorAlert open={isError} message={errorMessage} close={handleClose} />
      <ModalHeader className="flex flex-col gap-1">Add new post</ModalHeader>
      <ModalBody>
        <div className="grid grid-cols-[80%,20%] gap-3">
          <div className="grid grid-cols-1 gap-3">
            <Input
              type="text"
              label="Title"
              onValueChange={(value) => {
                classProjectPayload.classProject.title = value
                thesisPayload.thesis.title = value
              }}
            />
            <Textarea
              label="Description"
              placeholder="Enter your description"
              onValueChange={(value) => {
                classProjectPayload.classProject.description = value
                thesisPayload.thesis.description = value
              }}
            />
          </div>
          <div className="flex items-end">
            <Image className="w-full h-44 rounded-lg object-cover" src={imageLink} />
            <label className="flex items-center justify-center border-2 rounded-full bg-gray-50 text-yellow-500 ml-[-15px] mt-[-2] z-50">
              <CameraIcon />
              <input type="file" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          className="mt-5"
          color="primary"
        >
          <Tab key="login" title="Class project" aria-label="Tabs class projext">
            <div className="grid grid-cols-3 gap-2">
              <Select
                label="Select a category"
                className="mb-3"
                onChange={(e) => {
                  classProjectPayload.classProject.category = e.target.value;
                }}
              >
                {classProjectCategory.data.listClassProjectCategory.map((category) => {
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
                  classProjectPayload.classProject.repositoryLink = value
                }}
              />
              <Input
                className="mb-3"
                type="text"
                label="Video demo link"
                onValueChange={(value) => {
                  classProjectPayload.classProject.videoLink = value
                }}
              />
            </div>
            <div className="mb-3 grid grid-cols-1 place-items-start">
              <h3 className=" font-semibold text-lg">Collaborators</h3>
              <Input
                isClearable
                onClear={() => setSearchedUsers([])}
                onChange={onSearchStudentInputChange}
                variant="bordered"
                radius="full"
                size="sm"
                placeholder="Search for user"
                startContent={<SearchIcon />}
              />
              <div className="mt-1 relative w-full">
                {searchedUsers.length !== 0 && (
                  <Card shadow="xl" className="absolute z-50 w-full py-2 px-2">
                    {searchedUsers.map((user) => {
                      return (
                        <div key={user.id} className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg duration-100 hover:bg-gray-200">
                          <div className="flex items-center gap-2">
                            <Image className="w-10 h-10 rounded-full" src={user.image} />
                            <div>
                              <p className="">{user.name}</p>
                              <p className=" text-xs text-gray-400">{user.studentId}</p>
                            </div>
                          </div>
                          <Button
                            className="border-small mr-0.5 font-medium shadow-small"
                            radius="full"
                            size="sm"
                            variant="bordered"
                            onClick={() => {
                              if (!collaborator.includes(user)) {
                                setCollaborator([...collaborator, user]); 
                                classProjectPayload.classProject.collaborators.push(user.id); 
                                thesisPayload.thesis.collaborators.push(user.id) 
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                      )
                    })}
                  </Card>
                )}
              </div>
              <div className="mt-2">
                {collaborator.map((user) => {
                  return (
                    <div key={user.id} className="flex items-center">
                      <User
                        name={(<h1 className="font-semibold">{user.name}</h1>)}
                        description={user.studentId}
                        className="my-0.5 mx-3"
                        avatarProps={{
                          src: `${user.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                          size: 'md'
                        }}
                      />
                      <Button
                        className="border-small mr-0.5 font-medium shadow-small"
                        radius="full"
                        color="danger"
                        size="sm"
                        variant="bordered"
                        onClick={() => { removeSearchedUser(user.id) }}
                      >
                        Remove
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
            <h3 className=" font-semibold text-lg mb-1">Reports</h3>
            <section className="border w-full rounded-lg p-5">
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
            </section>
            {/* <input type="file" multiple onChange={(e) => {}} /> */}
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => onClose()}>
                Close
              </Button>
              <Button isLoading={loading} color="primary" onClick={(e) => { setLoading(true); createClassProject(e) }}>
                Submit
              </Button>
            </ModalFooter>
          </Tab>
          <Tab key="sign-up" title="Thesis" aria-label="Tabs thesis">
            <div className="grid grid-cols-3 gap-2">
              <Select
                label="Select a category"
                className="mb-3"
                onChange={(e) => {
                  thesisPayload.thesis.category = e.target.value;
                }}
              >
                {thesisCategory.data.listThesisCategory.map((category) => {
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
                  thesisPayload.thesis.repositoryLink = value
                }}
              />
              <Input
                className="mb-3"
                type="text"
                label="Video demo link"
                onValueChange={(value) => {
                  thesisPayload.thesis.videoLink = value
                }}
              />
            </div>
            <div className="grid grid-cols-2 place-items-start gap-3 mt-3">
              <div className="mb-3 grid grid-cols-1 place-items-start w-full">
                <h3 className=" font-semibold text-lg">Teacher</h3>
                <Input
                  isClearable
                  onClear={() => setSearchedTeacher([])}
                  onChange={onSearchTeacherInputChange}
                  variant="bordered"
                  radius="full"
                  size="sm"
                  placeholder="Search for user"
                  startContent={<SearchIcon />}
                />
                <div className="mt-1 relative w-full">
                  {searchedTeacher.length !== 0 && (
                    <Card shadow="xl" className="absolute z-50 w-full py-2 px-2">
                      {searchedTeacher.map((user) => {
                        return (
                          <div key={user.id} className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg duration-100 hover:bg-gray-200">
                            <div className="flex items-center gap-2">
                              <Image className="w-10 h-10 rounded-full" src={user.image} />
                              <div>
                                <p className="">{user.name}</p>
                                <p className=" text-xs text-gray-400">{user.studentId}</p>
                              </div>
                            </div>
                            <Button
                              className="border-small mr-0.5 font-medium shadow-small"
                              radius="full"
                              size="sm"
                              variant="bordered"
                              onClick={() => { setTeacher(user); thesisPayload.thesis.teacher = user.id }}
                            >
                              Add
                            </Button>
                          </div>
                        )
                      })}
                    </Card>
                  )}
                </div>
                <div className="mt-2">
                  {teacher && (
                      <div key={teacher.id} className="flex items-center">
                        <User
                          name={(<h1 className="font-semibold">{teacher.name}</h1>)}
                          description={teacher.studentId}
                          className="my-0.5 mx-3"
                          avatarProps={{
                            src: `${teacher.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                            size: 'md'
                          }}
                        />
                        <Button
                          className="border-small mr-0.5 font-medium shadow-small"
                          radius="full"
                          color="danger"
                          size="sm"
                          variant="bordered"
                          onClick={() => { setTeacher(null); thesisPayload.thesis.teacher = null }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                </div>
              </div>

              <div className="mb-3 grid grid-cols-1 place-items-start w-full">
                <h3 className=" font-semibold text-lg">Collaborators</h3>
                <Input
                  isClearable
                  onClear={() => setSearchedUsers([])}
                  onChange={onSearchStudentInputChange}
                  variant="bordered"
                  radius="full"
                  size="sm"
                  placeholder="Search for user"
                  startContent={<SearchIcon />}
                />
                <div className="mt-1 relative w-full">
                  {searchedUsers.length !== 0 && (
                    <Card shadow="xl" className="absolute z-50 w-full py-2 px-2">
                      {searchedUsers.map((user) => {
                        return (
                          <div key={user.id} className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg duration-100 hover:bg-gray-200">
                            <div className="flex items-center gap-2">
                              <Image className="w-10 h-10 rounded-full" src={user.image} />
                              <div>
                                <p className="">{user.name}</p>
                                <p className=" text-xs text-gray-400">{user.studentId}</p>
                              </div>
                            </div>
                            <Button
                              className="border-small mr-0.5 font-medium shadow-small"
                              radius="full"
                              size="sm"
                              variant="bordered"
                              onClick={() => {
                                if (!collaborator.includes(user)) {
                                  setCollaborator([...collaborator, user]); 
                                  classProjectPayload.classProject.collaborators.push(user.id); 
                                  thesisPayload.thesis.collaborators.push(user.id) 
                                }
                              }}
                            >
                              Add
                            </Button>
                          </div>
                        )
                      })}
                    </Card>
                  )}
                </div>
                <div className="mt-2">
                  {collaborator.map((user) => {
                    return (
                      <div key={user.id} className="flex items-center">
                        <User
                          name={(<h1 className="font-semibold">{user.name}</h1>)}
                          description={user.studentId}
                          className="my-0.5 mx-3"
                          avatarProps={{
                            src: `${user.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                            size: 'md'
                          }}
                        />
                        <Button
                          className="border-small mr-0.5 font-medium shadow-small"
                          radius="full"
                          color="danger"
                          size="sm"
                          variant="bordered"
                          onClick={() => { removeSearchedUser(user.id) }}
                        >
                          Remove
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <h3 className=" font-semibold text-lg mb-1">Reports</h3>
            <section className="border w-full rounded-lg p-5">
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
            </section>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={() => onClose()}>
                Close
              </Button>
              <Button isLoading={loading} color="primary" onClick={(e) => { setLoading(true); createThesis(e) }}>
                Submit
              </Button>
            </ModalFooter>
          </Tab>
        </Tabs>
      </ModalBody>
    </>
  )
}

export default CreatePostForm