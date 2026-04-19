export default function MealCard({ meal }) {
    return (
        <div className='flex flex-col justify-center items-center gap-4 border p-4'>
            <img className='w-20' src={meal.strMealThumb} alt={meal.strMeal} />
            <h3 className='text-center capitalize'>{meal.strMeal}</h3>
        </div>
    );
}
