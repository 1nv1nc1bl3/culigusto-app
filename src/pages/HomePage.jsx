import { useFetchData } from '../utils/useFetchData';
import MealCard from '../components/ui/MealCard';
import { useState } from 'react';
import CategoriesSection from '../components/ui/CategoriesSection';
import Loader from '../components/ui/Loader';

export default function HomePage() {
    const [query, setQuery] = useState('');

    const { meals, isLoading, isError } = useFetchData(query);

    const showLanding = query.trim().length < 3;

    return (
        <main className='flex flex-col justify-center items-center m-auto max-w-3xl min-h-screen p-4 gap-10'>
            <div className='search-input w-full flex justify-center'>
                <input
                    type='text'
                    placeholder='Search for a recipe...'
                    className='border p-2'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {showLanding ? (
                <CategoriesSection />
            ) : (
                <div className='results w-full flex flex-col justify-center items-center gap-10'>
                    {isLoading && <Loader />}
                    {isError && <h2>Error fetching data!</h2>}
                    {!isLoading && !isError && (
                        <>
                            <h1 className='text-3xl font-semibold'>
                                Recipes List
                            </h1>
                            <section className='grid grid-cols-4 w-full gap-4'>
                                {meals.map((meal) => (
                                    <MealCard key={meal.idMeal} meal={meal} />
                                ))}
                            </section>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}
