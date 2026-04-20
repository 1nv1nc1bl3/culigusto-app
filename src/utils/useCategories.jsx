import { useEffect, useState } from 'react';

export function useCategories() {
    const [categories, setCategories] = useState([]);
    const [isCatLoading, setIsCatLoading] = useState(true);
    const [isCatError, setIsCatError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchCategories = async () => {
            try {
                setIsCatLoading(true);
                const res = await fetch(
                    'https://www.themealdb.com/api/json/v1/1/categories.php',
                    { signal: controller.signal },
                );
                const data = await res.json();
                setCategories(data?.categories || []);
                // console.log(data?.categories);
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.log('Error:', error);
                setIsCatError(true);
            } finally {
                setIsCatLoading(false);
            }
        };
        fetchCategories();
        return () => controller.abort();
    }, []);

    return { categories, isCatLoading, isCatError };
}
