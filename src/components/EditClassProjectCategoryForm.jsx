import React, { useState, useEffect } from "react";
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Card,
  Image,
  User,
  Avatar
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import QUERIES from "../util/queries";
import fetchData from "../util/fetchData";
import { useMutation, useQuery } from "@apollo/client";

const EditClassProjectCategoryForm = ({ onClose, onComplete, categoryId }) => {
  const endpoint = process.env.REACT_APP_GRAPHQL;
  const [selectedTeachers, setSelectedTeacher] = useState([]);
  const [searchedTeacher, setSearchedTeacher] = useState([]);
  const [updateClassProjectCategory] = useMutation(QUERIES.updateClassProjectCategory);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTeachersId, setSelectedTeacherId] = useState([]);
  const {data, loading, error} = useQuery(QUERIES.getClassProjectCategoryById, {
    variables: {
      categoryId
    }
  })

  useEffect(() => {
    if (data) {
      setName(data.getClassProjectCategoryById.name);
      setDescription(data.getClassProjectCategoryById.description);
      setSelectedTeacher(data.getClassProjectCategoryById.teachers);
      setSelectedTeacherId(data.getClassProjectCategoryById.teachers.map(teacher => teacher.id));
    }
  }, [data]);

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

  const removeTeacher = (idToRemove) => {
    const updatedUsers = selectedTeachers.filter(item => item.id !== idToRemove);
    const updatedIds = selectedTeachersId.filter(item => item !== idToRemove);
    setSelectedTeacherId(updatedIds);
    setSelectedTeacher(updatedUsers);
  };

  const handleUpdateClassProjectCategory = () => {
    updateClassProjectCategory({
      variables: {
        classProject: {
          id: categoryId,
          name,
          description,
          teachers: selectedTeachersId
        }
      }
    }).then(() => {
      setSelectedTeacher([]);
      setSelectedTeacherId([]);
      onComplete();
      onClose();
    }).catch((error) => {
      console.log(error);
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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
          <div className="mt-1 relative w-full h-fit ">
            {searchedTeacher.length !== 0 && (
              <Card shadow="xl" className="absolute overflow-y-auto z-50 w-full py-2 px-2">
                {searchedTeacher.map((user) => {
                  return (
                    <div key={user.id} className="flex items-center justify-between gap-2 py-1 px-2 rounded-lg duration-100 hover:bg-gray-200">
                      <div className="flex items-center gap-2">
                        <Image className="w-10 h-10 rounded-full" src="https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg" />
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
                          if (!selectedTeachers.includes(user)) {
                            setSelectedTeacher([...selectedTeachers, user]);
                            setSelectedTeacherId([...selectedTeachersId, user.id]);
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
          {selectedTeachers.length > 0 ? (
            <div className="mt-2 w-full">
              {selectedTeachers.map((user) => {
                return (
                  <div key={user.id} className="flex items-center">
                    <User
                      name={(<h1 className="font-semibold">{user.name}</h1>)}
                      description={user.studentId}
                      className="my-0.5 mx-3"
                      avatarProps={{
                        src: `${user?.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                        size: 'md'
                      }}
                    />
                    <Button
                      className="border-small mr-0.5 font-medium shadow-small"
                      radius="full"
                      color="danger"
                      size="sm"
                      variant="bordered"
                      onClick={() => { removeTeacher(user.id) }}
                    >
                      Remove
                    </Button>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center mt-2 opacity-60">
                <Avatar size="lg" />
                <p className="mt-2">No selectedTeachers added for this category</p>
            </div>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={handleUpdateClassProjectCategory}>
          Update
        </Button>
      </ModalFooter>
    </>
  )
}

export default EditClassProjectCategoryForm;