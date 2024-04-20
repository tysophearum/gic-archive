import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import Banner from "../components/Banner";
import ItemList from "../components/ItemList";
import fetchData from '../util/fetchData';
import QUERIES from '../util/queries';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const query = QUERIES.listThesisCategory;
  const endpoint = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    async function getData() {
      const [data, error] = await fetchData(endpoint, query);
      setData(data.listThesisCategory);
      setError(error);
    }
    getData();
  }, []);

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <div className="mt-3 flex justify-start">
          {data.map((category) => {
            return (
              <Button
                className="mx-1"
                radius="full"
                color="primary"
                variant="bordered"
                key={category.id}
              >
                {category.name}
              </Button>
            )
          })}
      </div>
      <Banner />
      <ItemList numberOfElements={20} title={<h1 className='text-3xl font-semibold'>Trending</h1>} />
    </div>
  );
};

export default HomePage;
