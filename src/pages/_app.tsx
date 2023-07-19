import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {ChakraProvider} from "@chakra-ui/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import baseTheme from "~/themes/baseTheme";
import {Poppins} from "~/components/fonts/Poppins";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={baseTheme}>
        <Poppins />
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
