import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  startGame: publicProcedure
    .input(z.object({ player: z.string(), opponent: z.string() }))
    .mutation(({ ctx, input }) => ctx.prisma.game.create({
      data: {
        player: input.player,
        opponent: input.opponent,
      },
    })),
  addMove: publicProcedure
    .input(z.object({
      gameId: z.string(),
      player: z.string(),
      opponent: z.string(),
      playerValues: z.array(z.number()),
      opponentValues: z.array(z.number()),
      playerScore: z.number(),
      opponentScore: z.number(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.move.create({
      data: {
        gameId: input.gameId,
        player: input.player,
        opponent: input.opponent,
        playerValues: input.playerValues.join(","),
        opponentValues: input.opponentValues.join(","),
        playerScore: input.playerScore,
        opponentScore: input.opponentScore,
      },
    })),
  endGame: publicProcedure
    .input(z.object({
      gameId: z.string(), winner: z.string(), score: z.number(), delta: z.number(),
    }))
    .mutation(({ ctx, input }) => ctx.prisma.game.update({
      where: { id: input.gameId },
      data: {
        winner: input.winner,
        score: input.score,
        delta: input.delta,
      },
    })),
  getRanking: publicProcedure
    .query(({ ctx }) => ctx.prisma.game.groupBy({
      by: ["winner"],
      having: { winner: { not: null } },
      _sum: { delta: true },
      _count: { winner: true },
      orderBy: { _sum: { delta: "desc" } },
    })),
  getNotWinnerRankingRaw: publicProcedure
    .query(({ ctx }) => ctx.prisma.$queryRaw`
    select distinct winner, count(*) as delta from(
        select winner from (
            SELECT player as "winner", "createdAt"
            from "Game"
            where winner is not null AND "Game".player != winner
            UNION
            SELECT opponent as "winner", "createdAt"
            from "Game"
            where winner is not null and "Game".opponent != winner
            ) as main
        order by "createdAt" asc)
    as mainTwo group by winner order by delta desc`),
  getGamesByPlayer: publicProcedure
    .input(z.object({
      playerName: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.game.findMany({
      where: {
        winner: { not: null },
        OR: [
          { player: { equals: input.playerName } },
          { opponent: { equals: input.playerName } },
        ],
      },
    })),
  getMovesByGame: publicProcedure
    .input(z.object({
      gameId: z.string(),
    }))
    .query(({ ctx, input }) => ctx.prisma.move.findMany({
      where: {
        gameId: input.gameId,
      },
    })),
});
