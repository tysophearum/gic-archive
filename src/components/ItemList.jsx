import React from "react";
import { ListIcon } from "../icons/ListIcon";
import { GridIcon } from "../icons/GridIcon";
import { useState } from "react";
import ItemCard from "./ItemCard";
import ItemCard2 from "./ItemCard2";

const ItemList = ({ numberOfElements, title }) => {
  let [grid, setGrid] = useState(true);

  const list = Array.from({ length: numberOfElements }, (_, index) => index);

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
          {list.map((item, index) => (
            <ItemCard2 />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 place-items-center">
          {list.map((item, index) => (
            <ItemCard />
          ))}
        </div>
      )}
    </>
  );
}

export default ItemList