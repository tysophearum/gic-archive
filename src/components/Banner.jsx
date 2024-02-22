import React from 'react';
import { Card, CardFooter, Image, CardHeader, Button, Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";

const Banner = () => {
    return (
        <div className="my-4">
          <Card isFooterBlurred className="w-full h-[350px] col-span-12 sm:col-span-7">
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">Welcome to</p>
              <h4 className="text-white/90 font-medium text-xl">GIC Archive</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full min-h-[350px] object-cover"
              src="https://www.creativefabrica.com/wp-content/uploads/2021/08/16/flat-landscape-the-mountains-color-blue-Graphics-15913422-1.jpg" />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  alt="Breathing app icon"
                  className="rounded-full w-10 h-11 bg-black"
                  src="/images/breathing-app-icon.jpeg" />
                <Input
                  classNames={{
                    base: "max-w-full mr-8 h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<SearchIcon size={18} />}
                  type="search"
                />
              </div>
              <Button radius="full" size="sm">Search</Button>
            </CardFooter>
          </Card>
        </div>
    )
}

export default Banner;