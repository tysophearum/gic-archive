import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import Banner from "../components/Banner";
import ItemList from "../components/ItemList";
import fetchData from '../util/fetchData';
import QUERIES from '../util/queries';
import { Link } from 'react-router-dom';

const ThesisPage = () => {
  const endpoint = process.env.REACT_APP_ENDPOINT;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectCategory, setSelectCategory] = useState({name: "All"});
  const [loading, setLoading] = useState(true);
  const [listDataQuery, setListDataQuery] = useState(QUERIES.listApprovedThesis);
  const [variables, setVariables] = useState();

  useEffect(() => {
    async function getData() {
      try {
        if (selectCategory.id) {
          setListDataQuery(QUERIES.listApprovedThesisByCategory);
          setVariables({ categoryId: selectCategory.id })
        }
        const [data, error] = await fetchData(endpoint, QUERIES.listThesisCategory);
        setData(data.listThesisCategory);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [selectCategory]);

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <div className="mt-3 flex justify-start">
        <Link to={'/thesis'}>
          <Button
            className="mx-1"
            radius="full"
            color="primary"
            variant="bordered"
          >
            All
          </Button>
        </Link>
        {data.map((category) => {
          return (
            <div onClick={()=>{
              setSelectCategory(category)
              }}
              className='border-2 rounded-full border-primary grid place-items-center px-2 mx-1 text-primary'
              key={category.id}>
              {category.name}
            </div>
          )
        })}
      </div>
      <Banner />
      <ItemList baseLink={'/thesis'} query={listDataQuery} variable={variables} title={<h1 className='text-3xl font-semibold'>{selectCategory.name}</h1>} />
    </div>
  );
};

export default ThesisPage;
