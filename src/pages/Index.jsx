import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Index;
