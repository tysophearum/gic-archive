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
  const {data, loading, error} = useQuery(QUERIES.getClassProjectCategoryById, {
    variables: {
      categoryId: param.classProjectCategoryId,
    },
  })

  if (loading) {
    return <p>Loading...</p>; // Render loading state
  }
  if (error) {
    return <p>Error: {error.message}</p>; // Render error state
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
          <Link to={'/adminDashboard/manageUnapprovedProject'}>
            Manage Unapproved Project
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {data?.getClassProjectCategoryById?.name}
        </BreadcrumbItem>
      </Breadcrumbs>
      <ManageUnapprovedClassProjectTable classProjectCategoryId={param.classProjectCategoryId} />
    </div>
  );
}

export default ManageUnapprovedClassProject;