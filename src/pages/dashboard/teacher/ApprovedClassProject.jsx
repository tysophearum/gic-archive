import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Divider, } from "@nextui-org/react";
import { Link } from "react-router-dom";
import QUERIES from "../../../util/queries";
import { useQuery } from "@apollo/client";
import GridLoading2 from "../../../components/loading/GridLoading2";

const ApprovedClassProject = () => {
  const { data, loading, error } = useQuery(QUERIES.listTeacherClassProjectCategory);

  if (loading) return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <GridLoading2 />
    </div>
  );
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/teacherDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Manage Approved Project</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        <h1 className=" font-semibold text-2xl mb-4">Class project categories</h1>
        <Divider />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
          {data.listTeacherClassProjectCategory.map((category) => (
            <Link to={`/teacherDashboard/manageApprovedProject/${category.id}`} key={category.id}>
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

export default ApprovedClassProject;