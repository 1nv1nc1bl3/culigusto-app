import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function useFetchCategory() {
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

    return {
        loading,
        error,
        currentPageMeals,
        totalPages,
        pagesArray,
        currentPage,
        setCurrentPage,
        name,
    };
}
