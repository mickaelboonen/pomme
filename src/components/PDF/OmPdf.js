import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';
import { PDFDocument, StandardFonts, PDFPage } from 'pdf-lib';

import Test from 'src/assets/docs/old-pdf/ef.pdf'

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';

import { streetType } from 'src/data/addressData';

// Selectors
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';

Font.register({ family: 'Radjhani', src: RadjhaniFont });

import { styles } from './pdfStyles';

const OmPdf = ({ data, agent, vehicleTypes, agentSignature, countries}) => {
  
  const {mission, transports, accomodations, advance, more} = data;
  
  const dep = new Date(mission.departure);
  const ret = new Date(mission.comeback);
  
  // Transports
  let chosenVehicleType = {};

  if (transports.authorizations.length > 0) {
    
    const { type } = transports.authorizations[0];

    if (type === 'personal-car') {
      chosenVehicleType = vehicleTypes.find((v) => v.id === 0);
    }
    else if (type === 'company-car') {
      chosenVehicleType = vehicleTypes.find((v) => v.id === 2);
    }
    else if (type === 'rent-car') {
      chosenVehicleType = vehicleTypes.find((v) => v.id === 3);
    }
  }

  let planeData = {};
  let trainData = {}; 
  if (transports.transport_type.length > 0) {
    transports.transport_type.forEach((type) => {
      if (type === "train") {
        trainData.class = transports.transport_class.find((trainClass) => trainClass.includes('second') || trainClass.includes('first') )
        trainData.payment = transports.transport_payment.find((trainPayment) => trainPayment.includes('train') )
      }
      if (type === "plane") {
        planeData.class = transports.transport_class.find((trainClass) => trainClass.includes('business') || trainClass.includes('eco') )
        planeData.payment = transports.transport_payment.find((trainPayment) => trainPayment.includes('plane') )
      }
    })
  }

  
  const otherMeansofTransports = [];
  if (transports.taxi) {
    otherMeansofTransports.push('taxi');
  }
  if (transports.ferry) {
    otherMeansofTransports.push('ferry');
  }
  if (transports.parking) {
    otherMeansofTransports.push('parking');
  }
  if (transports.toll) {
    otherMeansofTransports.push('péage');
  }

  let missionCountries = [];
  mission.addresses.forEach((country) => missionCountries.push(countries.find((countryFromList) => countryFromList.code === country.countryCode)));
  missionCountries = missionCountries.map((country) => country.name);

  
  const maxMealsNumber = getMaxMealsAndNights(mission);
  const freeMeals = maxMealsNumber - (accomodations.meals_paid_by_agent + accomodations.meals_in_admin_restaurants);
  
  const gestArray = ['%', 'UB', 'CR', 'Code Nacres', 'Code LOLF', 'Code Analytique'];
// console.log(mission);



  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>ORDRE DE MISSION</Text>
      </View>
      <View style={[styles.section, {marginTop: '20'}]}>
        <Text>Ordre de Mission : {data.is_ponctual ? 'PONCTUEL' : 'PERMANENT'}</Text>
        {data.expenses && (
          <Text>Avec frais pris en charge par Unîmes, à transmettre au service financier après visa du service supportant la dépense.</Text>
        )}
        {!data.expenses && (
          <Text>Sans frais, notamment pris en charge par un organisme extérieur, à transmettre à la DRH.</Text>
        )}
      </View>
      <View style={styles.section} wrap={false}>
          <Text style={styles.section.title}>SERVICE OU DÉPARTEMENT</Text>
          <View style={{display: 'flex', width: '100%', flexDirection: 'row', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a'}}>
            {gestArray.map((cat) => (
              <View key={cat} style={[styles.section.gest, { width: '17%', display: 'block'}]}>
                <View style={{fontWeight: 800, textAlign: 'center', backgroundColor: '#c1c1c1'}}>
                  <Text>{cat}</Text>
                </View>
                <View style={{borderTop: '1px solid #1a1a1a'}}>
                  <Text style={{ textAlign: 'center', minHeight: 16}}></Text>
                </View>
                <View style={{borderTop: '1px solid #1a1a1a'}}>
                  <Text style={{ textAlign: 'center', minHeight: 16}}></Text>
                </View>
              </View>
            ))}

          </View>

      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>MISSIONNAIRE</Text>
        <Text style={styles.section.text}>Qualité : {agent.gender} {agent.lastname.toUpperCase()} {agent.firstname}</Text>
        <Text style={styles.section.text}>Statut : {agent.unimesStatus} de catégorie {agent.unimesCategory}</Text>
        <Text style={styles.section.text}>Service / Département : {agent.unimesDepartment}</Text>
        <Text style={styles.section.subtitle}>Adresses du missionnaire :</Text>
        <View style={styles.section.subsection}>
          <Text style={styles.section.text}>Adresse familiale : {agent.streetNumber} {agent.bis} {streetType.find((type) => agent.streetType === type.id).name} {agent.streetName} {agent.postCode} {agent.city}</Text>
          <Text style={styles.section.text}>Adresse administrative : Université de Nîmes {agent.streetNumberPro} {agent.bisPro} {streetType.find((type) => agent.streetTypePro === type.id).name} {agent.streetNamePro} {agent.postCodePro} {agent.cityPro}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>MISSION</Text>
        <Text style={styles.section.text}>Motif de la mission : {mission.mission_purpose}</Text>
        {mission.region === 'dom-tom' && (
          <Text>Mission dans les DOM-TOM avec un forfait {mission.abroad_costs === "per-diem" ? 'per diem' : 'frais réels'}</Text>
        )}
        {mission.region === 'étranger' && (
          <>
            <Text>Mission avec un forfait {mission.abroad_costs === "per-diem" ? 'per diem' : 'frais réels'} dans le{missionCountries.length > 1 ? 's' : ''} pays : {missionCountries.map((country) => country + ' ')}</Text>
            <Text>Le Compte rendu est à fournir au retour de la mission si financement RI.</Text>
          </>
        )}
        <Text style={styles.section.text} />
        <Text style={styles.section.subtitle}>Modalités de la mission :</Text>
        <View style={styles.section.subsection}>
            <Text style={styles.section.text}>DÉBUT DE LA MISSION</Text>
            <Text style={[styles.section.text, {paddingLeft: '10'}]}>Date et heure : {dep.toLocaleString()}</Text>
            <Text style={[styles.section.text, {paddingLeft: '10'}]}>Lieu de départ : {mission.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          {/* <View style={styles.separator} /> */}
            <Text style={[styles.section.text, {marginTop: '8'}]}>ÉTAPES DE LA MISSION</Text>
          {mission.addresses.map((address) => (
            <Text style={[styles.section.text, {paddingLeft: '10'}]} key={address.streetName}>
              Adresse n° {mission.addresses.indexOf(address) + 1} : {address.streetNumber === 0 ? '' : address.streetNumber} {address.bis} {streetType.find((type) => address.streetType === type.id).name} {address.streetName} {address.postCode} {address.city}
            </Text>
          ))}
          {mission.planning && (
            <>
              <Text style={[styles.section.text, {marginTop: '8'}]}>PLANNING DE LA MISSION</Text>
              <Text style={[styles.section.text, {paddingLeft: '10'}]}>{mission.planning}</Text>
            </>
          )}
          {/* <View style={styles.separator} /> */}
          <Text style={[styles.section.text, {marginTop: '8'}]}>FIN DE LA MISSION</Text>
          <Text style={[styles.section.text, {paddingLeft: '10'}]}>Date et heure : {ret.toLocaleString()}</Text>
          <Text style={[styles.section.text, {paddingLeft: '10'}]}>Lieu d'arrivée : {mission.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
        </View>
        
        <Text style={styles.section.text} />
      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>TRANSPORTS</Text>
        {trainData.hasOwnProperty('class') && (
          <Text>Train : Voyage en {trainData.class === 'second-class' ? 'deuxième classe' : 'première classe'}, {trainData.payment.includes('agent') ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {planeData.hasOwnProperty('class') && (
          <Text>Avion : Voyage en {planeData.class === 'business-class' ? 'classe affaire' : 'classe éco'}, {planeData.payment.includes('user') ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {chosenVehicleType.hasOwnProperty('name') && (
          <>
            <Text>Vehicule : {chosenVehicleType.name}{chosenVehicleType.name.includes('personnel') ? `, immatriculé ${transports.authorizations[0].vehicle.license_plate}` : '.'}</Text>
            {chosenVehicleType.name.includes('personnel') && <Text>Remboursement Forfait SNCF 2ème classe.</Text>}
          </>
        )}
        <Text style={styles.section.text} />
        <Text style={styles.section.text} />
        <Text>Utilisation de transports en commun : {transports.public_transports ? 'Oui.' : 'Non.'}</Text>
        {otherMeansofTransports.length > 0 && <Text style={styles.section.text}>Autres moyens de transports / commodités : {otherMeansofTransports.map((other) => other.replace(other[0], other[0].toUpperCase()) + '. ')}</Text>}
      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>HÉBERGEMENT ET REPAS</Text>
        {accomodations.hotel && (
          <Text style={styles.section.text}>Hotel : {accomodations.nights_number} nuits, {accomodations.hotel_payment === 'unimes' ? 'payé par Unîmes.' : "avancé par l'agent."}</Text>
        )}
        {!accomodations.hotel && (
          <Text style={styles.section.text}>Pas d'hotel pour la durée de la mission.</Text>
        )}
        <Text>Repas :</Text>
        <Text style={{textIndent: '10'}}>- {freeMeals} repas gratuit{freeMeals > 1 ? 's' : '' }</Text>
        <Text style={{textIndent: '10'}}>- {accomodations.meals_in_admin_restaurants} repas en restaurant administratif</Text>
        <Text style={{textIndent: '10'}}>- {accomodations.meals_paid_by_agent} repas autres</Text>
      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>AVANCE</Text>
        <Text style={styles.section.text}>Demande d'avance : {advance.advance_amount > 0 ? advance.advance_amount + '€' : advance.unknown_amount ? 'En attente de calcul par le service financier.' : 'Non.'}</Text>
      </View>
      {(more.informations && more.informations.length > 0) && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title}>AUTRES</Text>
          <Text style={styles.section.text}>{more.informations}</Text>
        </View>
      )}
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>SIGNATURE</Text>
        <View style={[{ display: 'flex', flexDirection: 'row'}]}>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {new Date().toLocaleDateString()}</Text>
            <Text style={{fontSize: 10}}>Signature de l'agent.e</Text>
            <Image source={agentSignature} style={styles.signature} />
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {''}</Text>
            <Text style={{fontSize: 10}}>Signature du.de la directeur.rice de département ou du.de la chef.fe de service</Text>
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {''}</Text>
            <Text style={{fontSize: 10}}>Signature de l'ordonnateur.rice (Président, DGS, VP)</Text>
          </View>
        </View>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      {mission.mission_purpose_file.map((file) => <Image src={file} />)}
      {/* <Image src={mission.mission_purpose_file} /> */}
    </Page>
  </Document>
);}

OmPdf.propTypes = {

};

export default OmPdf;
