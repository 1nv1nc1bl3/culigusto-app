import { NavLink } from 'react-router-dom';
export default function Navbar() {
    return (
        <div>
            <NavLink to='/'>Home</NavLink>
            <NavLink
                to='/temp'
                className={({ isActive }) => (isActive ? 'active' : '')}
            >
                About
            </NavLink>
        </div>
    );
}
