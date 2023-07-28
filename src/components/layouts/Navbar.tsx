import { Box, Flex, Link } from "@chakra-ui/react";
import ActiveLink from "~/components/ActiveLink";
import { useRouter } from "next/router";
import NextLink from "next/link";

const Navbar = () => {
  const router = useRouter();

  const getContent = () => {
    if (router.asPath === "/game") {
      return (
        <Link as={NextLink} href="/" style={{ textDecoration: "none" }}>
          Quit game
        </Link>
      );
    }
    return (
      <>
        <ActiveLink href="/">
          <Box minWidth="100px">Play</Box>
        </ActiveLink>
        <ActiveLink href="/how-to-play">
          <Box minWidth="100px" textAlign="center">How to play</Box>
        </ActiveLink>
        <ActiveLink href="/ranking">
          <Box minWidth="100px">Ranking</Box>
        </ActiveLink>
      </>
    );
  };

  return (
    <Flex w="100%" justifyContent="space-between" p={8}>
      {getContent()}
    </Flex>
  );
};

export default Navbar;
