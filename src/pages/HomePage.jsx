import { useFetchData } from '../utils/useFetchData';
import { useCountries } from '../context/CountriesContext';
import { useState } from 'react';
import MealCard from '../components/ui/MealCard';
import Loader from '../components/ui/Loader';
import SearchBar from '../components/ui/SearchBar';
import Hero from '../components/ui/Hero';
import RandomMealHero from '../components/layout/RandomMealHero';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [query, setQuery] = useState('');

    const { meals, isLoading, isError } = useFetchData(query);
    const { flagMap, isReady } = useCountries();

    const navigate = useNavigate();

    const showLanding = query.trim().length < 3;

    const handleMealClick = (meal) => {
        navigate(`/meal/${meal.idMeal}`, {
            state: { from: `/` },
        });
    };

    return (
        <main className='flex flex-col justify-center items-center min-h-screen gap-10'>
            {showLanding && <Hero />}
            {/* search bar & meals list */}
            <div
                className={`${!showLanding && 'py-20'} ${showLanding && 'pb-10'} flex flex-col justify-center items-center mx-auto max-w-3xl gap-10`}
            >
                <SearchBar query={query} setQuery={setQuery} />

                {showLanding ? (
                    <RandomMealHero />
                ) : (
                    <div className='results w-full flex flex-col justify-center items-center gap-10'>
                        {isLoading && <Loader />}
                        {isError && <h2>Error fetching data!</h2>}
                        {!isLoading && !isError && (
                            <>
                                <h1 className='text-3xl font-semibold font-heading text-heading'>
                                    Recipes List
                                </h1>
                                {meals.length > 0 ? (
                                    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4'>
                                        {meals.map((meal) => (
                                            <MealCard
                                                key={meal.idMeal}
                                                meal={meal}
                                                flagMap={flagMap}
                                                isReady={isReady}
                                                handleMealClick={
                                                    handleMealClick
                                                }
                                            />
                                        ))}
                                    </section>
                                ) : (
                                    'No recipes found'
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
