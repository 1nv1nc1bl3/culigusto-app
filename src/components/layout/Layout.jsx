import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Footer from '../ui/Footer';

export default function Layout() {
    return (
        <section className='full-app-page tracking-wide leading-relaxed font-body bg-background'>
            <div className='app-container mx-auto min-h-dvh w-full'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </section>
    );
}
