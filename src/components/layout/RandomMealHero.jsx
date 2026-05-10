import useRandomMeal from '../../utils/useRandomMeal';
import { Link } from 'react-router-dom';

export default function RandomMealHero() {
    const { loading, isError, randomMeal } = useRandomMeal();

    // Conditional rendering
    if (loading) return <h2>Loading...</h2>;
    if (isError) return <h2>Error fetching data!</h2>;

    // Main render
    return (
        <div className='flex flex-col justify-center text-text gap-6'>
            <h2 className='text-3xl text-center font-semibold font-heading text-heading'>
                Meal of the Day
            </h2>
            <div className=''>
                <img
                    src={randomMeal?.strMealThumb}
                    alt={randomMeal?.strMeal}
                    className='w-full h-[300px] md:h-[450px] object-cover flex items-center rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-linear'
                />
            </div>
            <div className='flex flex-col items-center font-heading'>
                <h3 className='text-lg md:text-2xl text-heading text-center font-semibold'>
                    {randomMeal?.strMeal}
                </h3>
                <span className='text-lg'>from {randomMeal?.strCountry}</span>
            </div>

            <Link
                to={`/meal/${randomMeal.idMeal}`}
                className='relative w-fit mx-auto pb-2 leading-tight after:content-[""] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0'
            >
                View Recipe
            </Link>
        </div>
    );
}
