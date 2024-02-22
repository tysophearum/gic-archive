import React, { useState, useRef, useEffect } from 'react';
import { Avatar, Button } from '@nextui-org/react';
import { PaperIcon } from '../icons/PaperIcon';
import { GithubIcon } from '../icons/GithubIcon';
import ItemList from '../components/ItemList';

const ViewDetail = () => {
  const maxLines = 7;
  const text = `Breakfast agreeable incommode departure it an. By ignorant at on wondered relation. Enough at tastes really so cousin am of. Extensive therefore supported by extremity of contented. Is pursuit compact demesne invited elderly be. View him she roof tell her case has sigh. Moreover is possible he admitted sociable concerns. By in cold no less been sent hard hill.

  Advanced extended doubtful he he blessing together. Introduced far law gay considered frequently entreaties difficulty. Eat him four are rich nor calm. By an packages rejoiced exercise. To ought on am marry rooms doubt music. Mention entered an through company as. Up arrived no painful between. It declared is prospect an insisted pleasure.

  Open know age use whom him than lady was. On lasted uneasy exeter my itself effect spirit. At design he vanity at cousin longer looked ye. Design praise me father an favour. As greatly replied it windows of an minuter behaved passage. Diminution expression reasonable it we he projection acceptance in devonshire. Perpetual it described at he applauded.

  In entirely be to at settling felicity. Fruit two match men you seven share. Needed as or is enough points. Miles at smart ﻿no marry whole linen mr. Income joy nor can wisdom summer. Extremely depending he gentleman improving intention rapturous as.

  Parish so enable innate in formed missed. Hand two was eat busy fail. Stand smart grave would in so. Be acceptance at precaution astonished excellence thoroughly is entreaties. Who decisively attachment has dispatched. Fruit defer in party me built under first. Forbade him but savings sending ham general. So play do in near park that pain.

  Lose john poor same it case do year we. Full how way even the sigh. Extremely nor furniture fat questions now provision incommode preserved. Our side fail find like now. Discovered travelling for insensible partiality unpleasing impossible she. Sudden up my excuse to suffer ladies though or. Bachelor possible marianne directly confined relation as on he.

  And produce say the ten moments parties. Simple innate summer fat appear basket his desire joy. Outward clothes promise at gravity do excited. Sufficient particular impossible by reasonable oh expression is. Yet preference connection unpleasant yet melancholy but end appearance. And excellence partiality estimating terminated day everything.

  Delightful unreserved impossible few estimating men favourable see entreaties. She propriety immediate was improving. He or entrance humoured likewise moderate. Much nor game son say feel. Fat make met can must form into gate. Me we offending prevailed discovery.

  Real sold my in call. Invitation on an advantages collecting. But event old above shy bed noisy. Had sister see wooded favour income has. Stuff rapid since do as hence. Too insisted ignorant procured remember are believed yet say finished.

  Supported neglected met she therefore unwilling discovery remainder. Way sentiments two indulgence uncommonly own. Diminution to frequently sentiments he connection continuing indulgence. An my exquisite conveying up defective. Shameless see the tolerably how continued. She enable men twenty elinor points appear. Whose merry ten yet was men seven ought balls.`

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
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <h1 className=" text-4xl font-semibold mt-6">
        Some research paper that talk about lorem
      </h1>
      <span className=" text-sm text-primary-700 mt-3">
        Publish in 12 Mar 2024 by <b>Someone Important</b>
      </span>
      <div className="mt-7 text-zinc-700">
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
      <h2 className=" text-xl font-semibold mt-8 mb-2">Resource </h2>
      <div className="flex">
        <Button radius='sm' className='bg-primary-500 text-white my-0.5 w-32 mr-2' startContent={<PaperIcon height={20} width={20} />}>Paper</Button>
        <Button radius='sm' className='bg-black text-white ml-2 w-32' startContent={<GithubIcon height={20} width={20} />}>Code</Button>
      </div>
      <h2 className=" text-xl font-semibold mt-10 mb-2">Posted by </h2>
      <div className="flex items-center">
        <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src="https://i.pinimg.com/736x/32/7e/db/327edb9a15b304efc264668ada03f725.jpg"
        />
        <div>
          <p className='text-lg font-semibold'>Someone Important</p>
          <p className='text-sm text-zinc-500'>Institute of Technology of Cambodia</p>
        </div>
      </div>
      <h2 className=" text-xl font-semibold mt-10 mb-2">Collaborated by </h2>
      <div className="flex items-center mb-2">
        <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src="https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-9.jpg"
        />
        <div>
          <p className='text-lg font-semibold'>Someone Person</p>
          <p className='text-sm text-zinc-500'>Institute of Technology of Cambodia</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar
          className="transition-transform h-14 w-14 mr-3"
          color="primary"
          name="Jason Hughes"
          src="https://i.pinimg.com/236x/8b/53/84/8b5384af3c5ed9b06c2aac6917b32b4c.jpg"
        />
        <div>
          <p className='text-lg font-semibold'>Another Important</p>
          <p className='text-sm text-zinc-500'>Institute of Technology of Cambodia</p>
        </div>
      </div>
      <h2 className=" text-xl font-semibold mt-10 mb-2">Citation </h2>
      <p className="text-zinc-700 mb-10">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas, in. Sapiente, sed perspiciatis, neque quam quisquam animi nisi soluta sunt dolor, ea esse consectetur. Sunt aliquam harum iste expedita quo?</p>
      <ItemList numberOfElements={4} title="Related papers"/>
    </div>
  );
};

export default ViewDetail;
