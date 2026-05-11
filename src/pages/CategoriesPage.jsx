import CategoryCard from '../components/ui/CategoryCard';
import { useCategories } from '../utils/useCategories';

export default function CategoriesPage() {
    const { categories } = useCategories();

    return (
        <div className='max-w-3xl mx-auto flex flex-col justify-center items-center gap-6 py-10'>
            <h1 className='text-3xl font-semibold font-heading text-heading'>
                Meal Categories
            </h1>
            <div className='grid grid-cols-3 w-full gap-4'>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.idCategory}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
}
