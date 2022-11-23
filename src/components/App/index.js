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
import EditVehicle from './MyAccount/EditVehicle';
import RefusalNotification from './MyAccount/RefusalNotification';
import ELForm from './MyAccount/ELForm';
import TicketRequest from './MyAccount/TicketRequest';
import DAFC from './DAFC';
import EfControl from './DAFC/EfControl';
import EfValidation from './DAFC/EfValidation';
import OmToGFC from './DAFC/OmToGFC';
import Preferences from './MyAccount/Preferences';

// == Composant
function App() {
  const theme = localStorage.getItem('theme');
  const colorTheme = localStorage.getItem('color-theme');

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector(':root').classList.toggle('dark');
      const headerButton = document.querySelector('#theme-switch-header');
      const menuButton = document.querySelector('#theme-switch-menu');
      headerButton.checked = true;
      menuButton.checked = true;
    }
    if (colorTheme !== '') {
      document.documentElement.style = colorTheme;
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
        <Route path="/utilisateur/:slug/mes-documents/ajouter-un-véhicule" element={<AddVehicle />} />
        <Route path="/utilisateur/:slug/mes-documents/modifier-un-vehicule/:id" element={<EditVehicle />} />
        <Route path="/utilisateur/:slug/mes-documents/refus-de-mission" element={<RefusalNotification />} />
        <Route path="/utilisateur/:slug/mes-documents/état-liquidatif-à-signer" element={<ELForm />} />
        <Route path="/utilisateur/:slug/mes-documents/demander-un-déplacement/:id" element={<TicketRequest />} />
        <Route path="/utilisateur/:slug/mes-préférences" element={<Preferences />} />
        <Route path="/dafc/états-de-frais" element={<DAFC title="États de frais à valider"/>} />
        <Route path="/dafc/états-de-frais/contrôler/:id" element={<EfControl />} />
        <Route path="/dafc/états-de-frais/valider/:id" element={<EfValidation />} />
        <Route path="/dafc/ordres-de-mission" element={<DAFC title="Ordres de mission à contrôler"/>} />
        <Route path="/dafc/ordres-de-mission/saisir-un-ordre/:id" element={<OmToGFC />} />

        
        {/* TODO : Routes a supprimer lorsque j'aurai la réécriture d'url */}
        <Route path="/dafc/%C3%A9tats-de-frais" element={<DAFC title="États de frais à valider"/>} />
        <Route path="/utilisateur/:slug/mes-pr%C3%A9f%C3%A9rences" element={<Preferences />} />
        <Route path="/dafc/%C3%A9tats-de-frais/contr%C3%B4ler/:id" element={<EfControl />} />
        <Route path="/dafc/%C3%A9tats-de-frais/valider/:id" element={<EfValidation />} />
        <Route path="/dafc/ordres-de-mission" element={<DAFC title="Ordres de mission à contrôler" />} />
        <Route path="/dafc/ordres-de-mission/saisir-un-ordre/:id" element={<OmToGFC />} />
        <Route path="/utilisateur/:slug/mes-documents/ajouter-un-v%C3%A9hicule" element={<AddVehicle />} />
        <Route path="/utilisateur/:slug/mes-documents/modifier-un-v%C3%A9hicule/:id" element={<EditVehicle />} />
        <Route path="/utilisateur/:slug/mes-documents/%C3%A9tat-liquidatif-%C3%A0-signer" element={<ELForm />} />
        <Route path="/utilisateur/:slug/mes-documents/demander-un-d%C3%A9placement/:id" element={<TicketRequest />} />
        <Route path="/utilisateur/:slug/mes-%C3%A9tats-de-frais" element={<MyDocuments />} />
      </Routes>
      <script type="text/javascript" src="bootstrap-datetimepicker.de.js" charSet="UTF-8"></script>
    </div>
  );
}

// == Export
export default App;
