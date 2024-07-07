import React from 'react';
import ViewDetail from '../components/ViewDetail';
import Comments from '../components/Comments';
import { useParams } from 'react-router-dom';
import QUERIES from '../util/queries';

const ThesisViewDetailPage = () => {
  const param = useParams()

  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <ViewDetail query={QUERIES.getThesisById} variables={{thesisId: param.thesisId}} />
      <Comments id={param.thesisId} type={'thesis'}/>
      {/* <ItemList numberOfElements={4} title={<h1 className='text-lg font-semibold'>Related papers</h1>} /> */}
    </div>
  );
};

export default ThesisViewDetailPage;
