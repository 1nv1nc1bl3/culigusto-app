import { useFetchData } from './utils/useFetchData';
import MealCard from './components/ui/MealCard';
import { useState } from 'react';

export default function App() {
    const [query, setQuery] = useState('');

    const { meals, isLoading, isError } = useFetchData(query);

    if (isLoading)
        return (
            <main className='flex justify-center items-center m-auto max-w-3xl h-screen p-4'>
                <h2>Loading...</h2>
            </main>
        );

    if (isError) return <h2>Error fetching data!</h2>;

    return (
        <main className='flex flex-col justify-center items-center m-auto max-w-3xl min-h-screen p-4 gap-10'>
            <h1 className='text-3xl font-semibold'>Recipes List</h1>
            <section className='grid grid-cols-4 w-full gap-4'>
                {meals.map((meal) => (
                    <MealCard
                        key={meal.idMeal}
                        meal={meal}
                        setQuery={setQuery}
                    />
                ))}
            </section>
        </main>
    );
}
