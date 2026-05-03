import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const linkBase = 'text-lg font-medium transition hover:text-background';
    const getLinkClass = ({ isActive }) =>
        `${linkBase} ${isActive ? 'text-beige' : 'text-slate-100'}`;

    return (
        <nav className='flex items-center gap-6'>
            <NavLink to='/' className={getLinkClass}>
                Home
            </NavLink>
            <NavLink to='/favorites' className={getLinkClass}>
                Favorites
            </NavLink>
        </nav>
    );
}
