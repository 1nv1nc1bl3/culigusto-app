import { useEffect, useState } from 'react';

export default function useRandomMeal() {
    const [randomMeal, setRandomMeal] = useState({});
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchRandomMeal = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://www.themealdb.com/api/json/v1/1/random.php`,
                    { signal: controller.signal },
                );
                const mealData = await res.json();

                setRandomMeal(mealData?.meals[0] || {});
            } catch (error) {
                if (error.name === 'AbortError') return;
                console.log('Error:', error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchRandomMeal();
        return () => controller.abort();
    }, []);

    return { loading, isError, randomMeal };
}
