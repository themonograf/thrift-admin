import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import UserManagementHeader from "@/content/UserManagement/UserManagementHeader";
import UserManagementForm from "@/content/UserManagement/UserManagementForm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Grid, Container } from "@mui/material";
import { useCreateUserMutation } from "redux/features/user-management/userManagementApiSlice";
import { useState } from "react";
import { UserFormProps } from "@/content/UserManagement/models/user_list";

function UserManagementUpdate() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  } as UserFormProps);

  const onSubmit = async () => {
    await createUser(form)
      .unwrap()
      .then(() => router.replace("/user-management"))
      .catch(({ data }) =>
        enqueueSnackbar(data?.message, { variant: "error" })
      );
  };

  return (
    <>
      <Head>
        <title>Create User</title>
      </Head>
      <PageTitleWrapper>
        <UserManagementHeader
          type="form"
          title={`Create User`}
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
