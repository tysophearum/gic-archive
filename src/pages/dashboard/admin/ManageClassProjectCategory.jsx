import { Divider, Breadcrumbs, BreadcrumbItem, Table, TableHeader, TableBody, TableRow, TableColumn, TableCell, Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { EditIcon } from "../../../icons/EditIcon";
import { DeleteIcon } from "../../../icons/DeleteIcon";
import { useQuery } from "@apollo/client";
import QUERIES from "../../../util/queries";

const ManageClassProjectCategory = () => {
  const { data, error, loading } = useQuery(QUERIES.listClassProjectCategory);

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
        <BreadcrumbItem>Manage Project Category</BreadcrumbItem>
      </Breadcrumbs>
      <div>
        <h1 className=" font-semibold text-2xl mb-4">Manage Project Category</h1>
        <Divider />
        <Table className=" mt-4" aria-label="Example table with dynamic content">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Description</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {data.listClassProjectCategory.map((category) => {
              return (
                <TableRow>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip color="primary" content="Edit">
                        <span className="text-lg cursor-pointer active:opacity-50 text-primary">
                          <EditIcon height={18} width={18} />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ManageClassProjectCategory;