import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button, User } from '@nextui-org/react';
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import ViewTextArea from './ViewTextArea';
import fetchData from '../util/fetchData';
import unixToTime from '../util/unixToTime';

const ViewDetail = ({ query, variable }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const endpoint = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [responseData, error] = await fetchData(endpoint, query, variable);
        if (error) {
          throw new Error(error.message);
        }
        const resArray = Object.entries(responseData);
        const [[key, res]] = resArray;
        setData(res);
        console.log(data.collaborators);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    }

    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }
  return (
    <>
      <h1 className=" text-4xl font-semibold mt-6">
        {data.title}
      </h1>
      <span className=" text-sm text-primary-700 mt-3">
        Publish in {unixToTime(data.createdAt)} by <b>{data.user.firstName}</b>
      </span>
      <ViewTextArea text={data.description} maxLines={2} />
      <h2 className=" text-xl font-semibold mt-8 mb-2">Resource </h2><div className="flex">
        <Button radius='sm' className='bg-primary-500 text-white my-0.5 w-32 mr-2' startContent={<PaperIcon height={20} width={20} />}>Paper</Button>
        <Button radius='sm' className='bg-black text-white ml-2 w-32' startContent={<GithubIcon height={20} width={20} />}>Code</Button>
      </div>
      <h2 className=" text-xl font-semibold mt-10 mb-2">Posted by </h2><div className="flex items-center">
        <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src="https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg" />
        <div>
          <p className='text-lg font-semibold'>{data.user.firstName}</p>
          <p className='text-sm text-zinc-500'>e20191219</p>
        </div>
      </div>
      <h2 className=" text-xl font-semibold mt-10 mb-2">Collaborated by </h2><div className='grid grid-cols-1 gap-1 place-items-start'>
        {data.collaborators.map((collaborator) => {
          return (<User
            name={(<h1 className="font-semibold text-lg">{collaborator.firstName}</h1>)}
            description="e20191219"
            className="my-2 text-lg"
            avatarProps={{
              src: "https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg",
              size: 'lg'
            }} />)
        })}
      </div>
      <h2 className=" text-xl font-semibold mt-10 mb-2">Citation </h2>
      <p className="text-zinc-700 mb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, in. Sapiente, sed perspiciatis, neque quam quisquam animi nisi soluta sunt dolor, ea esse consectetur. Sunt aliquam harum iste expedita quo?</p></>
  );
};

export default ViewDetail;
