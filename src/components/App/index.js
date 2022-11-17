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
import MyDocuments from './MyDocuments';

// == Composant
function App() {
  const theme = localStorage.getItem('theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.toggle('dark');
      const headerButton = document.querySelector('#theme-switch-header');
      const menuButton = document.querySelector('#theme-switch-menu');
      headerButton.checked = true;
      menuButton.checked = true;
    }
  }, [])
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilisateur/:slug/mes-ordres-de-mission" element={<MyDocuments />} />
        <Route path="/utilisateur/:slug/mes-états-de-frais" element={<MyDocuments />} />
        <Route path="/utilisateur/:slug/mes-%C3%A9tats-de-frais" element={<MyDocuments />} />
        <Route path="/documents/:slug/nouveau" element={<Forms />} />
      </Routes>
      <script type="text/javascript" src="bootstrap-datetimepicker.de.js" charSet="UTF-8"></script>
    </div>
  );
}

// == Export
export default App;
