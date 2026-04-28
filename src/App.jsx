import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MealPage from './pages/MealPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/meal/:id' element={<MealPage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
