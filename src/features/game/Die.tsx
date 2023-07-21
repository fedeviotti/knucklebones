import { Flex } from "@chakra-ui/react";

type Props = {
  value: number;
};
export const Die = ({ value }: Props) => (
  <Flex
    width="50px"
    height="50px"
    bg="primary.100"
    alignItems="center"
    justifyContent="center"
    borderRadius="md"
  >
    {value > 0 ? value : null}
  </Flex>
);
