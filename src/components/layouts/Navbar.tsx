import { Flex, Link } from "@chakra-ui/react";
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
        <ActiveLink href="/">Play</ActiveLink>
        <ActiveLink href="/how-to-play">How to play</ActiveLink>
        <ActiveLink href="/ranking">Ranking</ActiveLink>
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
