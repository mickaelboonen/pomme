// == Import
import Header from './Header';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import './style.scss';
import MyOMs from './MyOMs';
import MyEFs from './MyEFs';

// == Composant
function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utilisateur/:slug/mes-ordres-de-mission" element={<MyOMs />} />
        <Route path="/utilisateur/:slug/mes-états-de-frais" element={<MyEFs />} />

      </Routes>
    </div>
  );
}

// == Export
export default App;
