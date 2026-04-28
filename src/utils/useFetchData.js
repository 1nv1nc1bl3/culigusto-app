import { useEffect, useState } from 'react';

export function useFetchData(query = '') {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed.length < 3) return;

        const controller = new AbortController();
        const fetchMeals = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
                    { signal: controller.signal },
                );
                const data = await res.json();
                setMeals(data?.meals || []);
                // console.log(data?.meals);
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.log('Error:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMeals();
        return () => controller.abort();
    }, [query]);

    return { meals, isLoading, isError };
}
