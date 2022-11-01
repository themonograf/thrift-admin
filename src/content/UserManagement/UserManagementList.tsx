import FtzTable from "@/components/Table";
import { ITableHead } from "@/components/Table/table_model";
import { Card } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "redux/features/user-management/userManagementApiSlice";
type ParamsType = {
  page: any;
  limit: any;
};
function UserManagementList() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
  } as ParamsType);

  const { data, isLoading: isLoadingData } = useGetUsersQuery(
    new URLSearchParams({
      page: params.page > 1 ? params.page * params.limit - params.limit : 0,
      limit: params.limit,
    } as ParamsType).toString()
  );

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const head: ITableHead[] = [
    {
      key: "name",
      header: "Full Name",
      align: "left",
      renderer: () => undefined,
    },
    {
      key: "username",
      header: "Username",
      align: "left",
      renderer: () => undefined,
    },
  ];

  const onRemove = async (record) => {
    await deleteUser(record.id)
      .unwrap()
      .then(({ data }) =>
        enqueueSnackbar(data?.message || "Successfully removed data", {
          variant: "success",
        })
      )
      .catch(({ data }) =>
        enqueueSnackbar(data?.message, { variant: "error" })
      );
  };

  return (
    <Card>
      <FtzTable
        loading={isLoadingData || isLoadingDelete}
        limit={params.limit}
        page={params.page - 1}
        tableData={data?.data?.data || []}
        tableHeader={head}
        totalData={data?.data?.total || 0}
        editable
        onPageChange={(page) =>
          setParams((prevState) => ({ ...prevState, page: page + 1 }))
        }
        onLimitChange={(limit) =>
          setParams((prevState) => ({ ...prevState, limit }))
        }
        onEdit={(record) => router.push(`/user-management/${record.username}`)}
        onRemove={(record) => onRemove(record)}
      />
    </Card>
  );
}

export default UserManagementList;
