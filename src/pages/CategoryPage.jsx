import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCountries } from '../context/CountriesContext';
import MealCard from '../components/ui/MealCard';
import { LuArrowLeft, LuChevronRight, LuChevronLeft } from 'react-icons/lu';

export default function CategoryPage() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const mealsPerPage = 24;
    const totalPages = Math.ceil(recipes.length / mealsPerPage);
    const currentPageMeals = recipes.slice(
        (currentPage - 1) * mealsPerPage,
        currentPage * mealsPerPage,
    );
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    const { name } = useParams();
    const { flagMap, isReady } = useCountries();

    useEffect(() => {
        const controller = new AbortController();
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`,
                    { signal: controller.signal },
                );
                if (!res.ok) return;
                const data = await res.json();
                const recipesList = data?.meals || [];
                setRecipes(recipesList);
                // console.log(data?.meals);
                // console.log(recipes[0]);
                console.log(flagMap['Spanish']);
            } catch (error) {
                console.log('Error:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchCategory();
        return () => controller.abort();
    }, [name]);

    if (loading) return 'Loading...';
    if (error) return 'Sorry, there was an error loading category!';

    return (
        <main className='flex flex-col justify-center items-center min-h-screen gap-10'>
            <div className='p-20 flex flex-col justify-center items-center mx-auto min-w-3xl gap-10'>
                <div className='results w-full flex flex-col justify-center items-center gap-10'>
                    <div className='title-bar flex justify-between items-center w-full'>
                        <Link to='/' className='flex items-center gap-2'>
                            <LuArrowLeft />
                            Back to Home
                        </Link>
                        <h1 className='text-3xl font-semibold font-heading text-heading'>
                            {name} Recipes
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-4'>
                        {currentPageMeals.map((meal) => (
                            <MealCard
                                key={meal?.idMeal}
                                meal={meal}
                                flagMap={flagMap}
                                isReady={isReady}
                            />
                        ))}
                    </div>
                </div>

                {/* pagination */}
                <div className='flex items-center gap-2'>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage((prev) => prev - 1);
                        }}
                        className='cursor-pointer'
                    >
                        <LuChevronLeft />
                    </button>
                    <div className='flex gap-1'>
                        {pagesArray.map((page) => (
                            <button
                                key={page}
                                onClick={() => {
                                    setCurrentPage(page);
                                    window.scrollTo(0, 0);
                                }}
                                className={
                                    currentPage === page
                                        ? 'bg-primary text-white'
                                        : ''
                                }
                                style={{
                                    borderRadius: '50px',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => {
                            window.scrollTo(0, 0);
                            setCurrentPage((prev) => prev + 1);
                        }}
                        className='cursor-pointer'
                    >
                        <LuChevronRight />
                    </button>
                </div>
            </div>
        </main>
    );
}
