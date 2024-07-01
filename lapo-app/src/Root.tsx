import { Routes, Route, HashRouter } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutUsPage } from './pages/AboutUs';
import { Contacts } from './pages/Contacts';
import { AllPetsPage } from './pages/Pets';
import { PersonalPage } from './pages/PersonalPage';
import { Cats } from './pages/Cats';
import { ErrorPage } from './pages/ErrorPage';
import { GamePage } from './pages/GamePage';
import { ScrollToTop } from './utils/scrollToTop';

export const Root = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutUsPage />} />
          <Route path='contacts' element={<Contacts />} />
          <Route path='pets'>
            <Route index element={<AllPetsPage />} />
            <Route path='cats' >
            <Route index element={<Cats />} />
            <Route path=':animalId' element={<PersonalPage />} />
            </Route>
          </Route>
          <Route path='game' element={<GamePage />} />

          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
