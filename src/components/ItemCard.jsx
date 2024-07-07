import React from 'react';
import { Card, CardBody, Button, Image, Avatar } from '@nextui-org/react';
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { DotIcon } from '../icons/DotIcon';
import { StarIcon } from '../icons/StarIcon';
import { Link } from 'react-router-dom'
import unixToTime from '../util/unixToTime';

const ItemCard = ({ document }) => {
  // // Initialize state for the liked status
  // const [liked, setLiked] = useState(false);

  // // Function to handle button click
  // const handleLikeClick = () => {
  //     // Toggle the liked state
  //     setLiked(!liked);
  // };

  return (
    <Link 
      to={document.__typename.toLowerCase().includes('thesis') ? `/thesis/${document.id}` : document.__typename.toLowerCase().includes('classproject') ? `/classProject/${document.id}`: ''} 
      className='rounded-xl mb-4 duration-150 hover:shadow-gray-100 hover:shadow-xl w-full'>
      <Card shadow='sm'>
        <CardBody className='grid md:grid-cols-[17%,57%,17%] gap-7 place-items-start p-4 sm:grid-cols-1s'>
          <Image isZoomed className='rounded object-cover md:w-56 w-full h-44' alt='#' src={document.image || 'https://cdn.dribbble.com/users/6944734/screenshots/17665290/media/97649adc40b4df0b29b59d57f7657b2c.png'} />
          <div className='h-full'>
            <h5 className='text-xl font-medium text-gray-900'>{document.title}</h5>
            <div className='flex items-center text-sm text-gray-600 my-2'>
              <Avatar className="w-6 h-6 text-tiny" />
              <Link to={'/profile/' + document.user.id} className='ml-2 hover:underline'>{document.user.name}</Link>
              <DotIcon />
              <span>{unixToTime(document.createdAt)}</span>
            </div>
            <p style={{
              display: '-webkit-box',
              WebkitLineClamp: 3, // Change 3 to the desired number of lines
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }} className='text-sm text-gray-600'>{document.description}</p>
          </div>
          <div className='w-full flex flex-col items-center'>
            <Button
              radius='sm'
              className={`text-white ${document.liked ? 'bg-yellow-500 text-white' : 'text-yellow-600'} mb-3`}
              variant='bordered'
              startContent={<StarIcon height={20} width={20} />}
            >
              {document.likeAmount}
            </Button>
            <Button radius='sm' className='bg-cyan-600 text-white my-0.5 w-32' startContent={<PaperIcon height={20} width={20} />}>Paper</Button>
            <Button radius='sm' className='bg-black text-white my-0.5 w-32' startContent={<GithubIcon height={20} width={20} />}>Code</Button>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}

export default ItemCard;
