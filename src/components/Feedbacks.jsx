import { Avatar, Button, Textarea } from '@nextui-org/react';
import { useMutation, useQuery } from '@apollo/client';
import QUERIES from '../util/queries';
import { useState, useEffect } from 'react';
import { PaperPlaneIcon } from '../icons/PaperPlaneIcon';

const Feedbacks = ({id, type}) => {
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState('');
  const { data: response, loading, error, refetch } = useQuery(type === 'classProject' ? QUERIES.listClassProjectFeedback : QUERIES.listThesisFeedback, {
    variables: {
      documentId: id
    }
  });
  const [createClassProjectFeedback] = useMutation(QUERIES.createClassProjectFeedback);
  const [createThesisFeedback] = useMutation(QUERIES.createThesisFeedback);
  const {data: myData, loading: myLoading, error: myError} = useQuery(QUERIES.getMe)

  useEffect(() => {
    if (response) {
      const resArray = Object.entries(response);
      const [[_, res]] = resArray;
      setData(res.feedbacks);
    }
  }, [response])

  if (myLoading) return <p>Loading...</p>
  if (myError) return <p>Error: {myError.message}</p>
  const handleCreateFeedback = async () => {
    if (feedback === '') {
      return;
    }
    try {
      if (type === 'classProject') {
        const { data: resData } = await createClassProjectFeedback({ variables: { classProjectFeedback: {classProject: id, feedback: feedback} } });
        if (resData) {
          setFeedback('');
          refetch()
        }
      }
      else if (type === 'thesis') {
        const { data: resData } = await createThesisFeedback({ variables: { thesisFeedback: {thesis: id, feedback: feedback} } });
        if (resData) {
          setFeedback('');
          refetch()
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  return (
    <>
      <div className='flex justify-between'>
        <h2 className=" text-xl font-semibold mb-2">Feedbacks</h2>
        <button onClick={() => refetch()}>Refresh</button>
      </div>
      <div>
        {data && data.map(feedback => (
          <div className={`flex my-3 rounded-lg p-2 ${feedback.user.id === myData.getMe.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Avatar
              className="transition-transform mr-3"
              color="primary"
              name="Jason Hughes"
              size='md'
              src={feedback.user.image} />
            <div className='w-full'>
              <span className='font-semibold'>{feedback.user.name}</span>
              <p className='text-sm'>{feedback.feedback}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mb-2">
        <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src={myData?.getMe?.image || null} />
        <div className="relative w-full">
          <Textarea
            label="Feedback"
            placeholder="Enter your feedback"
            className="w-full"
            validate={'bordered'}
            color='primary' 
            value={feedback}
            onValueChange={(value) => setFeedback(value)}
          />
            <Button onClick={handleCreateFeedback} className="absolute flex items-center bottom-0 right-0 m-2 px-2 py-1 bg-blue-500 text-white rounded">
              <PaperPlaneIcon /> 
              <span>Send</span>
            </Button>
        </div>
      </div>
    </>
  )
}

export default Feedbacks;