import { useCategories } from '../../utils/useCategories';

export default function CategoriesSection() {
    const { categories, isCatLoading, isCatError } = useCategories();

    if (isCatLoading) return <h2>Loading...</h2>;
    if (isCatError) return <h2>Error fetching data!</h2>;

    return (
        <div className='grid grid-cols-4 w-full gap-4'>
            {categories.map((category) => (
                <div
                    key={category?.idCategory}
                    className='flex flex-col justify-center items-center gap-4 border p-4'
                >
                    <img
                        className='w-20'
                        src={category?.strCategoryThumb}
                        alt={category?.strCategory}
                    />
                    <h3 className='text-center capitalize'>
                        {category?.strCategory}
                    </h3>
                </div>
            ))}
        </div>
    );
}
