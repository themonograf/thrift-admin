import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import UserManagementHeader from "@/content/UserManagement/UserManagementHeader";
import UserManagementForm from "@/content/UserManagement/UserManagementForm";
import { useRouter } from "next/router";
import { Grid, Container } from "@mui/material";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "redux/features/user-management/userManagementApiSlice";
import { useEffect, useState } from "react";
import { UserFormProps } from "@/content/UserManagement/models/user_list";
import { useSnackbar } from "notistack";

function UserManagementUpdate() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { username } = router.query;
  const { data } = useGetUserQuery(username as string);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [form, setForm] = useState({
    id: 0,
    name: "",
    username: "",
    password: "",
  } as UserFormProps);

  const onSubmit = async () => {
    await updateUser(form)
      .unwrap()
      .then(() => router.replace("/user-management"))
      .catch(({ data }) =>
        enqueueSnackbar(data?.message, { variant: "error" })
      );
  };

  useEffect(() => {
    if (data?.success) {
      const serverData = data.data;
      setForm((prevState) => ({
        ...prevState,
        id: serverData.id,
        name: serverData.name,
        username: serverData.username,
      }));
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Update User</title>
      </Head>
      <PageTitleWrapper>
        <UserManagementHeader
          type="form"
          title={`Update - ${username}`}
          onSubmit={onSubmit}
          buttonLoading={isLoading}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <UserManagementForm form={form} setForm={setForm} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

UserManagementUpdate.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default UserManagementUpdate;
