import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, User } from '@nextui-org/react';
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import ViewTextArea from './ViewTextArea';
import unixToTime from '../util/unixToTime';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const ViewDetail = ({ query, variables }) => {
  const [data, setData] = useState(null);
  const { loading, error, data: response } = useQuery(query, { variables });

  useEffect(() => {
    if (!loading) {
      const resArray = Object.entries(response);
      const [[key, res]] = resArray;
      setData(res);
    }
  }, [loading, query, variables]);

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
            <Button radius='sm' className='bg-primary-500 text-white my-0.5 w-32 mr-2' startContent={<PaperIcon height={20} width={20} />}>Paper</Button>
            <Button radius='sm' className='bg-black text-white ml-2 w-32' startContent={<GithubIcon height={20} width={20} />}>Code</Button>
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
                  src: "https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg",
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
                      src: "https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg",
                    }} />
                </Link>
              </div>
            </>
          )}
          {data.collaborators.length > 0 && (
            <>
              <h2 className=" text-xl font-semibold mt-4 mb-2">Collaborators </h2>
              <div className="flex items-center">
                {data.collaborators.map((collaborator) => {
                  return (
                    <Link key={collaborator.id} to={'/profile/' + collaborator.id}>
                      <User
                        key={collaborator.id}
                        name={(<h1 className="font-semibold">{collaborator.name}</h1>)}
                        description={collaborator.studentId}
                        className="my-2 text-lg"
                        // avatarProps={{
                        //   src: `${collaborator.image}`,
                        // }} 
                        />
                    </Link>
                  );
                })}
              </div>
            </>)}
          <h2 className=" text-xl font-semibold mt-10 mb-2">Citation </h2><p className="text-zinc-700 mb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, in. Sapiente, sed perspiciatis, neque quam quisquam animi nisi soluta sunt dolor, ea esse consectetur. Sunt aliquam harum iste expedita quo?</p>
        </>
      )}
    </>
  );
};

export default ViewDetail;
