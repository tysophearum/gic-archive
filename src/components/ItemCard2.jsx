import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { StarIcon } from "../icons/StarIcon";
import { GithubIcon } from "../icons/GithubIcon";
import { DotIcon } from "../icons/DotIcon";
import { Link } from 'react-router-dom'

const ItemCard2 = () => {
  return (
    <Link to="/detail">
      <Card
        className="h-fit min-w-60 w-full border-[#d9ecff]"
        shadow="sm"
        isPressable
        onPress={() => console.log("item pressed")}
      >
        <CardBody className="overflow-visible p-0 h-56">
          <Image
            shadow="none"
            radius="lg"
            width="100%"
            alt="{item.title}"
            className="w-full object-cover h-56"
            src="https://img.freepik.com/premium-photo/3d-art-with-abstract-glass-3d-sphere-with-small-balls-particles-inside_170454-33.jpg"
          />
        </CardBody>
        <CardFooter className="text-small block text-start whitespace-nowrap overflow-hidden">
          <div className="flex justify-between items-center my-2">
            <b>Some research</b>
            <span className="flex">
              <StarIcon height={20} width={20} />
              <span>213</span>
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 ">
            <GithubIcon height={15} width={15}/>
            <a href="www.example.com" className="ml-2 hover:underline">
              testing/something
            </a>
            <DotIcon />
            <span>9 Feb 2024</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ItemCard2;