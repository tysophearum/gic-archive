import { Image } from "@nextui-org/react";
import { EmailIcon } from "../icons/EmailIcon";
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
  Chip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { useDropzone } from 'react-dropzone';

const EditProfileForm = ({ onClose }) => {
  const [file, setFile] = useState("https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg");
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }
  return (
    <>
      <ModalBody>
        <div className="flex items-center justify-between px-5">
          <div className="flex flex-col">
            <input value="Ty Sophearum" className=" text-4xl font-semibold" /><div className="h-5"></div>
            <span className="text-xl">ID: <input value="e20191219" /></span>
          </div>
          <div className="flex items-end">
            <Image
              isBlurred
              width={150}
              height={150}
              radius="full"
              src={file}
              alt="NextUI Album Cover"
              className="mt-5 ml-5 object-cover"
            />
            <label className="flex items-center justify-center border-2 rounded-full bg-gray-50 text-yellow-500 ml-[-15px] mt-[-2] z-50">
              <CameraIcon />
              <input type="file" onChange={handleChange} className="hidden" />
            </label>
            {/* <Button type="file" className="ml-[-15px] mt-[-2] z-50" radius="full" isIconOnly color="warning" size="sm" variant="faded" aria-label="Take a photo">
              <CameraIcon />
            </Button> */}
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-2 gap-1 px-5">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className=" font-semibold text-lg mb-1">Bio</h3>
              <Textarea
                placeholder="Enter your description"
                value="Built with a native <input> element.
                Visual and ARIA labeling support.
                Change, clipboard, composition, selection, and input event support."
                className="max-w-xs"
              />
            </div>
            <div>
              <h3 className=" font-semibold text-lg mb-1">Gender</h3>
              <Select
                label="Select a gender"
                className="max-w-xs"
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
              <h3 className=" font-semibold text-lg mb-1">Year</h3>
              <Select
                label="Select a gender"
                className="max-w-xs"
              >
                <SelectItem value="male">
                  I1
                </SelectItem>
                <SelectItem value="female">
                  I2
                </SelectItem>
                <SelectItem value="male">
                  I3
                </SelectItem>
                <SelectItem value="female">
                  I4
                </SelectItem>
                <SelectItem value="male">
                  I5
                </SelectItem>
                <SelectItem value="female">
                  M1
                </SelectItem>
                <SelectItem value="female">
                  M2
                </SelectItem>
              </Select>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1">
              <div>
                <h3 className=" font-semibold text-lg mb-1">Contacts</h3>
                <div className="grid grid-cols-[10%,20%,70%] gap-x-1 gap-y-2 place-items-center">
                  <EmailIcon width={30} height={30} />
                  <Input
                    isReadOnly
                    type="email"
                    variant="bordered"
                    defaultValue="Email"
                    className="max-w-xs"
                  />
                  <Input
                    isReadOnly
                    type="email"
                    variant="bordered"
                    defaultValue="junior@nextui.org"
                    className="max-w-xs"
                  />
                  <AddIcon width={30} height={30} />
                  <Input
                    type="email"
                    variant="bordered"
                    defaultValue="Email"
                    className="max-w-xs"
                  />
                  <Input
                    type="email"
                    variant="bordered"
                    defaultValue="junior@nextui.org"
                    className="max-w-xs"
                  />
                </div>
              </div>
              <h3 className=" font-semibold text-lg my-1">Tags</h3>
              <div>
                <Chip color="primary" size="lg" className="my-1">Web Developer</Chip><br />
                <Chip color="primary" size="lg" className="my-1">DevOp</Chip><br />
                <Chip color="primary" size="lg" className="my-1">Another Skill</Chip><br />
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onClose}>
          Save
        </Button>
      </ModalFooter>
    </>
  )
}

export default EditProfileForm;