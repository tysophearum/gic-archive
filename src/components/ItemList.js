import React from "react";
import { ListIcon } from "../icons/ListIcon";
import { GridIcon } from "../icons/GridIcon";
import { useState } from "react";
import ItemCard from "./ItemCard";
import ItemCard2 from "./ItemCard2";

export default function ItemList() {
  let [grid, setGrid] = useState(true);

  const list = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
  ];

  return (
    <>
      <div className="flex justify-between my-4">
        <h1 className="text-3xl">Trending</h1>
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
