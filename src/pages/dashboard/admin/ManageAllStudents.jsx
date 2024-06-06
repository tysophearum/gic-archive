import React from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import ManageStudentsTable from "../../../components/ManageStudentsTable";

const ManageAllStudents = () => {
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/adminDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          Manage Students
        </BreadcrumbItem>
      </Breadcrumbs>
      <ManageStudentsTable />
    </div>
  );
}

export default ManageAllStudents;