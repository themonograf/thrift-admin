import { Box, TextField } from "@mui/material";
import React from "react";
import { CategoryFormProps } from "./models/product_category_list";

interface Props {
  form: CategoryFormProps;
  setForm: (any) => any;
}

function ProductCategoryForm({ form, setForm }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mt: 1 }}></Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="category"
        label="Category"
        name="category"
        autoComplete="category"
        value={form.category}
        onChange={({ target: { name, value } }) =>
          setForm((prevState) => ({ ...prevState, [name]: value }))
        }
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="image"
        label="Image"
        name="image"
        autoComplete="image"
        value={form.image}
        onChange={({ target: { name, value } }) =>
          setForm((prevState) => ({ ...prevState, [name]: value }))
        }
      />
    </Box>
  );
}

export default ProductCategoryForm;
