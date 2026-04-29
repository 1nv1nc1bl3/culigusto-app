import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';

export default function Layout() {
    return (
        <section className='full-app-page tracking-wide leading-relaxed'>
            <div className='app-container mx-auto min-h-dvh min-w-full'>
                <Navbar />
                <Outlet />
            </div>
        </section>
    );
}
