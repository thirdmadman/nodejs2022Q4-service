import { GenericRepository } from 'src/generics/generic.repository';
import { Favorite } from 'src/interfaces/favorite.interface';

class FavoriteRepository extends GenericRepository<Favorite> {
  findAllWhere(query: Partial<{ [K in keyof Favorite]: string }>) {
    const favorites = this.findAll();
    if (!favorites || favorites.length === 0) return null;

    const filtered = favorites.filter((favorite) => {
      let result = false;
      Object.keys(query).forEach((field) => {
        if (query[field] === favorite[field]) {
          result = true;
        }
      });
      return result;
    });

    if (!filtered || filtered.length === 0) return null;

    return filtered;
  }
}
export const favoriteRepository = new FavoriteRepository('favorite');
