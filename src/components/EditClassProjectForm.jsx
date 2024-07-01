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

let image = null;
export default function EditClassProjectForm({ id, onClose, onComplete }) {
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

  const endpoint = process.env.REACT_APP_ENDPOINT;
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const classProjectCategory = useQuery(QUERIES.listClassProjectCategory);
  const { data, loading, error } = useQuery(QUERIES.getClassProjectById, {
    variables: { classProjectId: id }
  });
  const [updateClassProject] = useMutation(QUERIES.updateClassProject);

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
  const removeSearchedUser = (idToRemove) => {
    const updatedUsers = collaborators.filter(item => item.id !== idToRemove);
    setCollaborators(updatedUsers);
  };

  useEffect(() => {
    const classProject = data?.getClassProjectById
    if (classProject) {
      setCollaborators(classProject.collaborators);
      setTitle(classProject.title);
      setDescription(classProject.description);
      setCategory(classProject.category.id);
      setRepositoryLink(classProject.repositoryLink);
      setVideoLink(classProject.videoLink);
      setImageLink(classProject.image);

      let fileArray = []
      for (let index = 0; index < classProject?.files?.length; index++) {
        const fileObject = {
          name: classProject?.files[index],
          url: classProject?.fileLinks[index],
          isDeleted: false
        }
        fileArray.push(fileObject)
      }
      setFiles(fileArray)
    }
  }, [data])

  const updateClassProjectAction = useCallback(async (event) => {
    const colabIds = collaborators.map(item => item.id);
    const payload = {
      id,
      title,
      description,
      category,
      repositoryLink,
      videoLink,
      collaborators: colabIds
    }

    const { data, error } = await updateClassProject({ variables: { classProject: payload } })
    if (error) {
      console.log(error);
    }
    let formData = new FormData();
    formData.append('classProjectId', data.updateClassProject.id);

    if (image) {
      try {
        // Step 4: Prepare formData for image
        formData.append('image', image);

        // Step 5: Upload image
        await axios.post('http://localhost:4000/upload/classProject/image', formData);
      } catch (imageUploadError) {
        console.error('Error uploading image:', imageUploadError);
        return; // Exit the function if image upload fails
      }
    }

    onComplete("sonething");
    onClose();
  })

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
    const bol = newFiles.length === 0 && files?.every(file => file.isDeleted);
    alert(bol)
  }

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>Error: {error.message}</p>
  };
  return (
    <>
    {JSON.stringify(newFiles)}
      <ModalHeader className="flex flex-col gap-1">Edit Class Project</ModalHeader>
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
            defaultSelectedKeys={[data?.getClassProjectById?.category.id]}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {classProjectCategory?.data?.listClassProjectCategory?.map((category) => {
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
                      src: user?.image,
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
        <div>
          <h2 className=" font-semibold text-lg mb-3">Reports</h2>
          {files.map((file, index) => (
            !file.isDeleted && (
              <Card key={file.name} className="w-fit p-3 my-2 flex">
                <div className="flex items-center">
                  <span>{getLinkName(file.name)}</span>
                  <div className="border-1 mx-3 h-4 border-red-400"></div>
                  <Tooltip color="danger" content="Remove document">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => {updateIsDeleted(index)}} >
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
        <Button color="primary" onClick={(e) => { updateClassProjectAction(e) }}>
          Submit
        </Button>
        <button onClick={isFilesEmpty}>test</button>
      </ModalFooter>
    </>
  )
}

function getLinkName(link) {
  const linkName = link.split('/').pop().slice(13);
  return linkName;
}
