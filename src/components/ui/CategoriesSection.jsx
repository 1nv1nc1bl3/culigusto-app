import { useCategories } from '../../utils/useCategories';
import Loader from './Loader';

export default function CategoriesSection() {
    const { categories, isCatLoading, isCatError } = useCategories();

    const featuredCats = (categories ?? []).slice(0, 6);

    if (isCatLoading) return <Loader />;
    if (isCatError) return <h2>Error fetching data!</h2>;

    return (
        <div className='w-full flex flex-col justify-center items-center gap-10'>
            <h1 className='text-3xl font-semibold font-heading text-heading'>
                Featured Food Categories
            </h1>
            <div className='grid grid-cols-3 w-full gap-4'>
                {featuredCats.map((category) => (
                    <div
                        key={category?.idCategory}
                        className='flex flex-col justify-stretch items-center gap-4 px-4 py-3 rounded-lg shadow-lg/40 shadow-heading bg-beige cursor-pointer'
                    >
                        <img
                            className='w-full'
                            src={category?.strCategoryThumb}
                            alt={category?.strCategory}
                        />
                        <h3 className='text-center capitalize'>
                            {category?.strCategory}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
