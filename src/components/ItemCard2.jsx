import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image, Avatar } from "@nextui-org/react";
import { StarIcon } from "../icons/StarIcon";
import { StarIconFill } from "../icons/StarIconFill";
import { Link } from 'react-router-dom'
import { useMutation } from "@apollo/client";
import QUERIES from "../util/queries";
import { useCallback } from "react";
import ErrorAlert from "./ErrorAlert";

const ItemCard2 = ({ document }) => {
  const [like, setLike] = useState(document.liked)
  const [likeAmount, setLikeAmount] = useState(document.likeAmount)
  const [likeClassProject] = useMutation(QUERIES.likeClassProject);
  const [likeThesis] = useMutation(QUERIES.likeThesis);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const handleClose = () => {
    setIsError(false);
  };
  const handleLike = useCallback(async () => {
    try {
      if (document.__typename.toLowerCase().includes('classproject')) {
        await likeClassProject({ variables: { classProjectId: document.id } });
      } else if (document.__typename.toLowerCase().includes('thesis')) {
        await likeThesis({ variables: { thesisId: document.id } });
      }
      setLike(!like);
      setLikeAmount(like ? likeAmount - 1 : likeAmount + 1);
    } catch (error) {
      const message = error.message === "Invalid token" ? "Please login to perform this action" : error.message
      setErrorMessage(message)
      setIsError(true)
    }
  }, [like, likeAmount, likeClassProject, likeThesis, document.id, document.__typename]);
  return (
    <div>
      <ErrorAlert open={isError} message={errorMessage} close={handleClose} />
      <Link to={document.__typename.toLowerCase().includes('thesis') ? `/thesis/${document.id}` : document.__typename.toLowerCase().includes('classproject') ? `/classProject/${document.id}`: ''}>
        <Card
          className="h-fit min-w-60 w-full border-[#d9ecff] bg-transparent"
          shadow="none"
          radius="sm"
        >
          <CardBody className="overflow-visible p-0 h-56">
            <Image
              shadow="none"
              loading="eager"
              radius="sm"
              width="100%"
              alt="{item.title}"
              className="w-full object-cover h-56"
              src={document.image || 'https://cdn.dribbble.com/users/6944734/screenshots/17665290/media/97649adc40b4df0b29b59d57f7657b2c.png'} />
          </CardBody>
          <CardFooter className="absolute bg-black/40 bottom-0 duration-150 z-10 dark:border-default-100">
            <h1 className=" text-white font-semibold">{document.title}</h1>
          </CardFooter>
        </Card>
      </Link>
      <div className="flex justify-between w-full items-center my-2">
        <div className="flex items-center">
          <Avatar className="w-6 h-6 text-tiny" src={`${document.user.image}`} />
          <Link to={'/profile/' + document.user.id} className="hover:underline font-semibold ml-1">
            {document.user.name}
          </Link>
        </div>
        <button onClick={handleLike}>
          {like ? (
            <span className="flex text-yellow-500">
              <StarIconFill height={20} width={20} />
              <span>{likeAmount}</span>
            </span>
          ) : (
            <span className="flex">
              <StarIcon height={20} width={20} />
              <span>{likeAmount}</span>
            </span>
          )}
        </button>

      </div>
    </div>
  );
};

export default ItemCard2;