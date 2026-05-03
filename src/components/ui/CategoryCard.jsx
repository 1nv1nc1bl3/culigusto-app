import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
    return (
        <div
            key={category?.idCategory}
            className='flex flex-col justify-stretch items-center gap-4 rounded-lg shadow-lg/40 shadow-heading bg-beige'
        >
            <img
                className='w-full px-6 pt-4'
                src={category?.strCategoryThumb}
                alt={category?.strCategory}
            />
            <Link
                to={`/category/${category.strCategory}`}
                className='text-center text-background capitalize w-full rounded-b-lg bg-heading px-4 py-2'
            >
                {category?.strCategory}
            </Link>
        </div>
    );
}
