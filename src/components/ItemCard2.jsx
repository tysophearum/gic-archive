import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image, Avatar } from "@nextui-org/react";
import { StarIcon } from "../icons/StarIcon";
import { StarIconFill } from "../icons/StarIconFill";
import { Link } from 'react-router-dom'
import { useMutation } from "@apollo/client";
import QUERIES from "../util/queries";
import { useCallback } from "react";
import { data } from "autoprefixer";

const ItemCard2 = ({ document, type }) => {
  const [like, setLike] = useState(document.liked)
  const [likeAmount, setLikeAmount] = useState(document.likeAmount)
  const [likeClassProject] = useMutation(QUERIES.likeClassProject);
  const [likeThesis] = useMutation(QUERIES.likeThesis);

  const handleLike = useCallback(async () => {
    if (type === 'classProject') {
      likeClassProject({ variables: { classProjectId: document.id } })
    } else if (type === 'thesis') {
      likeThesis({ variables: { thesisId: document.id } })
    }
    setLike(!like);
    setLikeAmount(like ? likeAmount - 1 : likeAmount + 1);
  }, [like])
  return (
    <div>
      <Link to={'/' + type + '/' + document.id}>
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
              src="https://img.freepik.com/premium-photo/3d-art-with-abstract-glass-3d-sphere-with-small-balls-particles-inside_170454-33.jpg" />
          </CardBody>
          <CardFooter className="absolute bg-black/40 bottom-0 duration-150 z-10 dark:border-default-100">
            <h1 className=" text-white font-semibold">{document.title}</h1>
          </CardFooter>
        </Card>
      </Link>
      <div className="flex justify-between w-full items-center my-2">
        <div className="flex items-center">
          <Avatar className="w-6 h-6 text-tiny" />
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