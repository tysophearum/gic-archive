import { Image } from "@nextui-org/react";
import ItemList from "../components/ItemList";
import { FacebookIcon } from "../icons/FacebookIcon";
import { EmailIcon } from "../icons/EmailIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { AddIcon } from "../icons/AddIcon";
import { Tabs, Tab } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";
import TestTable from "../components/TestTable";
import EditProfileForm from "../components/EditProfileForm";
import CreatePostForm from "../components/CreatePostForm";
import QUERIES from "../util/queries";

const ProfilePage = () => {
  const profilePopup = useDisclosure();
  const postPopup = useDisclosure();

  return (
    <div className="flex flex-col items-center md:mt-8">
      <Image radius="none" className="h-[40vh] md:w-[80vw] w-[100vw] object-cover z-0 rounded-t-lg" src="https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg" />
      <div className="md:w-[80vw] w-[100vw] bg-white px-12">
        <Image className="mt-[-70%] w-36" radius="full" src="https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h2 className=" text-xl font-bold mt-3">Ty Sophearum <span className="text-sm font-normal">( Year 5 )</span></h2>
              <span>ID: e20191219</span>
            </div>
            <Button size="sm" startContent={<EditIcon />} variant="bordered" onPress={profilePopup.onOpen} className="ml-2">Edit</Button>
            <Modal
              isOpen={profilePopup.isOpen}
              placement='center'
              onOpenChange={profilePopup.onOpenChange}
              size="4xl"
            >
              <ModalContent>
                {(onClose) => (
                  <EditProfileForm onClose={onClose}/>
                )}
              </ModalContent>
            </Modal>
          </div>
          <Button size="sm" color="primary" onPress={postPopup.onOpen} startContent={<AddIcon />}>New post</Button>
          <Modal
            isOpen={postPopup.isOpen}
            onOpenChange={postPopup.onOpenChange}
            size="full"
            placement="bottom"
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: "easeIn",
                  },
                },
                exit: {
                  y: 20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeOut",
                  },
                }
              }
            }}
          >
            <ModalContent className="h-[94%] overflow-scroll !rounded-t-3xl">
              {(onClose) => (
                <CreatePostForm onClose={onClose}/>
              )}
            </ModalContent>
          </Modal>
        </div>

        <div className="flex justify-between">
          <div className="text-lg font-semibold mt-5">Contact</div>
          <div className="text-lg font-semibold mt-5">Contribution</div>
        </div>
        <div className="flex justify-between">
          <div className="flex w-[12vw] justify-between pt-4">
            <FacebookIcon width={30} height={30} />
            <EmailIcon width={30} height={30} />
            <LinkedinIcon width={30} height={30} />
          </div>
          <div className="flex w-[12vw] justify-between pt-4">
            <div className=" flex flex-col items-center">
              <h2 className=" text-2xl font-bold">7</h2>
              <p className=" text-gray-600 text-sm">Class project</p>
            </div>
            <div className=" flex flex-col items-center">
              <h2 className=" text-2xl font-bold">7</h2>
              <p className=" text-gray-600 text-sm">Thesis</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <TestTable />
        </div>
        <Tabs fullWidth className="mt-8">
          <Tab className="w-full" key="photos" title="Class projects">
            <ItemList baseLink={'/classProject'} query={QUERIES.listMyApprovedClassProject} header={{ Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MTNiZTNiMmVmZmNhODY1YmY1M2MxMyIsImZpcnN0TmFtZSI6IlN0dWRlbnQyIiwibGFzdE5hbWUiOiJTdHVkZW50MiIsImVtYWlsIjoic3R1ZGVudDJAZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsInBhc3N3b3JkIjoiJDJiJDEwJFpjZjkwSlBNRmVnMWtvZ1h5OC9jdk9mN0dpQnNVWkVNTkVWcVNjRTFqbnUvZFZDNzh4VnFTIiwiY29udGFjdHMiOlt7InR5cGUiOiJGYWNlYm9vayIsInZhbHVlIjoiU3R1ZGVudDIifV0sImltYWdlIjoiIiwicm9sZSI6InN0dWRlbnQiLCJjbGFzc1Byb2plY3RDYXRlZ29yeSI6W10sInVwZGF0ZWRfYXQiOjAsImNyZWF0ZWRfYXQiOjE3MTI1Njk5MTUyMDcsIl9fdiI6MH0sImlhdCI6MTcxMzQ5NzMwMywiZXhwIjoxNzEzNTMzMzAzfQ.GFyCQEOK0BW96FTP5NhgEUxTRgQ5R-avhufWOss-rSk` }} title={<h1 className=" text-lg font-semibold">My class project</h1>} />
          </Tab>
          <Tab className="w-full" key="videos" title="Thesis">
            <ItemList baseLink={'/thesis'} query={QUERIES.listMyApprovedThesis} header={{ Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2MTNiZTNiMmVmZmNhODY1YmY1M2MxMyIsImZpcnN0TmFtZSI6IlN0dWRlbnQyIiwibGFzdE5hbWUiOiJTdHVkZW50MiIsImVtYWlsIjoic3R1ZGVudDJAZ21haWwuY29tIiwiZ2VuZGVyIjoibWFsZSIsInBhc3N3b3JkIjoiJDJiJDEwJFpjZjkwSlBNRmVnMWtvZ1h5OC9jdk9mN0dpQnNVWkVNTkVWcVNjRTFqbnUvZFZDNzh4VnFTIiwiY29udGFjdHMiOlt7InR5cGUiOiJGYWNlYm9vayIsInZhbHVlIjoiU3R1ZGVudDIifV0sImltYWdlIjoiIiwicm9sZSI6InN0dWRlbnQiLCJjbGFzc1Byb2plY3RDYXRlZ29yeSI6W10sInVwZGF0ZWRfYXQiOjAsImNyZWF0ZWRfYXQiOjE3MTI1Njk5MTUyMDcsIl9fdiI6MH0sImlhdCI6MTcxMzQ5NzMwMywiZXhwIjoxNzEzNTMzMzAzfQ.GFyCQEOK0BW96FTP5NhgEUxTRgQ5R-avhufWOss-rSk` }} title={<h1 className=" text-lg font-semibold">My thesis</h1>} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage;
