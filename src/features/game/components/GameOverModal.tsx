import * as React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  winnerName: string;
};

export const GameOverModal = ({ isOpen, onClose, winnerName }: Props) => (
  <Box
    key="modal"
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { delay: 0.2 } }}
    exit={{ opacity: 0 }}
  >
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Game over</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">
            {`${winnerName} wins!`}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="primary" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>
);
