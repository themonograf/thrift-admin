import { Grid, Container } from "@mui/material";
import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import ProductCategoryHeader from "@/content/ProductCategory/ProductCategoryHeader";
import ProductCategoryList from "@/content/ProductCategory/ProductCategoryList";

function ProductCategory() {
  return (
    <>
      <Head>
        <title>Categories | Thrift Admin</title>
      </Head>
      <PageTitleWrapper>
        <ProductCategoryHeader
          href="/category/create"
          type="table"
          title={`Category`}
          buttonTitle="CATEGORY"
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
            <ProductCategoryList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ProductCategory.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default ProductCategory;
