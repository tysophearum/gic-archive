import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import ItemCard from './components/ItemCard';
import Header from './components/Header';

function App() {

  return (
    <NextUIProvider>
      <Header />
      <div className='p-3 grid grid-cols-1 place-items-center w-[100vw]'>
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
