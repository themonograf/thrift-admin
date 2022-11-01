import React from "react";
import { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { Box, Button, Container, TextField } from "@mui/material";
import Image from "next/image";

const SignIn: NextPage = (): JSX.Element => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  } as {
    username: string;
    password: string;
  });
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // try {
    //   const userData = await login(form).unwrap();
    //   console.log(userData);
    //   dispatch(setCredentials({ ...userData }));
    // } catch (error) {
    //   console.log(error);
    // }
    await signIn("credentials", { ...form, redirect: true });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Image
            src="https://cdn.themonograf.com/web-assets/logo3-medium.png"
            alt="Logo"
            width={60}
            height={60}
          />
        </Box>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
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
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
