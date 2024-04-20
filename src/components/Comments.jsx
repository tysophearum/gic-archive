import { Avatar, Button, Textarea, User } from '@nextui-org/react';
import React, { useState, useEffect } from "react";
import fetchData from "../util/fetchData";

const Comments = ({ query, id }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState()
  const endpoint = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [responseData, error] = await fetchData(endpoint, query, {documentId: id, pager: {limit: 3, page: page}});
        if (error) {
          throw new Error(error.message);
        }
        const resArray = Object.entries(responseData);
        const [[key, res]] = resArray;
        setData([...data, ...res.comment]);
        setPagination(res.pagination)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false); // Set loading state to false after fetching
      }
    }

    getData();
  }, [page]);

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }
  return (
    <>
      <h2 className=" text-xl font-semibold mb-2">Comments </h2>
      <div className="flex mb-2">
        <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-9.jpg" />
        <Textarea
          label="Comment"
          placeholder="Enter your comment"
          className="w-full"
          validate={'bordered'}
          color='primary' />
      </div>
      <div>
        {data.map((userComment) => {
          return (
          <div className="flex my-3 bg-gray-50 rounded-lg p-2">
            <Avatar
              className="transition-transform mr-3"
              color="primary"
              name="Jason Hughes"
              size='md'
              src="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-9.jpg" />
            <div className='w-full'>
              <span className='font-semibold'>{userComment.user.firstName}</span>
              <p className='text-sm'>{userComment.comment}</p>
            </div>
          </div>
          )
        })}
      </div>
      {pagination.hasNextPage ? <Button onClick={() => setPage(page+1)} className='w-full bg-primary-400 text-white'>More</Button> : <p></p>}
    </>
  )
}

export default Comments;