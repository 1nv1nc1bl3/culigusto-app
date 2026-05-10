import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function useSingleMeal() {
    const navigate = useNavigate();
    const location = useLocation();
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
                console.log('Error:', error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchMeal();
        return () => controller.abort();
    }, [id]);

    // Recipe Ingredients
    const ingredientSlots = Array.from({ length: 20 }, (_, index) => index + 1);
    const ingredients = ingredientSlots
        .map((n) => ({
            ingredient: singleMeal[`strIngredient${n}`],
            measure: singleMeal[`strMeasure${n}`],
        }))
        .filter((item) => item.ingredient && item.ingredient.trim() !== '');

    // Recipe Youtube Video
    const splitVideo = singleMeal?.strYoutube?.split('v=') || [];
    const VIDEO_LINK = splitVideo[1];
    const embeddedVideo = VIDEO_LINK
        ? `https://www.youtube.com/embed/${VIDEO_LINK}`
        : null;

    // External Recipe Source URL
    const externalLink = singleMeal?.strSource
        ? new URL(singleMeal.strSource).hostname
        : null;

    return {
        navigate,
        location,
        toggleFavorite,
        isFavorite,
        singleMeal,
        loading,
        isError,
        ingredients,
        embeddedVideo,
        externalLink,
    };
}
