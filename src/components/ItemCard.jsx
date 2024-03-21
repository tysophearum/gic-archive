import React, { useState } from 'react';
import { Card, CardBody, Button, Image } from '@nextui-org/react';
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { DotIcon } from '../icons/DotIcon';
import { StarIcon } from '../icons/StarIcon';
import { Link } from 'react-router-dom'

const ItemCard = () => {
    // Initialize state for the liked status
    const [liked, setLiked] = useState(false);

    // Function to handle button click
    const handleLikeClick = () => {
        // Toggle the liked state
        setLiked(!liked);
    };

    return (
        <Link to="/detail" className='rounded-xl mb-4 duration-150 hover:shadow-gray-100 hover:shadow-xl w-full'>
            <Card shadow='sm'>
                <CardBody className='grid md:grid-cols-[17%,57%,17%] gap-7 place-items-start p-4 sm:grid-cols-1s'>
                    <Image isZoomed className='rounded object-cover md:w-56 w-full h-44' alt='#' src='https://img.freepik.com/premium-photo/3d-art-with-abstract-glass-3d-sphere-with-small-balls-particles-inside_170454-33.jpg'/>
                    <div className='h-full'>
                        <h5 className='text-xl font-medium text-gray-900'>Title lorem gwe</h5>
                        <div className='flex items-center text-sm text-gray-600 my-2'>
                            <GithubIcon />
                            <a href='www.example.com' className='ml-2 hover:underline'>testing/something</a>
                            <DotIcon />
                            <span>9 Feb 2024</span>
                        </div>
                        <p className='text-sm text-gray-600'>wergwergwerg</p>
                    </div>
                    <div className='w-full flex flex-col items-center'>
                        <Button
                            radius='sm'
                            className={`text-white ${liked ? 'bg-yellow-600 text-white' : 'text-yellow-600'} mb-3`}
                            variant='bordered'
                            startContent={<StarIcon height={20} width={20}/>}
                            onClick={handleLikeClick}
                        >
                            231
                        </Button>
                        <Button radius='sm' className='bg-cyan-600 text-white my-0.5 w-32' startContent={<PaperIcon height={20} width={20}/>}>Paper</Button>
                        <Button radius='sm' className='bg-black text-white my-0.5 w-32' startContent={<GithubIcon height={20} width={20}/>}>Code</Button>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}

export default ItemCard;
