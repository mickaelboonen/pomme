// == Import
import Header from './Header';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import './style.scss';
import MyOMs from './MyOMs';
import MyEFs from './MyEFs';
import OMForm from './OMForm';
import { useEffect } from 'react';
import Forms from './Forms';

// == Composant
function App() {
  const theme = localStorage.getItem('theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.toggle('dark');
      const button = document.querySelector('#theme-preferences');
      button.checked = true;
    }
  }, [])
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilisateur/:slug/mes-ordres-de-mission" element={<MyOMs />} />
        <Route path="/utilisateur/:slug/mes-états-de-frais" element={<MyEFs />} />
        <Route path="/documents/:slug/nouveau" element={<Forms />} />
        <Route element={<div>Perdu</div>} />
      </Routes>
      <script type="text/javascript" src="bootstrap-datetimepicker.de.js" charSet="UTF-8"></script>
    </div>
  );
}

// == Export
export default App;
