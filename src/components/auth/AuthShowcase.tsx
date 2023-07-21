import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Flex, Text, Button } from "@chakra-ui/react";

export const AuthShowcase = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <Text>
        {sessionData && (
        <span>
          Logged in as
          {sessionData.user?.name}
        </span>
        )}
        {secretMessage && (
        <span>
          {" "}
          -
          {secretMessage}
        </span>
        )}
      </Text>
      <Button
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </Flex>
  );
};
