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
                console.log('Error:', error);
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
        <div className='min-h-screen bg-background text-text px-4 md:px-16 lg:px-24 xl:px-32 py-10'>
            {/* HEADER ACTION BAR */}
            <div className='flex items-center justify-between mb-6'>
                {/* BACK BUTTON */}
                <button
                    className='text-sm text-primary hover:opacity-80 transition cursor-pointer'
                    onClick={() => {
                        // HINT: later this will NOT go to homepage
                        navigate(-1);
                    }}
                >
                    ← Back
                </button>

                {/* FAVORITE BUTTON */}
                <button
                    onClick={() => toggleFavorite(singleMeal)}
                    className='text-2xl cursor-pointer transition'
                >
                    {isFavorite ? (
                        <div className='flex items-center cursor-pointer'>
                            <span className='text-sm text-text transition duration-300'>
                                Already a Favorite
                            </span>
                            <span>❤️</span>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <span className='text-sm text-text hover:opacity-80 transition cursor-pointer'>
                                Add to Favorites
                            </span>
                            <span>🤍</span>
                        </div>
                    )}
                </button>
            </div>

            {/* TITLE */}
            <h1 className='text-3xl md:text-5xl font-heading text-heading mb-6'>
                {singleMeal?.strMeal}
            </h1>

            {/* HERO IMAGE */}
            <div className='rounded-2xl overflow-hidden mb-8 border border-black/10'>
                <img
                    src={singleMeal?.strMealThumb}
                    alt={singleMeal?.strMeal}
                    className='w-full h-[300px] md:h-[450px] object-cover'
                />
            </div>

            {/* META INFO */}
            <div className='flex gap-2 mb-8 text-xs'>
                <span className='px-3 py-1 rounded-full bg-beige text-heading'>
                    {singleMeal?.strCategory}
                </span>
                <span className='px-3 py-1 rounded-full bg-beige text-heading'>
                    {singleMeal?.strArea}
                </span>
            </div>

            {/* INSTRUCTIONS */}
            <div className='mb-10'>
                <h2 className='text-xl font-heading mb-3 text-heading'>
                    Instructions
                </h2>

                <p className='leading-relaxed text-text/80 whitespace-pre-line'>
                    {singleMeal?.strInstructions}
                </p>
            </div>

            {/* INGREDIENTS (HINT SECTION) */}
            <div className='bg-beige/30 rounded-2xl p-6'>
                <h2 className='text-xl font-heading mb-4 text-heading'>
                    Ingredients
                </h2>

                {/* HINT: map ingredient1-20 here */}
                <p className='text-sm text-text/70'>
                    // TODO: build ingredient + measure list
                </p>
            </div>
        </div>
    );
}
