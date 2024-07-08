import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DropMenu } from './components/DropMenu';
import { SosForm } from './components/SosForm';
import { useContext } from 'react';
import { GlobalContext } from './context/GlobalContext';
import { Loader } from './components/Loader';

function App() {
  const { isSosFormOpen, isLoading } = useContext(GlobalContext);
  
  return (
    <div className="App">
      <div className="main-wrapper">
        <Header />
        <DropMenu />
        {isLoading && <Loader />}
        <main className="container">
        {isSosFormOpen && <SosForm /> }
          <Outlet />
      </main>
        </div>
      
      <Footer />
    </div>
  );
}

export default App;
