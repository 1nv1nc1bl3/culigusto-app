import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
    return (
        <section className='full-app-page tracking-wide leading-relaxed font-body bg-background'>
            <div className='app-container mx-auto min-h-dvh w-full'>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </section>
    );
}
