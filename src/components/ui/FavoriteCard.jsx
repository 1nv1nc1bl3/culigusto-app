import { Link } from 'react-router-dom';

export default function FavoriteCard({
    item,
    isReady,
    flagMap,
    toggleFavorite,
}) {
    return (
        <div key={item.idMeal} meal={item} className='flex bg-beige'>
            <img
                className='w-50 h-auto object-cover'
                src={item.strMealThumb}
                alt={item.strMeal}
            />
            <div className='card-title w-full flex flex-col justify-between items-stretch gap-4 px-4 py-4'>
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

                <div className='flex justify-between items-center'>
                    <div className='flex gap-4'>
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
                    </div>
                    <button
                        onClick={() => toggleFavorite(item)}
                        className='px-4 py-1 text-white text-sm border border-heading rounded-md bg-heading hover:bg-beige hover:border-text hover:text-text transition-all duration-300 cursor-pointer'
                    >
                        Remove favorite
                    </button>
                </div>
            </div>
        </div>
    );
}
