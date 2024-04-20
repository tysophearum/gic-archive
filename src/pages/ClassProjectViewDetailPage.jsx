import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import ViewDetail from '../components/ViewDetail';
import Comments from '../components/Comments';
import { useParams } from 'react-router-dom';
import QUERIES from '../util/queries';

const ClassProjectViewDetailPage = () => {
  const param = useParams()

  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <ViewDetail query={QUERIES.getClassProjectById} variable={{classProjectId: param.classProjectId}} />
      <Comments query={QUERIES.listClassProjectComment} id={param.classProjectId}/>
      <ItemList numberOfElements={4} title={<h1 className='text-lg font-semibold'>Related papers</h1>} />
    </div>
  );
};

export default ClassProjectViewDetailPage;
