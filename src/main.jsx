import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { CountriesProvider } from './context/CountriesContext';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
    <CountriesProvider>
        <FavoritesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FavoritesProvider>
    </CountriesProvider>,
);
