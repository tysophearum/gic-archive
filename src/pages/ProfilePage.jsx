import { Image } from "@nextui-org/react";
import ItemList from "../components/ItemList";
import { FacebookIcon } from "../icons/FacebookIcon";
import { EmailIcon } from "../icons/EmailIcon";
import { LinkedinIcon } from "../icons/LinkedinIcon";
import { AddIcon } from "../icons/AddIcon";
import { Tabs, Tab } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const ProfilePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            <Button size="sm" startContent={<EditIcon />} variant="bordered" onPress={onOpen} className="ml-2">Edit</Button>
            <Modal
              isOpen={isOpen}
              placement='center'
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                    <ModalBody>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <Button size="sm" color="primary" startContent={<AddIcon />}>New post</Button>
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
            <AddIcon width={30} height={30} />
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
        <Tabs size='lg' aria-label="Tabs sizes" className="w-full mt-8">
          <Tab className="w-[40vw]" key="photos" title="Class projects" />
          <Tab className="w-[40vw]" key="videos" title="Thesis" />
        </Tabs>
        <ItemList numberOfElements={18} title="My Posts" />
      </div>
    </div>
  )
}

export default ProfilePage;
