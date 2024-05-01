import { Breadcrumbs, BreadcrumbItem, Card, CardHeader, CardBody, CardFooter, Image, Divider, } from "@nextui-org/react";
import { Link } from "react-router-dom";
import QUERIES from "../../util/queries";
import { useQuery } from "@apollo/client";

const FeaturedProject = () => {
  const { data, loading, error } = useQuery(QUERIES.getMe);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
          <BreadcrumbItem>
            <Link to={'/teacherDashboard'}>
              {/* <svg xmlns="XXXXXXXXXXXXXXXXXXXXXXXXXX" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg> */}
              Dashboard
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Manage Featured Project</BreadcrumbItem>
        </Breadcrumbs>
      <div>
        <h1 className=" font-semibold text-2xl mb-4">Class project categories</h1>
        <Divider />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
          {data.getMe.classProjectCategory.map((category) => (
            <Link to={`/teacherDashboard/manageFeaturedProject/${category.id}`} key={category.id}>
              <Card className="p-4 border hover:border-blue-500">
                <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-green-500 to-emerald-500">
                  <h1 className="text-3xl font-bold">{category.name}</h1>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedProject;