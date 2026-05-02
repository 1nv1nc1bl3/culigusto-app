import { useFetchData } from '../utils/useFetchData';
import { useCountries } from '../context/CountriesContext';
import { useState } from 'react';
import MealCard from '../components/ui/MealCard';
import CategoriesSection from '../components/ui/CategoriesSection';
import Loader from '../components/ui/Loader';
import SearchBar from '../components/ui/SearchBar';
import Hero from '../components/ui/Hero';

export default function HomePage() {
    const [query, setQuery] = useState('');

    const { meals, isLoading, isError } = useFetchData(query);
    const { flagMap, isReady } = useCountries();

    const showLanding = query.trim().length < 3;

    return (
        <main className='flex flex-col justify-center items-center min-h-screen gap-10'>
            <Hero />
            {/* search bar & meals list */}
            <div className='flex flex-col justify-center items-center mx-auto max-w-3xl pb-10 gap-10'>
                <SearchBar query={query} setQuery={setQuery} />

                {showLanding ? (
                    <CategoriesSection />
                ) : (
                    <div className='results w-full flex flex-col justify-center items-center gap-10'>
                        {isLoading && <Loader />}
                        {isError && <h2>Error fetching data!</h2>}
                        {!isLoading && !isError && (
                            <>
                                <h1 className='text-3xl font-semibold font-heading text-heading'>
                                    Recipes List
                                </h1>
                                <section className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
                                    {meals.map((meal) => (
                                        <MealCard
                                            key={meal.idMeal}
                                            meal={meal}
                                            flagMap={flagMap}
                                            isReady={isReady}
                                        />
                                    ))}
                                </section>
                            </>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
