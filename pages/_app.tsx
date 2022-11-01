import type { ReactElement, ReactNode } from "react";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import ThemeProvider from "styles/theme/ThemeProviderWrapper";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "utility/createEmotionCache";
import { SidebarProvider } from "src/contexts/SidebarContext";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Provider } from "react-redux";
import store from "redux/store";
import { SnackbarProvider } from "notistack";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
  session: Session;
}

function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    session,
  } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Thrift Admin</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="description" content="The Monograf" />
          </Head>
          <SidebarProvider>
            <ThemeProvider>
              <SnackbarProvider
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                autoHideDuration={3000}
                maxSnack={3}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <CssBaseline />
                  {getLayout(<Component {...pageProps} />)}
                </LocalizationProvider>
              </SnackbarProvider>
            </ThemeProvider>
          </SidebarProvider>
        </CacheProvider>
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
