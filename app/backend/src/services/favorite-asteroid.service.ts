import { Prisma, PrismaClient } from "@prisma/client";

export default class FavoriteAsteroidService {
  private prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

  async retrieveFavorite(favId: number) {
    const where: Prisma.AsteroidFavoritesWhereUniqueInput = {
      id: favId,
    };
    return this.prisma.asteroidFavorites.findFirst({ where });
  }

  async retrieveFirstAsteroidFavorites(asteroidId: string) {
    const where: Prisma.AsteroidFavoritesWhereInput = {
      asteroid_id: asteroidId,
    };
    return this.prisma.asteroidFavorites.findFirst({ where });
  }

  async retrieveFavoritesInList(ids: string[]) {
    const where: Prisma.AsteroidFavoritesWhereInput = {
      asteroid_id: { in: ids },
    };
    return this.prisma.asteroidFavorites.findMany({
      select: { id: true, asteroid_id: true },
      where,
    });
  }

  async createFavorite(asteroidId: string) {
    const data: Prisma.AsteroidFavoritesCreateInput = {
      asteroid_id: asteroidId,
    };
    return this.prisma.asteroidFavorites.create({ data });
  }

  async removeFavorite(favId: number) {
    const where: Prisma.AsteroidFavoritesWhereUniqueInput = {
      id: favId,
    };
    return this.prisma.asteroidFavorites.delete({ where });
  }
}
