import { useEffect, useState } from 'react';
import { AppContent } from '../app-content';
import { AppHeader } from '../app-header';
import './app.module.css';
import { Page } from '../../types/types';

function App() {
    const [activePage, setActivePage] = useState<Page>(Page.CONSTRUCTOR);

    useEffect(() => {
        setActivePage(Page.CONSTRUCTOR);
    }, []);

    return (
        <>
            <AppHeader activePage={activePage} />
            <AppContent />
        </>
    );
}

export default App;
