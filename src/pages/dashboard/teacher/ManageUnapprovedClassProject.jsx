import React from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import QUERIES from "../../../util/queries";
import { useQuery } from "@apollo/client";
import ManageUnapprovedClassProjectTable from "../../../components/ManageUnapprovedClassProjectTable";

const ManageUnapprovedClassProject = () => {
  const param = useParams();
  const classProjectCategoryResponse = useQuery(QUERIES.getClassProjectCategoryById, {
    variables: {
      categoryId: param.classProjectCategoryId,
    },
  })

  if (classProjectCategoryResponse.error) {
    return <p>Error: {classProjectCategoryResponse.error.message}</p>; // Render error state
  }
  return (
    <div className="p-3 grid grid-cols-1 w-[100vw] px-[10vw] gap-8">
      <Breadcrumbs size='lg' className="mt-2">
        <BreadcrumbItem>
          <Link to={'/teacherDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={'/teacherDashboard/manageUnapprovedProject'}>
            Manage Unapproved Project
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {classProjectCategoryResponse.data?.getClassProjectCategoryById?.name}
        </BreadcrumbItem>
      </Breadcrumbs>
      <ManageUnapprovedClassProjectTable classProjectCategoryId={param.classProjectCategoryId} />
    </div>
  );
}

export default ManageUnapprovedClassProject;