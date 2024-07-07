import { Breadcrumbs, BreadcrumbItem, Card, CardBody, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
        </Breadcrumbs>
      <div>
        <h1 className=" font-semibold text-2xl mb-4">Class project</h1>
        <Divider />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
          <Link to={'/teacherDashboard/manageApprovedProject'}>
            <Card className="p-4 border hover:border-blue-500">
              <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-green-500 to-emerald-500">
                <h1 className="text-3xl font-bold">Approved</h1>
              </CardBody>
            </Card>
          </Link>
          <Link to={'/teacherDashboard/manageUnapprovedProject'}>
            <Card className="p-4 border hover:border-blue-500">
              <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-green-500 to-emerald-500">
                <h1 className="text-3xl font-bold">Unpproved</h1>
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>

      <div>
        <h1 className=" font-semibold text-2xl mb-4">Thesis</h1>
        <Divider />
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
          <Link to={'/teacherDashboard/manageApprovedThesis'}>
            <Card className="p-4 border hover:border-blue-500">
              <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-yellow-500 to-amber-600">
                <h1 className="text-3xl font-bold">Approved</h1>
              </CardBody>
            </Card>
          </Link>
          <Link to={'/teacherDashboard/manageUnapprovedThesis'}>
            <Card className="p-4 border hover:border-blue-500">
              <CardBody className="overflow-visible py-2 h-32 grid place-items-center border text-white rounded-md bg-gradient-to-br from-yellow-500 to-amber-600">
                <h1 className="text-3xl font-bold">Unapproved</h1>
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard;