import * as React from "react";
import {
  Box, Button, Flex, Heading, Input, Stack,
} from "@chakra-ui/react";
import {
  ErrorMessage, Field, Form, Formik,
} from "formik";
import * as yup from "yup";

export type GameFormValues = {
  playerOne: string;
  playerTwo: string;
};

type Props = {
  onSubmit: (values: GameFormValues) => void;
  initialValues: GameFormValues;
};

const validationSchema = () => yup.object().shape({
  playerOne: yup.string().required().min(3),
  playerTwo: yup.string().required().min(3),
});

export const GameForm = ({ onSubmit, initialValues }: Props) => (
  <Stack direction="column" alignItems="center" width="100%" spacing={16}>
    <Heading>Knucklebones</Heading>
    <Flex p={4} borderWidth="1px" borderRadius="lg" alignItems="center" bg="orange.50">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        {({ isValid }) => (
          <Form>
            <Flex gap={4} alignItems="center" justifyContent="space-between">
              <Flex direction="column" gap={4}>
                <Box width="md" height="64px">
                  <Field as={Input} type="text" name="playerOne" placeholder="Player 1" />
                  <ErrorMessage component="div" name="playerOne" />
                </Box>
                <Box width="md" height="64px">
                  <Field as={Input} type="text" name="playerTwo" placeholder="Player 2" />
                  <ErrorMessage component="div" name="playerTwo" />
                </Box>
              </Flex>
              <Button
                type="submit"
                colorScheme="primary"
                isDisabled={!isValid}
                size="lg"
                borderRadius={8}
              >
                Start
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  </Stack>
);
