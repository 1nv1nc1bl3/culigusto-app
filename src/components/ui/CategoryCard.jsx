import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
    return (
        <Link
            to={`/category/${category.strCategory}`}
            className='flex flex-col justify-stretch items-center gap-4 rounded-lg shadow-lg/40 shadow-heading hover:shadow-lg/60 hover:shadow-text bg-beige transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 transition-all ease-linear'
        >
            <img
                className='w-full px-6 pt-4'
                src={category?.strCategoryThumb}
                alt={category?.strCategory}
            />
            <h2 className='text-center text-background capitalize w-full rounded-b-lg bg-heading px-4 py-2'>
                {category?.strCategory}
            </h2>
        </Link>
    );
}
