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
      <div className="flex justify-between my-4">
        <h1 className="text-3xl text-nowrap mb-4 font-semibold">{title}</h1>
        <div className="sm:flex justify-end items-center w-[75vw] hidden">
          <button
            onClick={() => setGrid(true)}
            className={
              grid ? " border border-primary text-primary rounded-lg" : ""
            }
          >
            <GridIcon height={25} width={25} />
          </button>
          <button
            onClick={() => setGrid(false)}
            className={
              grid ? "" : " border border-primary text-primary rounded-lg"
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