import { Link } from 'react-router-dom';

export default function MealCard({ meal }) {
    return (
        <Link
            to={`/meal/${meal.idMeal}`}
            className='flex flex-col justify-center items-center gap-4 border p-4 cursor-pointer'
        >
            <img className='w-20' src={meal.strMealThumb} alt={meal.strMeal} />
            <h3 className='text-center capitalize'>{meal.strMeal}</h3>
        </Link>
    );
}
