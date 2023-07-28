import * as React from "react";
import type { Player, PlayerOrder } from "~/features/game/types";
import type { GameFormValues } from "~/features/game/components/GameForm";
import { cloneDeep } from "lodash";

type Action =
    { type: "startGame";
      payload: GameFormValues & { gameId: string }; } |
    { type: "addRound" } |
    { type: "quitGame" } |
    { type: "rollDie";
      payload: { playerOrder: PlayerOrder }; } |
    { type: "placeDie";
      payload: {
        calculatedPlayerValues: number[];
        calculatedOpponentValues: number[];
      };
    };
type Dispatch = (action: Action) => void;
type State = { players: Player[]; round: number; gameId: string };
type GameProviderProps = { children: React.ReactNode };

const GameContext = React.createContext<{
  state: State;
  dispatch: Dispatch;
} | undefined>(undefined);

const INITIAL_STATE: State = {
  players: [],
  round: 0,
  gameId: "",
};

function gameReducer(state: State, action: Action) {
  switch (action.type) {
    case "startGame": {
      return {
        ...state,
        players: [
          {
            name: action.payload.playerOne,
            // values: [1, 1, 2, 2, 2, 2, 0, 0, 0],
            values: Array(9).fill(0),
            order: "player" as PlayerOrder,
            valueToPlace: 0,
          },
          {
            name: action.payload.playerTwo,
            // values: [6, 6, 6, 6, 6, 6, 0, 0, 0],
            values: Array(9).fill(0),
            order: "opponent" as PlayerOrder,
            valueToPlace: 0,
          },
        ],
        gameId: action.payload.gameId,
      };
    }
    case "addRound": {
      return { ...state, round: state.round + 1 };
    }
    case "quitGame": {
      return INITIAL_STATE;
    }
    case "rollDie": {
      const newValue = Math.floor(Math.random() * 6) + 1;
      const { playerOrder } = action.payload;
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.order === playerOrder) {
            return { ...cloneDeep(player), valueToPlace: newValue };
          }
          return { ...cloneDeep(player) };
        }),
      };
    }
    case "placeDie": {
      const {
        calculatedPlayerValues, calculatedOpponentValues,
      } = action.payload;

      return {
        ...state,
        players: state.players.map((player) => {
          if (player.order === "player") {
            return {
              ...player,
              values: calculatedPlayerValues,
              valueToPlace: 0,
            };
          }
          return {
            ...player,
            values: calculatedOpponentValues,
            valueToPlace: 0,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
}

const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = React.useReducer(
    gameReducer,
    INITIAL_STATE,
  );
  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

function useGame() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

export { GameProvider, useGame };
