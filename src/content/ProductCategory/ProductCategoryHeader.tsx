import { Typography, Button, Grid, CircularProgress } from "@mui/material";
import NextLink from "next/link";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import SaveAsIcon from "@mui/icons-material/SaveAs";

type HeaderType = "form" | "table";

interface Props {
  title?: string;
  type: HeaderType;
  buttonTitle?: string;
  buttonLoading?: boolean;
  href?: string;
  onSubmit?: (any) => any;
}

function ProductCategoryHeader({
  title,
  type,
  buttonTitle,
  buttonLoading,
  onSubmit,
  href,
}: Props) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
      </Grid>
      <Grid item>
        {type === "table" ? (
          <Button
            disabled={buttonLoading}
            component={NextLink}
            passHref
            href={href || "#"}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={
              buttonLoading ? (
                <CircularProgress color="success" size={"14px"} />
              ) : (
                <AddTwoToneIcon fontSize="small" />
              )
            }
          >
            {buttonTitle || "Create"}
          </Button>
        ) : (
          <Button
            disabled={buttonLoading}
            onClick={onSubmit}
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={
              buttonLoading ? (
                <CircularProgress color="success" size={"14px"} />
              ) : (
                <SaveAsIcon fontSize="small" />
              )
            }
          >
            {buttonTitle || "Submit"}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductCategoryHeader;
