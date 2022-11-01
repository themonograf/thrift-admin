import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import { Grid, Container, Button } from "@mui/material";
import Footer from "@/components/Footer";

function Home() {
  return (
    <>
      <Head>
        <title>Home | Thrift Admin</title>
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}></Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

Home.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Home;
