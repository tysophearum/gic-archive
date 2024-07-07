import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import Banner from "../components/Banner";
import ItemList from "../components/ItemList";
import QUERIES from '../util/queries';

const HomePage = () => {
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <div className="mt-3 flex justify-start">
        <Button
          className="mx-1"
          radius="full"
          color="primary"
          variant="bordered"
        >
          Most Liked
        </Button>
      </div>
      <Banner query={QUERIES.listFeaturedDocuments} />
      <ItemList query={QUERIES.listMostLikedDocuments} title={<h1 className='text-3xl font-semibold'>Most Liked</h1>} />
    </div>
  );
};

export default HomePage;
