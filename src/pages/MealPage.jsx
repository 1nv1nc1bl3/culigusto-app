import useSingleMeal from '../utils/useSingleMeal';

export default function MealPage() {
    const {
        navigate,
        location,
        toggleFavorite,
        isFavorite,
        singleMeal,
        loading,
        isError,
        ingredients,
        embeddedVideo,
        externalLink,
    } = useSingleMeal();

    // Conditional rendering
    if (loading) return <h2>Loading...</h2>;
    if (isError) return <h2>Error fetching data!</h2>;

    // Main render
    return (
        <div className='min-h-screen bg-background text-text px-4 md:px-16 lg:px-24 xl:px-32 py-10'>
            {/* Action Bar */}
            <div className='flex items-center justify-between mb-6'>
                {/* Back Button */}
                <button
                    className='text-md text-primary hover:opacity-80 transition cursor-pointer'
                    onClick={() => navigate(location.state?.from || '/')}
                >
                    ← Back
                </button>

                {/* Favorite Button */}
                <button
                    onClick={() => toggleFavorite(singleMeal)}
                    className='text-md cursor-pointer transition'
                >
                    {isFavorite ? (
                        <div className='flex items-center cursor-pointer'>
                            <span className='text-md text-text transition duration-300'>
                                Already a Favorite
                            </span>
                            <span className='text-2xl'>❤️</span>
                        </div>
                    ) : (
                        <div className='flex items-center'>
                            <span className='text-md text-text hover:opacity-80 transition cursor-pointer'>
                                Add to Favorites
                            </span>
                            <span className='text-2xl'>🤍</span>
                        </div>
                    )}
                </button>
            </div>

            {/* Meal Title */}
            <h1 className='text-3xl md:text-5xl font-heading text-heading mb-6'>
                {singleMeal?.strMeal}
            </h1>

            {/* Hero / Featured Image */}
            <div className='rounded-2xl overflow-hidden mb-8 border border-black/10'>
                <img
                    src={singleMeal?.strMealThumb}
                    alt={singleMeal?.strMeal}
                    className='w-full h-[300px] md:h-[450px] object-cover'
                />
            </div>

            {/* Meta Info */}
            <div className='flex gap-2 mb-8 text-sm'>
                <button
                    onClick={() => navigate(location.state?.from || '/')}
                    className='px-3 py-1 rounded-full bg-beige text-heading cursor-pointer'
                >
                    {singleMeal?.strCategory}
                </button>
                <span className='px-3 py-1 rounded-full bg-beige text-heading'>
                    {singleMeal?.strArea}
                </span>
            </div>

            {/* Instructions */}
            <div className='mb-10'>
                <h2 className='text-2xl font-body mb-3 text-heading'>
                    Instructions
                </h2>
                <p className='text-md leading-relaxed text-text/80 whitespace-pre-line'>
                    {singleMeal?.strInstructions}
                </p>
            </div>

            {/* Ingredients & Video */}
            <div className='bg-beige/30 rounded-2xl p-6 flex justify-between items-stretch'>
                <div className='ingredients-container'>
                    <h2 className='text-2xl font-body mb-4 text-heading'>
                        Ingredients
                    </h2>

                    <div className='text-sm text-text/70'>
                        <table className='table-auto md:table-fixed border-spacing-[7px] border-collapse'>
                            <thead>
                                <tr className=''>
                                    <th className='text-md font-semibold text-left text-heading'>
                                        Ingredient
                                    </th>
                                    <th className='text-md font-semibold text-left text-heading'>
                                        Measurement
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((item) => (
                                    <tr key={item.ingredient} className=''>
                                        <td className='text-md pr-8'>
                                            {item.ingredient}
                                        </td>
                                        <td className='text-md'>
                                            {item.measure}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {embeddedVideo && (
                    <div className='video-container w-[50%] flex flex-col justify-start items-start'>
                        <h2 className='text-2xl font-body mb-4 text-heading'>
                            Video
                        </h2>
                        <p className='w-full h-full flex flex-col justify-start align-center text-center'>
                            <iframe
                                className='aspect-video'
                                src={embeddedVideo}
                                allowFullScreen
                                title={singleMeal.strMeal}
                            />
                        </p>
                    </div>
                )}
            </div>

            {/* External Source */}
            {singleMeal.strSource && (
                <div className='source-container mt-8'>
                    <p className='flex justify-start items-center gap-2'>
                        <span>View this recipe at:</span>
                        <a href={singleMeal.strSource} target='_blank'>
                            {externalLink}
                        </a>
                    </p>
                </div>
            )}
        </div>
    );
}
