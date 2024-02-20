import { Button } from "@nextui-org/react";
import { StarIcon } from "../icons/StarIcon";
import { TrendingIcon } from "../icons/TrendingIcon";
import Banner from "../components/Banner";
import ItemList from "../components/ItemList";

const HomePage = () => {
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw]">
      <div className="mt-3 flex justify-start">
        <Button
          className="mx-1"
          radius="full"
          color="primary"
          variant="bordered"
          startContent={<TrendingIcon />}
        >
          Trending
        </Button>
        <Button className="mx-1" radius="full" color="primary" variant="faded">
          New
        </Button>
        <Button
          className="mx-1"
          radius="full"
          color="primary"
          variant="faded"
          startContent={<StarIcon />}
        >
          Most liked
        </Button>
      </div>
      <Banner />
      <ItemList />
    </div>
  );
};

export default HomePage;
