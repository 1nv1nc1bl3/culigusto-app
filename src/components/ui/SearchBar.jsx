function SearchBar({ query, setQuery }) {
    return (
        <div className='search-input w-full flex justify-center'>
            <input
                type='text'
                placeholder='Search for a recipe...'
                className='border border-2 outline-none border-primary rounded-md p-4'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}
export default SearchBar;
