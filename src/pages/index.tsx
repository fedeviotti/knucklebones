import * as React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { GameForm, type GameFormValues } from "~/features/game/GameForm";
import { GameDashboard } from "~/features/game/GameDashboard";

export interface Player {
  name: string;
  values: number[];
}

export interface Players {
  playerOne: Player;
  playerTwo: Player;
}

const Home = () => {
  const [players, setPlayers] = React.useState<Players>();

  const onSubmitHandler = (values: GameFormValues) => {
    setPlayers(() => ({
      playerOne: {
        name: values.playerOne,
        values: Array.from({ length: 9 }, () => 0),
      },
      playerTwo: {
        name: values.playerTwo,
        values: Array.from({ length: 9 }, () => 0),
      },
    }));
  };

  const getContent = () => {
    if (players) {
      return <GameDashboard onQuit={() => setPlayers(undefined)} players={players} />;
    }
    return (
      <GameForm
        initialValues={{ playerOne: "Teo", playerTwo: "Noa" }}
        onSubmit={(values) => onSubmitHandler(values)}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Knucklebones</title>
        <meta name="description" content="Knucklebones game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box m={8}>
        {getContent()}
      </Box>
    </>
  );
};

export default Home;
