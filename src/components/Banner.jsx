import React, { useState, useEffect } from 'react';
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import BannerLoading from './loading/BannerLoading';

const Banner = ({query}) => {
  const { loading, error, data: response } = useQuery(query);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (typeof response !== 'undefined') {
      const resArray = Object.entries(response);
      const [[_, res]] = resArray;
      setData(res);
    }
  }, [loading]);

if (loading) {
    return <BannerLoading />;
  }
  if (error) return (
    <><p>Error: {error.message}</p></>
  );
  return (
    <Carousel infiniteLoop autoPlay showStatus={false} showThumbs={false}>
      {data.map((item, index) => (
        <Link to={item.__typename.toLowerCase().includes('thesis') ? `/thesis/${item.id}` : item.__typename.toLowerCase().includes('classproject') ? `/classProject/${item.id}`: ''} key={index}>
          <div key={index} className="my-4">
            <Card isFooterBlurred className="w-full h-[350px] col-span-12 sm:col-span-7">
              <Image
                removeWrapper
                alt="Relaxing app background"
                className="z-0 w-full min-h-[350px] object-cover"
                src={item.image || "https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg"} />
              <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-col flex-grow gap-2 items-start text-start text-white">
                  <p className="text-tiny text-white/60 uppercase font-bold">{item.user.name}</p>
                  <h4 className="text-white/90 font-medium text-2xl">{item.title}</h4>
                </div>
                <Button radius="full" size="sm">View</Button>
              </CardFooter>
            </Card>
          </div>
        </Link>
      ))}
    </Carousel>
  )
}

export default Banner;