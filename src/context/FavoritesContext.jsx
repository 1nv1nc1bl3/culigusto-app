import { createContext, useState, useEffect, useContext } from 'react';

const STORAGE_KEY = 'culigusto:favorites';

function loadFavorites() {
    // if the key doesn't exist yet, return an empty array as the default value
    if (!localStorage.getItem(STORAGE_KEY)) return [];
    try {
        // parse stored JSON string into JS value
        // if it returns a falsy value, fall back to an empty array
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        // if value not a valid JSON, return empty array
        return [];
    }
}

// context object
const FavoritesContext = createContext(null);

// Custom hook
export function useFavorites() {
    const ctx = useContext(FavoritesContext);
    if (!ctx) {
        throw new Error(
            'useFavorites must be used within a FavoritesContext.Provider',
        );
    }
    return ctx;
}

// Provider
export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => loadFavorites());

    // sync the favorites state to localStorage whenever favorites changes (dependency array)
    useEffect(() => {
        // convert the favorites array into a JSON string and store in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    function toggleFavorite(meal) {
        setFavorites((prev) => {
            const exists = prev.some((fav) => fav.idMeal === meal.idMeal);
            return exists
                ? prev.filter((fav) => fav.idMeal !== meal.idMeal)
                : [...prev, meal];
        });
    }

    const value = { favorites, toggleFavorite };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}
