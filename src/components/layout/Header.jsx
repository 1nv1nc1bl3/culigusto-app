import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/images/logo.png';
// import Navbar from './Navbar';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHome = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header className='bg-heading w-full px-8 bg-heading'>
                <div className='header-container flex justify-between items-center max-w-6xl mx-auto'>
                    {/* Logo */}
                    <div className='logo-container flex items-center min-h-[50px]'>
                        <Link
                            to='/'
                            className='flex flex-row justify-start items-center gap-2'
                        >
                            <img src={logo} alt='CuliGusto' className='w-8' />
                            <span className='text-beige'>CuliGusto</span>
                        </Link>
                    </div>

                    {/* Hamburger button */}
                    <button
                        className='menu-icon'
                        onClick={() => setMenuOpen(true)}
                    >
                        <Menu size={30} className='text-beige' />
                    </button>
                </div>
            </header>

            {/* Mobile overlay menu */}
            <div
                className={`fixed left-auto inset-0 z-[100] bg-beige flex flex-col items-center justify-center transition-all duration-300 min-w-lg
                ${
                    menuOpen
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-400 pointer-events-none'
                }`}
            >
                {/* Close button */}
                <button
                    className='absolute top-8 right-6'
                    onClick={() => setMenuOpen(false)}
                >
                    <X size={26} />
                </button>

                {/* Navigation */}
                <nav className='mobile-menu-inner flex flex-col items-center gap-12'>
                    <img
                        src={logo}
                        alt='Alkis Logo'
                        className='w-40 rounded-full p-4'
                    />
                    <div className='mobile-nav-links flex flex-col items-center gap-12 text-2xl uppercase tracking-widest'>
                        <NavLink
                            to='/'
                            className='capitalize'
                            onClick={handleHome}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/favorites'
                            onClick={() => setMenuOpen(false)}
                            className='capitalize'
                        >
                            Favorites
                        </NavLink>
                    </div>
                </nav>
            </div>
        </>
    );
}
