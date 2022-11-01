import { Box, TextField } from "@mui/material";
import React from "react";
import { UserFormProps } from "./models/user_list";

interface Props {
  form: UserFormProps;
  setForm: (any) => any;
}

function UserManagementForm({ form, setForm }: Props) {
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
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        value={form.username}
        onChange={({ target: { name, value } }) =>
          setForm((prevState) => ({ ...prevState, [name]: value }))
        }
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        value={form.name}
        onChange={({ target: { name, value } }) =>
          setForm((prevState) => ({ ...prevState, [name]: value }))
        }
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={form.password}
        onChange={({ target: { name, value } }) =>
          setForm((prevState) => ({ ...prevState, [name]: value }))
        }
      />
    </Box>
  );
}

export default UserManagementForm;
