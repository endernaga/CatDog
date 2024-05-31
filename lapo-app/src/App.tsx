import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="App">
      <div className="main-wrapper">
      <Header />
        <main className="container">
          <Outlet />
      </main>
        </div>
      
      <Footer />
    </div>
  );
}

export default App;
