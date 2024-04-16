import { Avatar, Button, Textarea, User } from '@nextui-org/react';

const Comments = () => {
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
        <div className="flex my-3 bg-gray-50 rounded-lg p-2">
          <Avatar
            className="transition-transform mr-3"
            color="primary"
            name="Jason Hughes"
            size='md'
            src="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-9.jpg" />
          <div className='w-full'>
            <span className='font-semibold'>Ty Sophearum</span>
            <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, sint voluptas enim accusamus expedita nam asperiores aspernatur quia mollitia maxime officiis maiores suscipit possimus sequi, minima consectetur corrupti deleniti voluptatibus?</p>
          </div>
        </div>
        <div className="flex my-3 bg-gray-50 rounded-lg p-2">
          <Avatar
            className="transition-transform mr-3"
            color="primary"
            name="Jason Hughes"
            size='md'
            src="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-9.jpg" />
          <div className='w-full'>
            <span className='font-semibold'>Ty Sophearum</span>
            <p className='text-sm'>Lorem ipsum dolor sit aoluptas enim accusamus expedita nam asperiores aspernataiores suscipit possimus sequi, minima consectetur corrupti deleniti voluptatibus?</p>
          </div>
        </div>
        <div className="flex my-3 bg-gray-50 rounded-lg p-2">
          <Avatar
            className="transition-transform mr-3"
            color="primary"
            name="Jason Hughes"
            size='md'
            src="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-9.jpg" />
          <div className='w-full'>
            <span className='font-semibold'>Ty Sophearum</span>
            <p className='text-sm'>Lorem ipsum dolor sit amet s?</p>
          </div>
        </div>
      </div>
      <Button className='w-full bg-primary-400 text-white'>More</Button>
    </>
  )
}

export default Comments;