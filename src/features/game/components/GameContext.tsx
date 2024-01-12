import * as React from "react";
import type { Player, PlayerType } from "~/features/game/types";
import type { GameFormValues } from "~/features/game/components/GameForm";
import { cloneDeep } from "lodash";

type Action =
    { type: "startGame";
      payload: GameFormValues & { gameId: string }; } |
    { type: "addRound" } |
    { type: "quitGame" } |
    { type: "rollDie";
      payload: { playerType: PlayerType }; } |
    { type: "placeDie";
      payload: {
        calculatedPlayerValues: number[];
        calculatedOpponentValues: number[];
      };
    };
type Dispatch = (action: Action) => void;
export type GameState = { players: Player[]; round: number; gameId: string };
type GameProviderProps = { children: React.ReactNode; initialState?: GameState };

export const GameContext = React.createContext<{
  state: GameState;
  dispatch: Dispatch;
} | undefined>(undefined);

export const INITIAL_STATE: GameState = {
  players: [],
  round: 0,
  gameId: "",
};

function gameReducer(state: GameState, action: Action) {
  switch (action.type) {
    case "startGame": {
      return {
        ...state,
        players: [
          {
            name: action.payload.playerOne,
            // values: [1, 1, 2, 2, 2, 2, 0, 0, 0],
            values: Array(9).fill(0),
            type: "player" as PlayerType,
            valueToInsert: 0,
          },
          {
            name: action.payload.playerTwo,
            // values: [6, 6, 6, 6, 6, 6, 0, 0, 0],
            values: Array(9).fill(0),
            type: "opponent" as PlayerType,
            valueToInsert: 0,
          },
        ],
        gameId: action.payload.gameId,
      };
    }
    case "addRound": {
      return { ...cloneDeep(state), round: state.round + 1 };
    }
    case "quitGame": {
      return INITIAL_STATE;
    }
    case "rollDie": {
      const newValue = Math.floor(Math.random() * 6) + 1;
      const { playerType } = action.payload;
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.type === playerType) {
            return { ...cloneDeep(player), valueToInsert: newValue };
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
          if (player.type === "player") {
            return {
              ...player,
              values: calculatedPlayerValues,
              valueToInsert: 0,
            };
          }
          return {
            ...player,
            values: calculatedOpponentValues,
            valueToInsert: 0,
          };
        }),
      };
    }
    default: {
      return state;
    }
  }
}

const GameProvider = ({ children, initialState = INITIAL_STATE }: GameProviderProps) => {
  const [state, dispatch] = React.useReducer(
    gameReducer,
    initialState,
  );
  const value = React.useMemo(
    () => ({ state, dispatch }),
    [state],
  );
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
