import MealCard from '../components/ui/MealCard';
import { useFavorites } from '../context/FavoritesContext';
import { useCountries } from '../context/CountriesContext';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    // const { favorites, toggleFavorite } = useFavorites();
    const { flagMap, isReady } = useCountries();
    // const isFavorite =
    //     favorites?.some((fav) => fav.idMeal === singleMeal.idMeal) ?? false;

    return (
        <div className='favorites min-h-screen p-10 flex flex-col gap-4'>
            {favorites.length > 0 && isReady
                ? favorites.map((item) => (
                      <div
                          key={item.idMeal}
                          meal={item}
                          className='flex gap-4 bg-beige'
                      >
                          <img
                              className='w-50 h-auto object-cover'
                              src={item.strMealThumb}
                              alt={item.strMeal}
                          />
                          <div className='card-title w-full flex flex-col justify-between items-stretch gap-4 py-4'>
                              <div className='flex flex-col gap-2 justify-start items-start'>
                                  <span className='uppercase bg-primary px-2 w-auto rounded-md text-beige text-base/6'>
                                      {item.strCategory}
                                  </span>
                                  <Link to={`/meal/${item.idMeal}`}>
                                      <h3 className='text-heading font-semibold text-xl text-base/5'>
                                          {item.strMeal}
                                      </h3>
                                  </Link>
                              </div>

                              <div className='flex items-center gap-2 mt-1'>
                                  {isReady && flagMap[item.strArea] && (
                                      <img
                                          src={flagMap[item.strArea]}
                                          alt={item.strArea}
                                          className='h-6 w-8 object-cover rounded-sm shadow-sm'
                                      />
                                  )}
                                  <span className='text-md text-primary'>
                                      {item.strArea}
                                  </span>
                                  {/* <button
                                      onClick={() => toggleFavorite(singleMeal)}
                                      className='text-2xl cursor-pointer transition'
                                  >
                                      {isFavorite ? (
                                          <div className='flex items-center cursor-pointer'>
                                              <span className='text-sm text-text transition duration-300'>
                                                  Already a Favorite
                                              </span>
                                              <span>❤️</span>
                                          </div>
                                      ) : (
                                          <div className='flex items-center'>
                                              <span className='text-sm text-text hover:opacity-80 transition cursor-pointer'>
                                                  Add to Favorites
                                              </span>
                                              <span>🤍</span>
                                          </div>
                                      )}
                                  </button> */}
                              </div>
                          </div>
                      </div>
                  ))
                : `You don't have any favorite meals yet.`}
        </div>
    );
}
