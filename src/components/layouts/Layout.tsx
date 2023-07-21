import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, PAGE_WIDTH } from "~/constants/layout";
import Footer from "~/components/layouts/Footer";
import Navbar from "~/components/layouts/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Navbar />
    <Flex
      direction="column"
      alignItems="center"
      py="32px"
      minHeight={`calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`}
    >
      <Box width={PAGE_WIDTH}>{children}</Box>
    </Flex>
    <Footer />
  </>
);

export default Layout;
