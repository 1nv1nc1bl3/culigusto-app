import { Link, useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuChevronRight, LuChevronLeft } from 'react-icons/lu';
import { useFetchCategory } from '../utils/useFetchCategory';
import { useCountries } from '../context/CountriesContext';
import MealCard from '../components/ui/MealCard';

export default function CategoryPage() {
    const { flagMap, isReady } = useCountries();
    const {
        loading,
        error,
        currentPageMeals,
        totalPages,
        pagesArray,
        currentPage,
        setCurrentPage,
        name,
    } = useFetchCategory();

    const navigate = useNavigate();

    const handleMealClick = (meal) => {
        navigate(`/meal/${meal.idMeal}`, {
            state: { from: `/category/${name}` },
        });
    };

    if (loading) return 'Loading...';
    if (error) return 'Sorry, there was an error loading category!';

    return (
        <main className='flex flex-col justify-start items-center min-h-screen gap-10'>
            <div className='p-20 flex flex-col justify-center items-center mx-auto min-w-3xl gap-10'>
                <div className='results w-full flex flex-col justify-center items-center gap-10'>
                    <div className='title-bar flex justify-between items-center w-full'>
                        <button
                            onClick={() => navigate('/')}
                            className='flex items-center gap-2 cursor-pointer'
                        >
                            <LuArrowLeft />
                            Back to Home
                        </button>

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
                                handleMealClick={handleMealClick}
                            />
                        ))}
                    </div>
                </div>

                {/* pagination */}
                {totalPages > 1 && (
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
                )}
            </div>
        </main>
    );
}
