import { Grid, Container } from "@mui/material";
import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import UserManagementHeader from "@/content/UserManagement/UserManagementHeader";
import UserManagementList from "@/content/UserManagement/UserManagementList";
// import { getSession } from "next-auth/react";

function UserManagement() {
  return (
    <>
      <Head>
        <title>Users | Thrift Admin</title>
      </Head>
      <PageTitleWrapper>
        <UserManagementHeader
          href="/user-management/create"
          type="table"
          title={`User Management`}
          buttonTitle="USER"
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
            <UserManagementList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

UserManagement.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default UserManagement;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   return {
//     props: {
//       session,
//     },
//   };
// }
