import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function GridLoading2() {
  const items = Array.from({ length: 4 }, (_, index) => index + 1);
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
      {items.map((_number, i) => (
        <div key={i}>
          <Skeleton className="rounded-lg">
            <div className=" h-36 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      ))}
    </div>
  );
}
