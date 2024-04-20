import { ListIcon } from "../icons/ListIcon";
import { GridIcon } from "../icons/GridIcon";
import React, { useState, useEffect } from "react";
import fetchData from "../util/fetchData";
import ItemCard from "./ItemCard";
import ItemCard2 from "./ItemCard2";

const ItemList = ({ query, variable, header, title, baseLink }) => {
  let [grid, setGrid] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const endpoint = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [responseData, error] = await fetchData(endpoint, query, variable, header);
        console.log(query);
        if (error) {
          throw new Error(error.message);
        }
        const resArray = Object.entries(responseData);
        const [[key, res]] = resArray;
        setData(res.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    }

    getData();
  }, [query, variable]);

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
            {/* <span>List</span> */}
          </button>
        </div>
      </div>
      {grid ? (
        <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
          {data.map((item, index) => (
            <ItemCard2 link={baseLink+'/'+item.id} document={item} key={index} /> // Don't forget to add key prop
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 place-items-center">
          {data.map((item, index) => (
            <ItemCard document={item} key={index} /> // Don't forget to add key prop
          ))}
        </div>
      )}
    </>
  );
}

export default ItemList;
