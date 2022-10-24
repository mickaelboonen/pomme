// == Import
import Header from './Header';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import './style.scss';
import MyOMs from './MyOMs';
import MyEFs from './MyEFs';
import OMForm from './OMForm';

// == Composant
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilisateur/:slug/mes-ordres-de-mission" element={<MyOMs />} />
        <Route path="/utilisateur/:slug/mes-états-de-frais" element={<MyEFs />} />
        <Route path="/documents/:slug/nouveau" element={<OMForm />} />
        <Route element={<div>Perdu</div>} />
      </Routes>
      <script type="text/javascript" src="bootstrap-datetimepicker.de.js" charSet="UTF-8"></script>
    </div>
  );
}

// == Export
export default App;
