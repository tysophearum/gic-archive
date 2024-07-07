import React, { useState, useEffect } from 'react';
import { Button, User, Modal, ModalContent, ModalHeader, ModalBody, Card, useDisclosure } from '@nextui-org/react';
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import ViewTextArea from './ViewTextArea';
import unixToTime from '../util/unixToTime';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const ViewDetail = ({ query, variables }) => {
  const [data, setData] = useState(null);
  const { loading, error, data: response } = useQuery(query, { variables });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    if (!loading) {
      const resArray = Object.entries(response);
      const [[_, res]] = resArray;
      setData(res);
    }
  }, [loading, query, variables, response]);

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }
  return (
    <>
      {data && (
        <>
          <h1 className=" text-4xl font-semibold mt-6">
            {data.title}
          </h1>
          <span className=" text-sm text-primary-700 mt-3">
            Publish in {unixToTime(data.createdAt)} by <b>{data.user.name}</b>
          </span>
          <ViewTextArea text={data.description} maxLines={6} />
          <h2 className=" text-xl font-semibold mt-8 mb-2">Resource </h2>
          <div className="flex">
            <Button onPress={onOpen} radius='sm' className='bg-primary-500 text-white my-0.5 w-32 mr-2' startContent={<PaperIcon height={20} width={20} />}>Paper</Button>
            <Modal isOpen={isOpen} size='xl' onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Report Documents</ModalHeader>
                    <ModalBody className='mb-4'>
                      <div className='grid grid-cols-1 w-full gap-4'>
                        {data.files.map((reportDocument, i) => (
                          <a target="_blank"  rel="noreferrer" href={data.fileLinks?.[i]}>
                            <Card shadow='sm' key={reportDocument} isPressable variant="bordered" className='w-full py-3 px-3'>
                              {getLinkName(reportDocument)}
                            </Card>
                          </a>
                        ))}
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
            <a target="_blank" rel="noreferrer" href={data.repositoryLink.includes('https://') ? data.repositoryLink : `https://${data.repositoryLink}`}><Button radius='sm' className='bg-black text-white ml-2 w-32' startContent={<GithubIcon height={20} width={20} />}>Code</Button></a>
          </div>
          <h2 className=" text-xl font-semibold mt-10 mb-2">Posted by </h2>
          <div className="flex items-center">
            <Link to={'/profile/' + data.user.id}>
              <User
                key={data.user.id}
                name={(<h1 className="font-semibold">{data.user.name}</h1>)}
                description={data.user.studentId}
                className="my-2 text-lg"
                avatarProps={{
                  src: `${data.user.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                }} />
            </Link>
          </div>
          {data.teacher && (
            <>
              <h2 className=" text-xl font-semibold mt-4 mb-2">Teacher </h2>
              <div className="flex items-center">
                <Link to={'/profile/' + data.teacher.id}>
                  <User
                    key={data.teacher.id}
                    name={(<h1 className="font-semibold">{data.teacher.name}</h1>)}
                    description={data.teacher.studentId}
                    className="my-2 text-lg"
                    avatarProps={{
                      src: `${data.teacher.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                    }} />
                </Link>
              </div>
            </>
          )}
          {data.collaborators.length > 0 && (
            <>
              <h2 className=" text-xl font-semibold mt-4 mb-2">Collaborators </h2>
              <div className="flex flex-col">
                {data.collaborators.map((collaborator) => {
                  return (
                    <Link key={collaborator.id} to={'/profile/' + collaborator.id}>
                      <User
                        key={collaborator.id}
                        name={(<h1 className="font-semibold">{collaborator.name}</h1>)}
                        description={collaborator.studentId}
                        className="my-2 text-lg"
                        avatarProps={{
                          src: `${collaborator.image || "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png"}`,
                        }}
                      />
                    </Link>
                  );
                })}
              </div>
            </>)}
          {/* <h2 className=" text-xl font-semibold mt-10 mb-2">Citation </h2><p className="text-zinc-700 mb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, in. Sapiente, sed perspiciatis, neque quam quisquam animi nisi soluta sunt dolor, ea esse consectetur. Sunt aliquam harum iste expedita quo?</p> */}
        </>
      )}
    </>
  );
};

export default ViewDetail;

function getLinkName(link) {
  const linkName = link.split('/').pop().slice(13);
  return linkName;
}
