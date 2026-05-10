import useRandomMeal from '../../utils/useRandomMeal';
import { Link } from 'react-router-dom';

export default function RandomMealHero() {
    const { loading, isError, randomMeal } = useRandomMeal();

    // Conditional rendering
    if (loading) return <h2>Loading...</h2>;
    if (isError) return <h2>Error fetching data!</h2>;

    // Main render
    return (
        <div className='flex flex-col justify-center text-text'>
            <h2 className='text-3xl md:text-5xl font-heading text-heading text-center mb-6'>
                Meal of the Day
            </h2>
            <div className='rounded-2xl overflow-hidden mb-8'>
                <img
                    src={randomMeal?.strMealThumb}
                    alt={randomMeal?.strMeal}
                    className='w-full h-[300px] md:h-[450px] object-cover'
                />
            </div>
            <div className='flex flex-col items-center font-heading mb-6'>
                <h3 className='text-xl md:text-3xl text-heading text-center'>
                    {randomMeal?.strMeal}
                </h3>
                <span className='text-lg'>from {randomMeal?.strCountry}</span>
            </div>

            <Link
                to={`/meal/${randomMeal.idMeal}`}
                className='flex justify-center items-center m-auto cursor-pointer w-fit border border-primary hover:bg-primary hover:text-background transition duration-300 px-4 py-1 leading-tight'
            >
                View Recipe
            </Link>
        </div>
    );
}
