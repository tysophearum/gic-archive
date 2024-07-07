import React, { useEffect, useState } from "react";
import {
  ModalHeader,
  ModalBody,
  Input,
  Kbd,
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { useQuery } from "@apollo/client";
import QUERIES from "../util/queries";
import { Link } from "react-router-dom";

const SearchModal = ({onClose}) => {
  const [searchInput, setSearchInput] = useState('')
  const thesis = useQuery(QUERIES.searchThesis, {
    variables: {
      title: searchInput,
      pager: {
        limit: 3,
        page: 1
      }
    }
  });
  const classProject = useQuery(QUERIES.searchClassProject, {
    variables: {
      title: searchInput,
      pager: {
        limit: 3,
        page: 1
      }
    }
  });

  useEffect(() => {
    if (searchInput.length > 3) {
      thesis.refetch(
        {
          title: searchInput,
          pager: {
            limit: 2,
            page: 1
          }
        })
    }
  }, [searchInput])

  if (thesis.error) {
    return <p>Error: {thesis.error.message}</p>; // Render error state
  }
  if (classProject.error) {
    return <p>Error: {classProject.error.message}</p>; // Render error state
  }
  return (
    <>
      <ModalHeader>
        <Input
          value={searchInput}
          onValueChange={(val) => setSearchInput(val)}
          autoFocus
          radius="lg"
          className=" focus:outline-none"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              "focus:ring-0",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focus=true]:bg-default-200/50",
              "dark:group-data-[focus=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          endContent={<Kbd >esc</Kbd>}
        />
      </ModalHeader>
      <ModalBody className="pb-6">
        {!thesis.loading && !classProject.loading ? (
          (classProject.data.searchClassProject.data.length === 0 && thesis.data.searchThesis.data.length === 0) && (
            <div className="flex flex-col items-center">
              <img className="w-[100px] opacity-50" src='https://media.tenor.com/zLE8iO4GSAcAAAAi/ghost-photographer.gif' alt="loading..." />
              <p className="mb-12 text-center text-xl text-gray-600">No results found.</p>
            </div>
          )
        ) : (
          <p className="my-12 text-center">Loading...</p>
        )}
        {!thesis.loading && (
          thesis.data.searchThesis?.data.length === 0 ? null : (
            thesis.data.searchThesis.data.map((item, index) => (
              <Link to={'/thesis/'+item.id} onClick={() => {onClose()}}>
                <div className="p-1 bg-white h-24 rounded-xl shadow-md flex items-center duration-150 hover:bg-blue-500 hover:text-white">
                  <img 
                    alt="image"
                    className="h-full w-24 object-cover rounded-lg"
                    src={item.image || 'https://cdn.dribbble.com/users/6944734/screenshots/17665290/media/97649adc40b4df0b29b59d57f7657b2c.png'}
                  />
                  <div className="ml-4 mb-4">
                    <h1 className="font-semibold mt-2">{item.title}</h1>
                    <p style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Change 3 to the desired number of lines
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }} className="text-small pt-1 tracking-wide text-foreground/80">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))
          )
        )}
        {!classProject.loading && (
          classProject.data.searchClassProject?.data.length === 0 ? null : (
            classProject.data.searchClassProject.data.map((item, index) => (
              <Link to={'/classProject/'+item.id} onClick={() => {onClose()}}>
                <div className="p-1 bg-white h-24 rounded-xl shadow-md flex items-center duration-150 hover:bg-blue-500 hover:text-white">
                  <img
                    className="h-full w-24 object-cover rounded-lg"
                    src={item.image || 'https://cdn.dribbble.com/users/6944734/screenshots/17665290/media/97649adc40b4df0b29b59d57f7657b2c.png'}
                  />
                  <div className="ml-4 mb-4">
                    <h1 className="font-semibold mt-2">{item.title}</h1>
                    <p style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Change 3 to the desired number of lines
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }} className="text-small pt-1 tracking-wide text-foreground/80">{item.description}</p>
                  </div>
                </div>
              </Link>
            ))
          )
        )}
      </ModalBody>

    </>
  )
}

export default SearchModal;