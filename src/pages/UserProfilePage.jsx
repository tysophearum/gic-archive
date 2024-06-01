import { Avatar, Chip, Image } from "@nextui-org/react";
import ItemList from "../components/ItemList";
import { EmailIcon } from "../icons/EmailIcon";
import { Tabs, Tab } from "@nextui-org/react";
import ContactIcon from "../components/ContactIcon";
import {
  Tooltip
} from "@nextui-org/react";
import React, { useState } from "react";
import QUERIES from "../util/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const [showMore, setShowMore] = useState(false);
  const userId = useParams().userId;
  const { loading, error, data } = useQuery(QUERIES.getUserById, {variables: {userId}})
  const contributionResponse = useQuery(QUERIES.getUserContribution, {variables: {userId}})

  if (loading || contributionResponse.loading) {
    return <p>Loading...</p>;
  }
  if (error || contributionResponse.error) return (
    <>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Error: {JSON.stringify(contributionResponse.error)}</p>
    </>
  );
  return (
    <div className="flex flex-col items-center md:mt-8">
      <Image radius="none" className="h-[40vh] md:w-[80vw] w-[100vw] object-cover z-0 rounded-t-lg" src="https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg" />
      <div className="md:w-[80vw] w-[100vw] bg-white px-12">
        <Avatar className="w-40 h-40 mt-[-110px]" src={data.getUserById.image} />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <h2 className=" text-xl font-bold mt-3">{data.getUserById.name}</h2>
              <span>ID: {data.getUserById.studentId}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-lg font-semibold mt-5">Contacts</div>
          <div className="text-lg font-semibold mt-5">Contribution</div>
        </div>
        <div className="flex justify-between">
          <div className="pt-3 flex w-1/2 overflow-scroll">
            <Tooltip content={data.getUserById.email}>
              <a className="pr-2" href={'mailto:' + data.getUserById.email} target="_blank" rel="noopener noreferrer">
                <EmailIcon width={30} height={30} />
              </a>
            </Tooltip>
            {data.getUserById.contacts.map((contact, index) => (
              <ContactIcon key={index} type={contact.type} link={contact.value} />
            ))}
          </div>
          <div className="flex w-[12vw] justify-between pt-4">
            <div className=" flex flex-col items-center">
              <h2 className=" text-2xl font-bold">{contributionResponse.data.getUserContribution.classProjectCount}</h2>
              <p className=" text-gray-600 text-sm">Class project</p>
            </div>
            <div className=" flex flex-col items-center">
              <h2 className=" text-2xl font-bold">{contributionResponse.data.getUserContribution.thesisCount}</h2>
              <p className=" text-gray-600 text-sm">Thesis</p>
            </div>
          </div>
        </div>
        <div className={`transition-opacity ease-in-out duration-1000 ${showMore ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
          <div>
            <div className="text-lg font-semibold">Bio</div>
            <div>{data.getUserById.bio}</div>
          </div>
          <div>
            <div className="text-lg font-semibold mt-5">Tags</div>
            <div className="w-1/2">
              {data.getUserById.tags.map((tag, index) => (
                <Chip color="primary" size="lg" className="my-1 mx-0.5" key={index}>{tag}</Chip>
              ))}
            </div>
          </div>
        </div>
        <button onClick={() => { setShowMore(!showMore) }}>Show {showMore ? 'less' : 'more'}</button>
        <Tabs fullWidth className="mt-8">
          <Tab className="w-full" key="photos" title="Class projects">
            <ItemList type={'classProject'} query={QUERIES.listClassProjectByUser} variables={{userId}} title={<h1 className=" text-lg font-semibold">My class project</h1>} />
          </Tab>
          <Tab className="w-full" key="videos" title="Thesis">
            <ItemList type={'thesis'} query={QUERIES.listThesisByUser} variables={{userId}} title={<h1 className=" text-lg font-semibold">My thesis</h1>} />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default UserProfilePage;
