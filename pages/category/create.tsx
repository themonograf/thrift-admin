import Head from "next/head";
import SidebarLayout from "@/layouts/SidebarLayout";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import Footer from "@/components/Footer";
import ProductCategoryHeader from "@/content/ProductCategory/ProductCategoryHeader";
import ProductCategoryForm from "@/content/ProductCategory/ProductCategoryForm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Grid, Container } from "@mui/material";
import { useCreateCategoryMutation } from "redux/features/product-category/productCategoryApiSlice";
import { useState } from "react";
import { CategoryFormProps } from "@/content/ProductCategory/models/product_category_list";

function ProductCategoryUpdate() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [form, setForm] = useState({
    category: "",
    image: "",
  } as CategoryFormProps);

  const onSubmit = async () => {
    await createCategory(form)
      .unwrap()
      .then(() => router.replace("/category"))
      .catch(({ data }) =>
        enqueueSnackbar(data?.message, { variant: "error" })
      );
  };

  return (
    <>
      <Head>
        <title>Create Category</title>
      </Head>
      <PageTitleWrapper>
        <ProductCategoryHeader
          type="form"
          title={`Create Category`}
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
            <ProductCategoryForm form={form} setForm={setForm} />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ProductCategoryUpdate.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ProductCategoryUpdate;
