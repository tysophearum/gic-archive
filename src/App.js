import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import ItemCard from './components/ItemCard';

function App() {
  const names = ["je", "jane"]

  return (
    <NextUIProvider>
      <div className='p-3 grid grid-cols-1 place-items-center w-[100vw]'>
        <ItemCard />
        <div className='h-2'></div>
        <ItemCard />
        <div className='h-2'></div>
        <ItemCard />
        <div className='h-2'></div>
      </div>
    </NextUIProvider>
  );
}

export default App;
