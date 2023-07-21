import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
  children: React.ReactNode;
  href: string;
};
const ActiveLink = ({ children, href }: Props) => {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "#AF09F4" : "black",
    textDecoration: router.asPath === href ? "underline" : "none",
  };

  return (
    <Link as={NextLink} href={href} style={style}>
      {children}
    </Link>
  );
};

export default ActiveLink;
