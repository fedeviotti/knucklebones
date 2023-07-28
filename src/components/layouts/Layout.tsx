import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT, PAGE_WIDTH } from "~/constants/layout";
import Footer from "~/components/layouts/Footer";
import Navbar from "~/components/layouts/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => (
  <Box
    backgroundImage="url('https://images.unsplash.com/photo-1570303363992-7f95ee20ebdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80')"
    backgroundPosition="cover"
    backgroundRepeat="no-repeat"
    backgroundSize="cover"
  >
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
  </Box>
);

export default Layout;
