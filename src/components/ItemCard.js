import {Card, CardBody, Image, Button} from '@nextui-org/react'
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import { DotIcon } from '../icons/DotIcon';

const ItemCard = (props) => {
    return (
        <Card className='xl:w-[1100px] lg:w-[950px] md:w-[780px] sm:w-[80%] w-[80%]'>
            <CardBody className=' grid md:grid-cols-[17%,57%,17%] gap-7 place-items-start p-4 sm:grid-cols-1s'>
                <img className='rounded object-cover md:w-56 w-full h-44' src='https://production-media.paperswithcode.com/thumbnails/papergithubrepo/c43885ec-1a26-4192-8794-5c2dcbf36cbd.jpg'/>
                <div className='h-full'>
                    <h5 className=' text-xl font-medium text-gray-900'>Title lorem gwe</h5>
                    <div className='flex items-center text-sm text-gray-600 my-2'>
                        <GithubIcon />
                        <a href='#' className='ml-2 hover:underline'>testing/something</a>
                        <DotIcon />
                        <text>9 Feb 2024</text>
                    </div>
                    <p className='text-sm text-gray-600'>wergwergwerg</p>
                </div>
                <div className=' w-full flex flex-col items-center'>
                    <Button radius='sm' className=' bg-cyan-700 text-white my-1 w-32' startContent={<PaperIcon height={20} width={20}/>}>Paper</Button>
                    <Button radius='sm' className=' bg-black text-white my-1 w-32' startContent={<GithubIcon height={20} width={20}/>}>Code</Button>
                </div>
            </CardBody>
        </Card>
    )
}

export default ItemCard;