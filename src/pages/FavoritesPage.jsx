import MealCard from '../components/ui/MealCard';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className='favorites'>
            {favorites.length > 0
                ? favorites.map((item) => (
                      <MealCard key={item.idMeal} meal={item} />
                  ))
                : `You don't have any favorite meals yet.`}
        </div>
    );
}
