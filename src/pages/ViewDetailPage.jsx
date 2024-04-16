import React from 'react';
import ItemList from '../components/ItemList';
import ViewDetail from '../components/ViewDetail';
import Comments from '../components/Comments';

const ViewDetailPage = () => {
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <ViewDetail />
      <Comments />
      <ItemList numberOfElements={4} title={<h1 className='text-lg font-semibold'>Related papers</h1>} />
    </div>
  );
};

export default ViewDetailPage;
