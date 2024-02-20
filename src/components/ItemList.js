import React from "react";
import { Card, CardBody, CardFooter, Image, CardHeader, Button, Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { Listicon } from "../icons/Listicon";
import { GridIcon } from "../icons/GridIcon";
import { useState } from 'react'
import ItemCard from "./ItemCard";
import { StarIcon } from "../icons/StarIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { DotIcon } from "../icons/DotIcon";

export default function ItemList() {
  let [grid, setGrid] = useState(true)

  const list = [
    {
      title: "Orange",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$12.20",
    },
    {
      title: "Orange",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$12.20",
    },
    {
      title: "Orange",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$3.00",
    },
    {
      title: "Raspberry",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "https://production-media.paperswithcode.com/thumbnails/paper/2102.07619.jpg",
      price: "$12.20",
    },
  ];

  return (
    <>
      <div className='px-3 grid grid-cols-1 place-items-center w-[100vw]'>
        <div className="w-[75vw] my-4">
          <Card isFooterBlurred className="w-full h-[350px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Welcome to</p>
              <h4 className="text-white/90 font-medium text-xl">GIC Archive</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-fit object-cover"
              src="https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg" />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  alt="Breathing app icon"
                  className="rounded-full w-10 h-11 bg-black"
                  src="/images/breathing-app-icon.jpeg" />
                <Input
                  classNames={{
                    base: "max-w-full mr-8 h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<SearchIcon size={18} />}
                  type="search"
                />
              </div>
              <Button radius="full" size="sm">Search</Button>
            </CardFooter>
          </Card>
        </div>
        <div className='flex justify-between w-[75vw] my-4'>
          <h1 className='text-3xl'>
            Trending
          </h1>
          <div className='flex justify-end items-center w-[75vw]'>
            <button onClick={() => setGrid(true)} className={grid ? 'border border-black' : ''}>
              <GridIcon height={25} width={25} />
            </button>
            <button onClick={() => setGrid(false)} className={grid ? '' : 'border border-black'}>
              <Listicon height={35} width={35} />
            </button>
          </div>
        </div>
        {grid ? (
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 w-[75vw]">
            {list.map((item, index) => (
              <Card className="h-fit" shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                <CardBody className="overflow-visible p-0 h-56">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.title}
                    className="w-full object-cover h-fit"
                    src={item.img} />
                </CardBody>
                <CardFooter className="text-small block text-start">
                  <div className="flex justify-between items-center my-2">
                    <b>{item.title}</b>
                    <span className="flex">
                      <StarIcon height={20} width={20} />
                      <span>213</span>
                    </span>
                  </div>
                  <div className='flex items-center text-sm text-gray-600 '>
                    <GithubIcon />
                    <a href='www.example.com' className='ml-2 hover:underline'>testing/something</a>
                    <DotIcon />
                    <span>9 Feb 2024</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className='p-3 grid grid-cols-1 place-items-center w-[100vw]'>
            {list.map((item, index) => (
              <ItemCard />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
