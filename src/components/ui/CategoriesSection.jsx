import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft, LuChevronRight, LuChevronLeft } from 'react-icons/lu';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useCategories } from '../../utils/useCategories';
import CategoryCard from './CategoryCard';
import Loader from './Loader';

export default function CategoriesSection() {
    const {
        categories,
        isCatLoading,
        isCatError,
        currentPage,
        setCurrentPage,
    } = useCategories();

    const carouselRef = useRef(null);

    // Carousel
    const itemsPerSlide = 6;
    const totalSlides = Math.ceil(categories.length / itemsPerSlide);
    const currentCategories = categories.slice(
        (currentPage - 1) * itemsPerSlide,
        currentPage * itemsPerSlide,
    );

    const pagesArray = Array.from({ length: totalSlides }, (_, i) => i + 1);

    function arrowsStyle() {
        return `min-w-[30px] h-[30px] md:min-w-[60px] md:h-[60px] grid place-items-center text-2xl md:text-4xl text-beige bg-primary cursor-pointer hover:opacity-60 transition duration-300`;
    }

    // Conditional rendering
    if (isCatLoading) return <Loader />;
    if (isCatError) return <h2>Error fetching data!</h2>;

    // Main render
    return (
        <div
            ref={carouselRef}
            className='w-full flex flex-col justify-center items-center gap-6'
        >
            <h2 className='text-3xl font-semibold font-heading text-heading'>
                Featured Food Categories
            </h2>
            <div className='flex justify-center items-center gap-8 min-h-[550px] md:min-h-[350px]'>
                <button
                    disabled={currentPage === 1}
                    onClick={() => {
                        carouselRef.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
                        setCurrentPage((prev) => prev - 1);
                    }}
                    className={arrowsStyle()}
                >
                    <MdKeyboardArrowLeft />
                </button>
                <div className='grid grid-cols-2 md:grid-cols-3 w-full gap-4'>
                    {currentCategories.map((category) => (
                        <CategoryCard
                            key={category.idCategory}
                            category={category}
                        />
                    ))}
                </div>
                <button
                    disabled={currentPage === totalSlides}
                    onClick={() => {
                        carouselRef.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
                        setCurrentPage((prev) => prev + 1);
                    }}
                    className={arrowsStyle()}
                >
                    <MdKeyboardArrowRight />
                </button>
            </div>

            {/* pagination */}
            {/* <div className='flex items-center gap-2'>
                <button
                    disabled={currentPage === 1}
                    onClick={() => {
                        carouselRef.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
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
                                carouselRef.current?.scrollIntoView({
                                    behavior: 'smooth',
                                });
                                setCurrentPage(page);
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
                    disabled={currentPage === totalSlides}
                    onClick={() => {
                        carouselRef.current?.scrollIntoView({
                            behavior: 'smooth',
                        });
                        setCurrentPage((prev) => prev + 1);
                    }}
                    className='cursor-pointer'
                >
                    <LuChevronRight />
                </button>
            </div> */}
            <Link
                to={'/categories'}
                className='relative w-fit mx-auto pb-2 leading-tight after:content-[""] after:absolute after:left-1/2 after:bottom-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0'
            >
                Explore All Categories
            </Link>
        </div>
    );
}
