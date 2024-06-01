import { Routes, Route, HashRouter } from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { AboutUsPage } from './pages/AboutUs';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutUsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
