import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import MealPage from './pages/MealPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<HomePage />} />
                <Route path='/category/:name' element={<CategoryPage />} />
                <Route path='/meal/:id' element={<MealPage />} />
                <Route path='/favorites' element={<FavoritesPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
