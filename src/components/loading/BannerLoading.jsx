import React from "react";
import { Skeleton } from "@nextui-org/react";

const BannerLoading = ({query}) => {
  return (
    <Skeleton className="w-full rounded-2xl my-6">
      <div className=" h-80 w-3/5 rounded-lg bg-default-200"></div>
    </Skeleton>
  )
}

export default BannerLoading;