import React, { useState, useRef, useEffect } from 'react';

const ViewTextArea = ({text, maxLines}) => {
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef(null);
  const [isOverflown, setIsOverflown] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
      const maxHeight = lineHeight * maxLines;
      setIsOverflown(element.scrollHeight > maxHeight);
    }
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="mt-7 text-zinc-500">
      <p ref={textRef} style={{
        overflow: expanded ? 'visible' : 'hidden',
        textOverflow: expanded ? 'inherit' : 'ellipsis',
        display: expanded ? 'block' : '-webkit-box',
        WebkitLineClamp: expanded ? 'unset' : maxLines,
        WebkitBoxOrient: 'vertical'
      }}>
        {text}
      </p>
      {isOverflown && (
        <button className=' font-semibold' onClick={toggleExpanded}>
          {expanded ? 'See less' : 'See more'}
        </button>
      )}
    </div>
  )
}

export default ViewTextArea;