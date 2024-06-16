import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DropMenu } from './components/DropMenu';

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
        <Header />
        <DropMenu />
        <main className="container">
          <Outlet />
      </main>
        </div>
      
      <Footer />
    </div>
  );
}

export default App;
