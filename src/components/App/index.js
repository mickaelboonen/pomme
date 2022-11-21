// == Import
import Header from './Header';
import Home from './Home';
import { Routes, Route } from "react-router-dom";
import './style.scss';
import { useEffect } from 'react';
import Forms from './Forms';
import MyDocuments from './MyDocuments';
import Gestionnaires from './Gestionnaire';
import DocValidationForm from './Gestionnaire/DocValidationForm';
import DocRefusalForm from './Gestionnaire/DocRefusal';
import MyAccount from './MyAccount';
import AddVehicle from './MyAccount/AddVehicle';

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
        <Route path="/gestionnaire/:slug/documents-a-signer" element={<Gestionnaires />} />
        <Route path="/gestionnaire/:slug/valider-un-document/:slug/:id" element={<DocValidationForm />} />
        <Route path="/gestionnaire/:slug/refuser-un-ordre-de-mission/:id" element={<DocRefusalForm />} />
        <Route path="/documents/:slug/nouveau" element={<Forms />} />
        <Route path="/utilisateur/:slug/mes-documents" element={<MyAccount />} />
        <Route path="/utilisateur/:slug/mes-documents/ajouter-un-vehicule" element={<AddVehicle />} />
        {/* TODO */}
        <Route path="/utilisateur/:slug/mes-documents/ajouter-un-v%C3%A9hicule" element={<AddVehicle />} />
        <Route path="/utilisateur/:slug/mes-%C3%A9tats-de-frais" element={<MyDocuments />} />
      </Routes>
      <script type="text/javascript" src="bootstrap-datetimepicker.de.js" charSet="UTF-8"></script>
    </div>
  );
}

// == Export
export default App;
