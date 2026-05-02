import { createContext, useState, useEffect, useContext } from 'react';

const MEALDB_COUNTRIES =
    'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const REST_COUNTRIES = 'https://restcountries.com/v3.1/all?fields=name,flags';

// context object
const CountriesContext = createContext(null);

// Custom hook
export function useCountries() {
    const ctx = useContext(CountriesContext);
    if (!ctx) {
        throw new Error(
            'useCountries must be used within a CountriesContext.Provider',
        );
    }
    return ctx;
}

// Provider
export function CountriesProvider({ children }) {
    const [isReady, setIsReady] = useState(false);
    const [flagMap, setFlagMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const fetchCountries = async () => {
            try {
                setLoading(true);
                const [countriesData, flagsData] = await Promise.all([
                    fetch(MEALDB_COUNTRIES, { signal: controller.signal }).then(
                        (res) => res.json(),
                    ),
                    fetch(REST_COUNTRIES, { signal: controller.signal }).then(
                        (res) => res.json(),
                    ),
                ]);

                const countryToFlag = {};
                flagsData.forEach((country) => {
                    countryToFlag[country.name.common] = country.flags.svg;
                });

                const flagMap = {};
                countriesData.meals.forEach((item) => {
                    flagMap[item.strArea] = countryToFlag[item.strCountry];
                    flagMap[item.strCountry] = countryToFlag[item.strCountry];
                });

                console.log(flagMap);
                setFlagMap(flagMap);
                setIsReady(true);
            } catch (error) {
                if (error.name === 'AbortError') return;
                setHasError(true);
                console.log('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();

        return () => controller.abort();
    }, []);

    const value = { flagMap, isReady, loading, hasError };

    return (
        <CountriesContext.Provider value={value}>
            {children}
        </CountriesContext.Provider>
    );
}
