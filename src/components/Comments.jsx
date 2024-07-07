import { Button, Textarea } from '@nextui-org/react';
import React, { useState, useEffect } from "react";
import fetchData from "../util/fetchData";
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon';
import { useMutation } from '@apollo/client';
import QUERIES from '../util/queries';
import ErrorAlert from './ErrorAlert';

const Comments = ({ id, type }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Introduce loading state
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();
  const endpoint = process.env.REACT_APP_GRAPHQL;
  const [createClassProjectComment] = useMutation(QUERIES.createClassProjectComment);
  const [createThesisComment] = useMutation(QUERIES.createThesisComment);
  const [comment, setComment] = useState('');
  // const {data: myData, loading: myLoading, error: myError} = useQuery(QUERIES.getMe)
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    getData();
  }, [page]);

  // if (myLoading) return <p>Loading...</p>;
  // if (myError) return <p>Error: {myError.message}</p>;
  async function getData() {
    try {
      let query = null;
      if (type === 'classProject') {
        query = QUERIES.listClassProjectComment
      }
      if (type === 'thesis') {
        query = QUERIES.listThesisComment
      }
      setLoading(true);
      const [responseData, error] = await fetchData(endpoint, query, {documentId: id, pager: {limit: 3, page: page}});
      if (error) {
        throw new Error(error.message);
      }
      const resArray = Object.entries(responseData);
      const [[_, res]] = resArray;
      setData([...data, ...res.comment]);
      setPagination(res.pagination)
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  }

  const handleClose = () => {
    setIsError(false);
  };
  const handleComment = async () => {
    if (comment === '') {
      return;
    }
    try {
      if (type === 'classProject') {
        const { data: resData } = await createClassProjectComment({ variables: { classProjectComment: {classProject: id, comment: comment} } });
        if (resData) {
          setComment('');
          // resData.createClassProjectComment.user.image = myData.getMe.image
          setData([resData.createClassProjectComment, ...data])
        }
      }
      else if (type === 'thesis') {
        const { data: resData } = await createThesisComment({ variables: { thesisComment: {thesis: id, comment: comment} } });
        if (resData) {
          setComment('');
          // resData.createClassProjectComment.user.image = myData.getMe.image
          setData([resData.createThesisComment, ...data])
        }
      }
    } catch (error) {
      const message = error.message === "Invalid token" ? "Please login to perform this action" : error.message
      setErrorMessage(message)
      setIsError(true)
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
  }
  return (
    <>
      <ErrorAlert open={isError} message={errorMessage} close={handleClose} />
      <h2 className=" text-xl font-semibold mb-2">Comments </h2>
      <div className="flex mb-2">
        {/* <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src={myData?.getMe?.image || null} /> */}
        <div className="relative w-full">
          <Textarea
            label="Comment"
            placeholder="Enter your comment"
            className="w-full"
            validate={'bordered'}
            color='primary' 
            value={comment}
            onValueChange={(value) => setComment(value)}/>
            <Button onClick={handleComment} className="absolute flex items-center bottom-0 right-0 m-2 px-2 py-1 bg-blue-500 text-white rounded">
              <PaperPlaneIcon /> 
              <span className='ml-2'>Post</span>
            </Button>
        </div>
      </div>
      <div>
        {data.map((userComment) => {
          return (
          <div className="flex my-3 bg-gray-50 rounded-lg p-2" key={userComment.id}>
            {/* <Avatar
              className="transition-transform mr-3"
              color="primary"
              name="Jason Hughes"
              size='md'
              src={`${userComment.user.image}`} /> */}
            <div className='w-full'>
              <span className='font-semibold'>{userComment.user.name}</span>
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