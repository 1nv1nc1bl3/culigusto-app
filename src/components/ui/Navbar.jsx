import { NavLink } from 'react-router-dom';
export default function Navbar() {
    const linkBase = 'text-sm font-medium transition hover:text-teal-300';
    const getLinkClass = ({ isActive }) =>
        `${linkBase} ${isActive ? 'text-beige' : 'text-slate-100'}`;

    return (
        <header className='flex justify-between items-center bg-heading min-h-[50px] w-full px-8 bg-heading'>
            <div className='logo-container'>
                <img src='#' alt='CuliGusto' className='text-white' />
            </div>
            <nav className='flex items-center gap-6'>
                <NavLink to='/' className={getLinkClass}>
                    Home
                </NavLink>
                <NavLink to='/favorites' className={getLinkClass}>
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}
