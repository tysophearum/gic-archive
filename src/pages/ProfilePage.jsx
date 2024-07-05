import { Avatar, Chip, Image } from "@nextui-org/react";
import ItemList from "../components/ItemList";
import { EmailIcon } from "../icons/EmailIcon";
import { AddIcon } from "../icons/AddIcon";
import { Tabs, Tab } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import ContactIcon from "../components/ContactIcon";
import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
  Tooltip
} from "@nextui-org/react";
import React, { useState } from "react";
import PendingPostTable from "../components/PendingPostTable";
import EditProfileForm from "../components/EditProfileForm";
import CreatePostForm from "../components/CreatePostForm";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const profilePopup = useDisclosure();
  const postPopup = useDisclosure();
  const [complete, setComplete] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const { loading, error, data, refetch } = useQuery(QUERIES.getMe)
  const contributionResponse = useQuery(QUERIES.getMyContribution)

  const notifySuccess = (message) => toast.success(message, {
    autoClose: 2500
  });
  const notifyInfo = (message) => toast.info(message, {
    autoClose: 2500
  });
  if (loading || contributionResponse.loading) {
    return <p>Loading...</p>;
  }
  if (error || contributionResponse.error) return (
    <>
      <p>Error: {error.message}</p>
      <p>Error: {contributionResponse.error.message}</p>
    </>
  );
  return (
    <div className="flex flex-col items-center md:mt-8">
      <ToastContainer />
      <Image loading="eager" radius="none" className="h-[40vh] md:w-[80vw] w-[100vw] object-cover z-0 rounded-t-lg" src="https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg" />
      <div className="md:w-[80vw] w-[100vw] bg-white px-12">
        <Avatar className="w-40 h-40 mt-[-110px]" src={data.getMe.image} />
        {/* <img src={data.getMe.image} alt="" className="w-40 h-40 mt-[-110px]" /> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h2 className=" text-xl font-bold mt-3">{data.getMe.name}</h2>
              <span>ID: {data.getMe.studentId}</span>
            </div>
            <Button size="sm" startContent={<EditIcon />} variant="bordered" onPress={profilePopup.onOpen} className="ml-2">Edit</Button>
            <Modal
              isOpen={profilePopup.isOpen}
              placement='center'
              onOpenChange={profilePopup.onOpenChange}
              size="2xl"
              scrollBehavior="outside"
            >
              <ModalContent>
                {(onClose) => (
                  <EditProfileForm onClose={onClose} onComplete={() => {notifyInfo("Profile updated");refetch()}} user={data.getMe} />
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
                <CreatePostForm onClose={onClose} onComplete={() => {notifySuccess("Document submitted successfully."); setComplete(complete + 1) }} />
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="flex justify-between">
          <div className="text-lg font-semibold mt-5">Contacts</div>
          <div className="text-lg font-semibold mt-5">Contribution</div>
        </div>
        <div className="flex justify-between">
          <div className="pt-3 flex w-1/2 overflow-scroll">
            <Tooltip content={data.getMe.email}>
              <a className="pr-2" href={'mailto:' + data.getMe.email} target="_blank" rel="noopener noreferrer">
                <EmailIcon width={30} height={30} />
              </a>
            </Tooltip>
            {data.getMe.contacts.map((contact, index) => (
              <ContactIcon key={index} type={contact.type} link={contact.value} />
            ))}
          </div>
          <div className="flex w-[12vw] justify-between pt-4">
            <div className=" flex flex-col items-center">
              <h2 className=" text-2xl font-bold">{contributionResponse.data.getMyContribution.classProjectCount}</h2>
              <p className=" text-gray-600 text-sm">Class project</p>
            </div>
            <div className=" flex flex-col items-center">
              <h2 className=" text-2xl font-bold">{contributionResponse.data.getMyContribution.thesisCount}</h2>
              <p className=" text-gray-600 text-sm">Thesis</p>
            </div>
          </div>
        </div>
        <div className={`transition-opacity ease-in-out duration-1000 ${showMore ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div>
            <div className="text-lg font-semibold">Bio</div>
            <div>{data.getMe.bio}</div>
          </div>
          <div>
            <div className="text-lg font-semibold mt-5">Tags</div>
            <div className="w-1/2">
              {data.getMe.tags.map((tag, index) => (
                <Chip color="primary" size="lg" className="my-1 mx-0.5" key={index}>{tag}</Chip>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => { setShowMore(!showMore) }}>Show {showMore ? 'less' : 'more'}</button>
        <div className="mt-6">
          <PendingPostTable fetchData={complete} />
        </div>
        <Tabs fullWidth className="mt-8">
          <Tab className="w-full" key="photos" title="Class projects">
            <ItemList type={'classProject'} query={QUERIES.listMyApprovedClassProject} title={<h1 className=" text-lg font-semibold">My class project</h1>} />
          </Tab>
          <Tab className="w-full" key="videos" title="Thesis">
            <ItemList type={'thesis'} query={QUERIES.listMyApprovedThesis} title={<h1 className=" text-lg font-semibold">My thesis</h1>} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage;
