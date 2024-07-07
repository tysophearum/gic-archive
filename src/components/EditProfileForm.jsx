import { Image } from "@nextui-org/react";
import { AddIcon } from "../icons/AddIcon";
import { CameraIcon } from "../icons/CameraIcon";
import {
  ModalFooter,
  Button,
  Divider,
  ModalBody,
  Input,
  Textarea,
  Select,
  SelectItem,
  Tooltip,
  Avatar
} from "@nextui-org/react";
import { DeleteIcon } from "../icons/DeleteIcon";
import React, { useCallback, useState } from "react";
import QUERIES from "../util/queries";
import { useMutation } from "@apollo/client";
import axios from "axios";

const EditProfileForm = ({ onClose, onComplete, user }) => {
  const [image, setImage] = useState(user.image);
  const [coverImage, setCoverImage] = useState("https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg");
  const [name, setName] = useState(user.name);
  const [studentId, setStudentId] = useState(user.studentId);
  const [bio, setBio] = useState(user.bio);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [contacts, setContact] = useState(user.contacts);
  const [tags, setTags] = useState(user.tags);
  const [updateMyProfile] = useMutation(QUERIES.updateMyProfile);

  const handleImageChange = (e) => {
    // alert("herhe")
    setImage(URL.createObjectURL(e.target.files[0]))

    let formData = new FormData();
    formData.append('userId', user.id)
    formData.append('image', e.target.files[0])
    axios.post(process.env.REACT_APP_ENDPOINT+'/upload/profile/image', formData)
  }
  const handleCoverChange = (e) => {
    setCoverImage(URL.createObjectURL(e.target.files[0]))
  }
  const handleContactTypeChange = (index, newValue) => {
    const newArray = [...contacts];
    newArray[index].type = newValue;
    setContact(newArray);
  };
  const handleContactValueChange = (index, newValue) => {
    const newArray = [...contacts];
    newArray[index].value = newValue;
    setContact(newArray);
  };
  const handleTagChange = (index, newValue) => {
    const newArray = [...tags];
    newArray[index] = newValue;
    setTags(newArray);
  };

  const updateProfile = useCallback(async () => {
    try {
      const contactNoTypename = contacts.map(({ __typename, ...rest }) => rest);
      const user = {
        name,
        studentId,
        bio,
        gender,
        email,
        contacts: contactNoTypename,
        tags,
      };
      await updateMyProfile({
        variables: {user},
        ignoreResults: true
      });
      onComplete()
      onClose();
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  }, [name, studentId, bio, gender, email, contacts, tags, onClose, onComplete])

  return (
    <>
      <ModalBody>
        <div className="flex flex-col items-center px-5">
          <div className="flex flex-col items-end mb-[-140px]">
            <Image radius="lg" className="h-[40vh] md:w-[80vw] w-[100vw] object-cover z-0" src={coverImage} />
            <label className="flex items-center justify-center border-2 rounded-full bg-gray-50 text-yellow-500 mt-[-15px] z-50">
              <CameraIcon />
              <input type="file" onChange={handleCoverChange} className="hidden" />
            </label>
          </div>
          <div className="flex items-end">
            <Avatar
              className="w-40 h-40"
              src={image} />
            <label className="flex items-center justify-center border-2 rounded-full bg-gray-50 text-yellow-500 ml-[-40px] mt-[-2] z-50">
              <CameraIcon />
              <input type="file" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
          <div className="flex flex-col items-center mt-2 gap-1">
            <input value={name} onChange={(e) => setName(e.target.value)} className="text-xl font-semibold text-center border-b outline-none focus:border-blue-500" />
            <input value={studentId} onChange={(e) => setStudentId(e.target.value)} className=" text-center border-b outline-none focus:border-blue-500" />
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className=" font-semibold text-lg mb-1">Bio</h3>
            <Textarea
              value={bio}
              onValueChange={(value) => setBio(value)}
              placeholder="Enter your description"
            />
          </div>
          <div>
            <h3 className=" font-semibold text-lg mb-1">Gender</h3>
            <Select
              label="Select a gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <SelectItem value="male">
                male
              </SelectItem>
              <SelectItem value="female">
                female
              </SelectItem>
            </Select>
          </div>
          <div>
            <h3 className=" font-semibold text-lg mb-1">Contacts</h3>
            <div className="grid grid-cols-[20%,80%] gap-x-1 gap-y-2 place-items-center">
              <Input
                isReadOnly
                type="email"
                variant="bordered"
                defaultValue="Email"
              />
              <Input
                type="email"
                variant="bordered"
                placeholder="Enter your email"
                onValueChange={(value) => setEmail(value)}
                value={email}
              />
            </div>
            {contacts.map((contact, index) => (
              <div key={index} className="grid grid-cols-[20%,72%,8%] place-items-center gap-x-1 gap-y-2 mt-2">
                <Input
                  type="email"
                  variant="bordered"
                  value={contact.type}
                  onValueChange={(value) => handleContactTypeChange(index, value)}
                />
                <Input
                  variant="bordered"
                  value={contact.value}
                  onValueChange={(value) => handleContactValueChange(index, value)}
                />
                <Tooltip color="danger" content="Delete contact">
                  <span onClick={() => setContact(contacts.filter((_, i) => i !== index))} className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            ))}
            <div className="pt-3 flex justify-center ">
              {contacts.some(contact => contact.type === "" || contact.value === "") ?
                (
                  <Tooltip placement="right" color="danger" content="There's an empty contact field">
                    <button className="hover:text-red-600 my-1"><AddIcon width={25} height={25} /></button>
                  </Tooltip>
                ) : (
                  <Tooltip placement="right" color="primary" content="Add contact">
                    <button onClick={() => setContact([...contacts, { type: '', value: '' }])} className="hover:text-blue-600"><AddIcon width={25} height={25} /></button>
                  </Tooltip>
                )
              }
            </div>
          </div>
          <div>
            <h3 className=" font-semibold text-lg my-1">Tags</h3>
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center">
                <input type="text" value={tag} onChange={(e) => handleTagChange(index, e.target.value)} className="mr-2 bg-blue-500 border-2 border-blue-500 text-white text-center my-1 py-1 rounded-full outline-none focus:bg-white focus:text-black" />
                <Tooltip color="danger" content="Delete tag">
                  <span onClick={() => setTags(tags.filter((_, i) => i !== index))} className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </div>
            ))}
            {tags.includes('') ?
              (
                <Tooltip placement="under" color="danger" content="There's an empty tag">
                  <button className="hover:text-red-600 my-1"><AddIcon width={25} height={25} /></button>
                </Tooltip>
              ) : (
                <Tooltip placement="under" color="primary" content="Add tag">
                  <button onClick={() => setTags([...tags, ''])} className="hover:text-blue-600 my-1"><AddIcon width={25} height={25} /></button>
                </Tooltip>
              )
            }
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={updateProfile}>
          Save
        </Button>
      </ModalFooter>
    </>
  )
}

export default EditProfileForm;