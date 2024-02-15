import React from 'react';

const HelloWorld = ({ name }) => {
  // if (name !== 'je') {
  //   return null;
  // }
  return (
    <div className=' bg-black'>
      <div>
        <h1>Hello, {name}!</h1>
      </div>
    </div>
  );
};


export default HelloWorld;
