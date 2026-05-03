import heroImg from '../../assets/images/hero.jpg';

export default function Hero() {
    return (
        <section
            className='relative w-full min-h-[35rem] sm:min-h-[37rem] md:min-h-[39rem] flex items-center justify-center'
            style={{
                backgroundImage: `url(${heroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
            }}
        >
            <div className='absolute inset-0 bg-black/50' />

            <div className='relative z-10 text-center text-white px-4'>
                <h1 className='mb-4 text-3xl sm:text-4xl md:text-5xl font-normal'>
                    Dive in a world of recipes
                    <br /> from all over the world
                </h1>

                {/* to be filled with an app description */}
                <p className='max-w-xl mx-auto text-sm sm:text-base leading-relaxed'>
                    <span className='text-teal-300'></span>
                </p>
                {/* Photo by <a href="https://unsplash.com/@jaywennington?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jay Wennington</a> on <a href="https://unsplash.com/photos/dish-on-white-ceramic-plate-N_Y88TWmGwA?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                 */}
            </div>
        </section>
    );
}
