import './App.css';
import { NextUIProvider, Button } from '@nextui-org/react';
import ItemCard from './components/ItemCard';
import Header from './components/Header';
import { TrendingIcon } from './icons/TrendingIcon';
import { StarIcon } from './icons/StarIcon';

function App() {

  return (
    <NextUIProvider>
      <Header />
      <div className='p-3 grid grid-cols-1 place-items-center w-[100vw]'>
        <div className='my-5 flex justify-start xl:w-[1100px] lg:w-[950px] md:w-[720px] sm:w-[80%] w-[80vw]'>
          <Button className='mx-1' radius='full' color="primary" variant="bordered" startContent={<TrendingIcon />}>
            Trending
          </Button> 
          <Button className='mx-1' radius='full' color="primary" variant="faded">
            New
          </Button> 
          <Button className='mx-1' radius='full' color="primary" variant="faded" startContent={<StarIcon />}>
            Most liked
          </Button> 
        </div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
        <ItemCard />
        <div className='h-8'></div>
      </div>
    </NextUIProvider>
  );
}

export default App;
