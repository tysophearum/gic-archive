import React from "react";
import { Card, CardBody, CardFooter, Image, Avatar } from "@nextui-org/react";
import { StarIcon } from "../icons/StarIcon";
import { Link } from 'react-router-dom'

const ItemCard2 = ({document, link}) => {
  return (
    <Link to={link}>
      <Card
        className="h-fit min-w-60 w-full border-[#d9ecff] bg-transparent"
        shadow="none"
        radius="sm"
      >
        <CardBody className="overflow-visible p-0 h-56">
          <Image
            shadow="none"
            radius="sm"
            width="100%"
            alt="{item.title}"
            className="w-full object-cover h-56"
            src="https://img.freepik.com/premium-photo/3d-art-with-abstract-glass-3d-sphere-with-small-balls-particles-inside_170454-33.jpg"
          />
        </CardBody>
        <CardFooter className="absolute bg-black/40 bottom-0 duration-150 z-10 dark:border-default-100">
          <h1 className=" text-white font-semibold">{document.title}</h1>
        </CardFooter>
      </Card>
      <div className="flex justify-between w-full items-center my-2">
        <div className="flex items-center">
          <Avatar className="w-6 h-6 text-tiny" />
          <a href="www.example.com" className="hover:underline font-semibold ml-1">
            {document.user.firstName}
          </a>
        </div>
        <span className="flex">
          <StarIcon height={20} width={20} />
          <span>{document.likeAmount}</span>
        </span>
      </div>
    </Link>
  );
};

export default ItemCard2;