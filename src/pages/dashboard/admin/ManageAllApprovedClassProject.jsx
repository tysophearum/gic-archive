import React from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { Link, useParams } from "react-router-dom";
import QUERIES from "../../../util/queries";
import { useQuery } from "@apollo/client";
import ManageApprovedClassProjectTable from "../../../components/ManageApprovedClassProjectTable";

const ManageAllApprovedClassProject = () => {
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
          <Link to={'/adminDashboard'}>
            Dashboard
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={'/adminDashboard/manageApprovedProject'}>
            Manage Approved Project
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {classProjectCategoryResponse.data?.getClassProjectCategoryById?.name}
        </BreadcrumbItem>
      </Breadcrumbs>
      <ManageApprovedClassProjectTable classProjectCategoryId={param.classProjectCategoryId} />
    </div>
  );
}

export default ManageAllApprovedClassProject;