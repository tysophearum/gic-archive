import './App.css';
import { NextUIProvider, Button } from '@nextui-org/react';
import ItemCard from './components/ItemCard';
import Header from './components/Header';
import { TrendingIcon } from './icons/TrendingIcon';
import { StarIcon } from './icons/StarIcon';
import ItemList from './components/ItemList';

function App() {

  return (
    <NextUIProvider>
      <Header />
      <div className='p-3 grid grid-cols-1 place-items-center w-[100vw]'>
        <div className='mt-3 flex justify-start w-[75vw]'>
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
      </div>
      <ItemList />
    </NextUIProvider>
  );
}

export default App;
