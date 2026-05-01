import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function MealPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { favorites, toggleFavorite } = useFavorites();

    const [singleMeal, setSingleMeal] = useState({});
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const isFavorite =
        favorites?.some((fav) => fav.idMeal === singleMeal.idMeal) ?? false;

    useEffect(() => {
        const controller = new AbortController();
        const fetchMeal = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
                    { signal: controller.signal },
                );
                const mealData = await res.json();
                // console.log(mealData);
                setSingleMeal(mealData?.meals[0] || {});
            } catch (error) {
                if (error.name === 'AbortError') return;
                // console.log('Error:', error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
        return () => controller.abort();
    }, [id]);

    if (loading) return <h2>Loading...</h2>;
    if (isError) return <h2>Error fetching data!</h2>;

    return (
        <div>
            <button className='cursor-pointer' onClick={() => navigate('/')}>
                Back
            </button>
            <h1>{singleMeal?.strMeal}</h1>
            <p>{singleMeal?.strInstructions}</p>
            <button
                onClick={() => toggleFavorite(singleMeal)}
                className='cursor-pointer'
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    );
}
