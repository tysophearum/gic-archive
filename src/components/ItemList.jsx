import { ListIcon } from "../icons/ListIcon";
import { GridIcon } from "../icons/GridIcon";
import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import ItemCard2 from "./ItemCard2";
import { useQuery } from "@apollo/client";

const ItemList = ({ query, variables, title, type }) => {
  let [grid, setGrid] = useState(true);
  const [data, setData] = useState([]);
  const { loading, error, data: response } = useQuery(query, {variables});

  useEffect(() => {
    if (typeof response !== 'undefined') {
      const resArray = Object.entries(response);
      const [[key, res]] = resArray;
      setData(res.data);
    }
  }, [query, variables, loading]);

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }
return (
      <>
      <div className="flex justify-between my-4 w-full">
        {title}
        <div className="sm:flex items-center hidden">
          <button
            onClick={() => setGrid(true)}
            className={
              grid ? " border border-primary text-primary rounded-lg mr-1" : ""
            }
          >
            <GridIcon height={25} width={25} />
          </button>
          <button
            onClick={() => setGrid(false)}
            className={
              grid ? "" : " border border-primary text-primary rounded-lg ml-1"
            }
          >
            <ListIcon height={25} width={25} />
          </button>
        </div>
      </div>
      {grid ? (
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
          {data?.map((item, index) => (
            <ItemCard2 type={type} document={item} key={index} /> // Don't forget to add key prop
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 place-items-center">
          {data?.map((item, index) => (
            <ItemCard type={type} document={item} key={index} /> // Don't forget to add key prop
          ))}
        </div>
      )}
      </>
  );
}

export default ItemList;
