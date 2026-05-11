import MealCard from '../components/ui/MealCard';
import { useFavorites } from '../context/FavoritesContext';
import { useCountries } from '../context/CountriesContext';
import { Link } from 'react-router-dom';
import FavoriteCard from '../components/ui/FavoriteCard';

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useFavorites();

    const { flagMap, isReady } = useCountries();

    return (
        <div className='favorites min-h-screen p-10 flex flex-col gap-4'>
            <h1 className='text-3xl font-semibold mx-auto font-heading text-heading'>
                Favorites
            </h1>
            {favorites.length > 0 && isReady ? (
                favorites.map((item) => (
                    <FavoriteCard
                        key={item.idMeal}
                        item={item}
                        isReady={isReady}
                        flagMap={flagMap}
                        toggleFavorite={toggleFavorite}
                    />
                ))
            ) : (
                <div className='favorites min-h-screen p-10 flex flex-col justify-start items-center gap-4'>
                    You don't have any favorite meals yet.
                </div>
            )}
        </div>
    );
}
