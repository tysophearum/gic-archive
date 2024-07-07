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
  Image,
  Tooltip
} from "@nextui-org/react";
import { CameraIcon } from "../icons/CameraIcon";
import { SearchIcon } from "../icons/SearchIcon";
import { useEffect, useState, useCallback } from "react";
import fetchData from '../util/fetchData';
import QUERIES from '../util/queries';
import { useQuery, useMutation } from "@apollo/client";
import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { AddIcon } from "../icons/AddIcon";
import ErrorAlert from "./ErrorAlert";

let image = null;
export default function EditThesisForm({ id, onClose, onComplete }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [repositoryLink, setRepositoryLink] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [imageLink, setImageLink] = useState("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png");
  const [files, setFiles] = useState([{
    name: '',
    url: '',
    isDeleted: false
  }])
  const [newFiles, setNewFiles] = useState([]);

  const endpoint = process.env.REACT_APP_GRAPHQL;
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const thesisCategory = useQuery(QUERIES.listThesisCategory);
  const { data, loading, error } = useQuery(QUERIES.getThesisById, {
    variables: { thesisId: id }
  });
  const [updateThesis] = useMutation(QUERIES.updateThesis);
  const [searchedTeacher, setSearchedTeacher] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

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
    const updatedUsers = collaborators.filter(item => item.id !== idToRemove);
    setCollaborators(updatedUsers);
  };

  useEffect(() => {
    const thesis = data?.getThesisById
    if (thesis) {
      setCollaborators(thesis.collaborators);
      setTitle(thesis.title);
      setDescription(thesis.description);
      setCategory(thesis.category.id);
      setRepositoryLink(thesis.repositoryLink);
      setVideoLink(thesis.videoLink);
      setImageLink(thesis.image);
      setTeacher(thesis.teacher)

      let fileArray = []
      for (let index = 0; index < thesis?.files?.length; index++) {
        const fileObject = {
          name: thesis?.files[index],
          url: thesis?.fileLinks[index],
          isDeleted: false
        }
        fileArray.push(fileObject)
      }
      setFiles(fileArray)
    }
  }, [data])

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const handleClose = () => {
    setIsError(false);
  };
  const updateThesisAction = useCallback(async (event) => {
    try {
      if (isFilesEmpty()) {
        throw new Error('No files to upload');
      }
      const colabIds = collaborators.map(item => item.id);
      const teacherId = teacher.id;
      const payload = {
        id,
        title,
        description,
        category,
        repositoryLink,
        videoLink,
        collaborators: colabIds,
        teacher: teacherId,
      };

      const { data } = await updateThesis({ variables: { thesis: payload } });

      if (data) {
        let formData = new FormData();
        formData.append('thesisId', data.updateThesis.id);
        const filesToDelete = files
          .filter(file => file.isDeleted)
          .map(file => file.name);

        if (filesToDelete.length > 0) {
          formData.append('filesToDelete', filesToDelete);
          await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/thesis/files/delete', formData);
        }

        if (newFiles.length > 0) {
          formData = new FormData(); // Reset formData to avoid appending duplicates
          formData.append('thesisId', data.updateThesis.id);
          newFiles.forEach(file => {
            formData.append('files', file); // Append each file individually
          });

          await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/thesis/files', formData);
        }
        if (image) {
          // Prepare formData for image
          formData.append('image', image);
  
          // Upload image
          await axios.post(process.env.REACT_APP_ENDPOINT+'/upload/thesis/image', formData);
        }
      }

      onComplete("something");
      onClose();
    } catch (error) {
      setEditLoading(false)
      const message = error.message
      setErrorMessage(message)
      setIsError(true)
    }
  }, [id, title, description, category, repositoryLink, videoLink, collaborators, teacher, image, files, newFiles, updateThesis, onComplete, onClose]);

  const handleImageChange = (e) => {
    image = e.target.files[0]
    setImageLink(URL.createObjectURL(e.target.files[0]))
  }

  const handleAddNewFile = (e) => {
    const newFile = e.target.files[0]
    setNewFiles([...newFiles, newFile])
  }

  const updateIsDeleted = (index) => {
    const updatedFiles = [...files];
    updatedFiles[index] = { ...updatedFiles[index], isDeleted: true };
    setFiles(updatedFiles);
  };

  function removeNewFile(index) {
    setNewFiles(prevFiles => {
      if (index >= 0 && index < prevFiles.length) {
        // Create a new array without the element at the specified index
        return [...prevFiles.slice(0, index), ...prevFiles.slice(index + 1)];
      }
      return prevFiles;
    });
  }

  function isFilesEmpty() {
    return newFiles.length === 0 && files?.every(file => file.isDeleted);
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error.message}</p>
  };
  return (
    <>
      <ErrorAlert open={isError} message={errorMessage} close={handleClose} />
      <ModalHeader className="flex flex-col gap-1">Edit Thesis</ModalHeader>
      <ModalBody className="flex flex-col gap-4">
        <div className="grid grid-cols-[80%,20%] gap-3">
          <div className="grid grid-cols-1 gap-3">
            <Input
              type="text"
              label="Title"
              value={title}
              onValueChange={(title) => { setTitle(title) }}
            />
            <Textarea
              label="Description"
              placeholder="Enter your description"
              value={description}
              onValueChange={(description) => { setDescription(description) }}
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
        <div className="grid grid-cols-3 gap-2">
          <Select
            label="Select a category"
            className="mb-3"
            defaultSelectedKeys={[data?.getThesisById?.category.id]}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {thesisCategory?.data?.listThesisCategory?.map((category) => {
              return (
                <SelectItem key={category.id}>{category.name}</SelectItem>
              )
            })}
          </Select>
          <Input
            className="mb-3"
            type="text"
            label="Git repository"
            value={repositoryLink}
            onValueChange={(link) => { setRepositoryLink(link) }}
          />
          <Input
            className="mb-3"
            type="text"
            label="Video demo link"
            value={videoLink}
            onValueChange={(link) => { setVideoLink(link) }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-3 grid grid-cols-1 place-items-start">
            <h2 className=" font-semibold text-lg">Collaborators</h2>
            <Input
              isClearable
              onClear={() => setSearchedTeacher([])}
              onChange={onSearchTeacherInputChange}
              variant="bordered"
              radius="full"
              size="sm"
              placeholder="Search for teacher"
              startContent={<SearchIcon />}
            />
            <div className="mt-1 relative w-full">
              {searchedTeacher.length !== 0 && (
                <Card shadow="xl" className="absolute z-50 w-full py-2 px-2">
                  {searchedTeacher.map((teacher) => {
                    return (
                      <div key={teacher.id} className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg duration-100 hover:bg-gray-200">
                        <div className="flex items-center gap-2">
                          <Image className="w-10 h-10 rounded-full" src={`${teacher.image}`} />
                          <div>
                            <p className="">{teacher.name}</p>
                            <p className=" text-xs text-gray-400">{teacher.studentId}</p>
                          </div>
                        </div>
                        <Button
                          className="border-small mr-0.5 font-medium shadow-small"
                          radius="full"
                          size="sm"
                          variant="bordered"
                          onClick={() => {
                            setTeacher(teacher);
                            setSearchedTeacher([]);
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
              {teacher && (
                  <div className="flex items-center">
                    <User
                      name={(<h1 className="font-semibold">{teacher?.name}</h1>)}
                      description={teacher?.studentId}
                      className="my-0.5 mx-3"
                      avatarProps={{
                        src: teacher?.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png",
                        size: 'md'
                      }}
                    />
                  </div>
                )
              }
            </div>
          </div>
          <div className="mb-3 grid grid-cols-1 place-items-start">
            <h2 className=" font-semibold text-lg">Collaborators</h2>
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
                          <Image className="w-10 h-10 rounded-full" src={`${user.image}`} />
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
                            if (!collaborators.includes(user)) {
                              setCollaborators([...collaborators, user]);
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
              {collaborators.map((user) => {
                return (
                  <div key={user?.id} className="flex items-center">
                    <User
                      name={(<h1 className="font-semibold">{user?.name}</h1>)}
                      description={user?.studentId}
                      className="my-0.5 mx-3"
                      avatarProps={{
                        src: user?.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png",
                        size: 'md'
                      }}
                    />
                    <Button
                      className="border-small mr-0.5 font-medium shadow-small"
                      radius="full"
                      color="danger"
                      size="sm"
                      variant="bordered"
                      onClick={() => { removeSearchedUser(user?.id) }}
                    >
                      Remove
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div>
          <h2 className=" font-semibold text-lg mb-3">Reports</h2>
          {files.map((file, index) => (
            !file.isDeleted && (
              <Card key={file.name} className="w-fit p-3 my-2 flex">
                <div className="flex items-center">
                  <span>{getLinkName(file.name)}</span>
                  <div className="border-1 mx-3 h-4 border-red-400"></div>
                  <Tooltip color="danger" content="Remove document">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => { updateIsDeleted(index) }} >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </Card>
            )
          ))}
          {newFiles?.map((file, index) => {
            return (
              <Card className="w-fit p-3 my-2 flex">
                <div className="flex items-center">
                  <span>{file.name}</span>
                  <div className="border-1 mx-3 h-4 border-red-400"></div>
                  <Tooltip color="danger" content="Remove document">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => removeNewFile(index)} >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </Card>
            )
          })}
          <span className="m">
            <label>
              <AddIcon width={25} height={25} />
              <input type="file" onChange={handleAddNewFile} className="hidden" />
            </label>
          </span>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={() => onClose()}>
          Close
        </Button>
        <Button isLoading={editLoading} color="primary" onClick={(e) => { setEditLoading(true); updateThesisAction(e) }}>
          Submit
        </Button>
      </ModalFooter>
    </>
  )
}

function getLinkName(link) {
  const linkName = link.split('/').pop().slice(13);
  return linkName;
}
