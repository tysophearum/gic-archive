import React, { useState, useEffect } from 'react';

const Test = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
      } else if (event.key === 'ArrowDown') {
        setSelectedIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [items.length]);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ backgroundColor: index === selectedIndex ? 'lightgray' : 'white' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
