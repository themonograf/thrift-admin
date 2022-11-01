import { Typography, Button, Grid, CircularProgress } from "@mui/material";
import NextLink from "next/link";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
// import { Session } from "next-auth";
import SaveAsIcon from "@mui/icons-material/SaveAs";

type HeaderType = "form" | "table";

// type FormTypeProps = {
//   href?: string;
// };

// type TableTypeProps = {
//   onSubmit?: (any) => any;
// };

// type PropsExtended<T> = T extends { type: "form" }
//   ? FormTypeProps
//   : T extends { type: "table" }
//   ? TableTypeProps
//   : never;

// <T extends {type: "form"} ? FormTypeProps : T extends {type: "table"} ? TableTypeProps : never>

interface Props {
  title?: string;
  type: HeaderType;
  // session?: Session;
  buttonTitle?: string;
  buttonLoading?: boolean;
  href?: string;
  onSubmit?: (any) => any;
}

function UserManagementHeader({
  title,
  type,
  // session,
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
        {/* <Typography variant="subtitle2">
          {session?.user?.name}, these are the list of your user data
        </Typography> */}
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

export default UserManagementHeader;
