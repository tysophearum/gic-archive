import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function GridLoading() {
  const items = Array.from({ length: 6 }, (_, index) => index + 1);
  return (
    <div className="]">
      <Skeleton className="w-24 rounded-lg my-6">
        <div className="h-8 w-3/5 rounded-lg bg-default-200"></div>
      </Skeleton>
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2">
        {items.map((_number, i) => (
          <div key={i}>
            <Skeleton className="rounded-lg">
              <div className="h-56 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="my-2 flex">
              <Skeleton className="w-3 h-3 rounded-full">
                <div className="h-3 w-3/5 rounded-fiull bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-3/5 rounded-lg ml-2">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
