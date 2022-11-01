import BaseLayout from "@/layouts/BaseLayout";
import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import NextLink from "next/link";
import { Session } from "next-auth";
import { getSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";

interface Props {
  session: Session;
}

const Home: NextPage = ({ session }: Props) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      {!session ? (
        <main>
          <Button type="button" onClick={() => signIn()}>
            Sign In
          </Button>
        </main>
      ) : null}

      {session ? (
        <main>
          <Typography>Hi, {session?.user?.name}</Typography>
          <Button component={NextLink} type="button" href="/home">
            Go Home
          </Button>
          <Button type="button" onClick={() => signOut()}>
            Sign Out
          </Button>
        </main>
      ) : null}
    </div>
  );
};

Home.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
