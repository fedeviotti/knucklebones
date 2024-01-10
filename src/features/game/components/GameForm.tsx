import * as React from "react";
import {
  Box, Button, Flex, Heading, Input, Stack, Text,
} from "@chakra-ui/react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import * as yup from "yup";
import { FiArrowRight } from "react-icons/fi";

export type GameFormValues = {
  playerOne: string;
  playerTwo: string;
};

type Props = {
  onSubmit: (values: GameFormValues) => void;
  initialValues: GameFormValues;
  isSubmitting: boolean;
};

const validationSchema = () => yup.object().shape({
  playerOne: yup.string()
    .required("Player name is required")
    .min(3, "Player name must be at least 3 characters")
    .notOneOf([yup.ref("playerTwo")], "Players must have different names"),
  playerTwo: yup.string()
    .required("Player name is required")
    .min(3, "Player name must be at least 3 characters")
    .notOneOf([yup.ref("playerOne")], "Players must have different names"),
});

export const GameForm = ({ onSubmit, initialValues, isSubmitting }: Props) => (
  <Stack direction="column" alignItems="center" spacing={16}>
    <Heading>Knucklebones</Heading>
    <Flex p={4} borderWidth="1px" borderRadius="lg" alignItems="center" bg="orange.50" opacity="0.95">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {({ isValid }) => (
          <Form>
            <Flex direction={["column", "row"]} gap={4} alignItems="center" justifyContent="space-between">
              <Flex direction="column" gap={4}>
                <Box width={["xs", "md"]} height="64px">
                  <Field as={Input} type="text" name="playerOne" placeholder="Player 1" />
                  <Text color="gray.400" fontSize="sm" ml={2}>
                    <ErrorMessage component="div" name="playerOne" />
                  </Text>
                </Box>
                <Box width={["xs", "md"]} height="64px">
                  <Field as={Input} type="text" name="playerTwo" placeholder="Player 2" />
                  <Text color="gray.400" fontSize="sm" ml={2}>
                    <ErrorMessage component="div" name="playerTwo" />
                  </Text>
                </Box>
              </Flex>
              <Box
                as={Button}
                type="submit"
                colorScheme="primary"
                isDisabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                h="100px"
                w="100px"
                borderRadius="100px"
                rightIcon={<FiArrowRight />}
              >
                Start
              </Box>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  </Stack>
);
