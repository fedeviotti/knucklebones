import {
  Heading, List, ListIcon, ListItem, Stack, Text,
} from "@chakra-ui/react";
import * as React from "react";
import { AiFillCaretRight } from "react-icons/ai";

const HowToPlay = () => (
  <Stack spacing={16}>
    <Heading alignSelf="center">How to play</Heading>
    <List spacing={8}>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={AiFillCaretRight} color="primary.200" />
        <Text fontSize={16}>
          The game consists of two 3x3 boards,
          each belonging to their respective player.
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={AiFillCaretRight} color="primary.200" />
        <Text fontSize={16}>
          The players take turns. On a player′s turn,
          they roll a single 6-sided die, and must place it in a column on their board.
          A filled column does not accept any more dice.
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={AiFillCaretRight} color="primary.200" />
        <Text fontSize={16}>
          Each player has a score, which is the sum of all the dice values on their
          board. The score awarded by each column is also displayed.
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={AiFillCaretRight} color="primary.200" />
        <Text fontSize={16}>
          If a player places multiple dice of the same value in the same column,
          the score awarded for each of those dice is multiplied by the number of
          dice of the same value in that column.
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={AiFillCaretRight} color="primary.200" />
        <Text fontSize={16}>
          When a player places a die, all dice of the same value in the
          corresponding column of the opponent′s board gets destroyed. Players can
          use this mechanic to destroy their opponent′s high-scoring combos.
        </Text>
      </ListItem>
      <ListItem display="flex" alignItems="center">
        <ListIcon as={AiFillCaretRight} color="primary.200" />
        <Text fontSize={16}>
          The game ends when either player completely fills up their 3x3 board. The
          player with the higher score wins.
        </Text>
      </ListItem>
    </List>
  </Stack>
);

export default HowToPlay;
