import { Link } from 'react-router-dom';

export default function MealCard({ meal, flagMap, isReady }) {
    return (
        <Link
            to={`/meal/${meal.idMeal}`}
            className='flex flex-col justify-stretch items-center gap-4 lg:min-h-[320px] px-4 py-3 rounded-sm shadow-xl/30 shadow-heading bg-beige cursor-pointer'
        >
            <img
                className='w-full h-auto object-cover'
                src={meal.strMealThumb}
                alt={meal.strMeal}
            />
            <div className='card-title w-full flex flex-col justify-between items-stretch gap-4'>
                <h3 className='text-heading font-semibold text-base/5'>
                    {meal.strMeal}
                </h3>

                <div className='flex items-center gap-2 mt-1'>
                    {isReady && flagMap[meal.strArea] && (
                        <img
                            src={flagMap[meal.strArea]}
                            alt={meal.strArea}
                            className='h-6 w-8 object-cover rounded-sm shadow-sm'
                        />
                    )}
                    <span className='text-sm text-primary'>{meal.strArea}</span>
                </div>
            </div>
        </Link>
    );
}
