import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import Banner from "../components/Banner";
import ItemList from "../components/ItemList";
import QUERIES from '../util/queries';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const ThesisPage = () => {
  const [selectCategory, setSelectCategory] = useState({name: "All"});
  const [listDataQuery, setListDataQuery] = useState(QUERIES.listApprovedThesis);
  const [variables, setVariables] = useState();
  const { loading, error, data } = useQuery(QUERIES.listThesisCategory);
  const featuredThesis = useQuery(QUERIES.listFeaturedThesis);

  useEffect(() => {
    if (selectCategory.id) {
      setListDataQuery(QUERIES.listApprovedThesisByCategory);
      setVariables({ categoryId: selectCategory.id })
    }
  }, [selectCategory]);

  if (loading || featuredThesis.loading) {
    return <p>Loading...</p>;
  }
  if (error || featuredThesis.error) return (
    <><p>Error: {error.message}</p>
    <p>Error: {featuredThesis.error.message}</p>
    </>
  );
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
        {data.listThesisCategory.map((category) => {
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
      <Banner type={'thesis'}/>
      <ItemList type={'thesis'} query={listDataQuery} variables={variables} title={<h1 className='text-3xl font-semibold'>{selectCategory.name}</h1>} />
    </div>
  );
};

export default ThesisPage;
