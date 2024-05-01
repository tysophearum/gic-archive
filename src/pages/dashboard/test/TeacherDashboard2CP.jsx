import { Breadcrumbs, BreadcrumbItem, Card, CardHeader, CardBody, CardFooter, Image, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";

const TeacherDashboard2CP = () => {
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/teacherDashboard2'}>Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Class project</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        <h1 className=" font-semibold text-2xl mb-4">Class project</h1>
        <Divider />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 border hover:border-blue-500">
            <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-green-500 to-emerald-500">
              <h1 className="text-3xl font-bold">Class project</h1>
            </CardBody>
            <CardFooter className="pb-0 pt-2 flex-col items-start">
              <h4 className="font-bold text-large">Approved</h4>
            </CardFooter>
          </Card>
          <Card className="p-4 border hover:border-blue-500">
            <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-green-500 to-emerald-500">
              <h1 className="text-3xl font-bold">Class project</h1>
            </CardBody>
            <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">Unapproved</h4>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard2CP;