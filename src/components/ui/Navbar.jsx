import { NavLink } from 'react-router-dom';
export default function Navbar() {
    return (
        <div className='flex justify-between items-center bg-slate-400'>
            <div>
                <img src='#' alt='' />
            </div>
            <div>
                <NavLink
                    to='/'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Home
                </NavLink>
                <NavLink
                    to='/favorites'
                    className={({ isActive }) => (isActive ? 'active' : '')}
                >
                    Favorites
                </NavLink>
            </div>
        </div>
    );
}
