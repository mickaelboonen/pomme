import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';

import { streetType } from 'src/data/addressData';

// Selectors
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';

Font.register({ family: 'Radjhani', src: RadjhaniFont });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    fontSize:10,
    fontFamily: 'Radjhani',
    marginTop: 20,
    marginBottom: 20,
  },
  signature: {
    // maxWidth: 100,
    // height: 100,
  },
  firstSection: {
    padding: 10,
  },
  flexSection: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #1a1a1a',
  },
  halfSection: {
    width: '50%',
    padding:'0 8 8',
    // border: '1px solid red'
  },
  separator: {
    border: '1px solid #1a1a1a'
  },
  section: {
    margin: '0 10',
    // marginTop: 0,
    padding: '0 10 10',
    title: {
      fontSize: 14,
      border: '1px solid #1a1a1a',
      backgroundColor: '#c1c1c1',
      fontWeight: 'bold',
      padding:'8',
      marginBottom: '8'
    },
    subsection: {
      border: '1px solid #1a1a1a',
      padding:'8'
    },
    text: {
      marginBottom: '4',
    },
    longtext: {
      width: '60%',
      color: 'red'
    },
    notabene: {
      color: '#111',
      fontSize: '8',
      marginBottom: '4',
    },
    gest: {
      display: 'flex',
      borderTop: '1px solid #1a1a1a',
      borderLeft: '1px solid #1a1a1a',
      flexDirection: 'row',
      first: {
        width: '50%',
        backgroundColor: '#c1c1c1',
      },
      second: {
        width: '50%',
        backgroundColor: '#ff00ff',
      }
    }
    
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    image: {
      width: '40%',
    },
    title: {
      width: '50%',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center'

    }
  }
});

console.log(styles.section.gest);

const EfPdf = ({ data, agent, agentSignature}) => {

  const { mission, transports, accomodations } = data;
  
  const dep = new Date(mission.departure);
  const ret = new Date(mission.comeback);
    
  const maxMealsNumber = getMaxMealsAndNights(mission);
  const freeMeals = maxMealsNumber - (accomodations.meals_paid_by_agent + accomodations.meals_in_admin_restaurants);

  const transportsExpenses = [
    {
      name: 'Moyen de transport',
      amount: 'Montant',
    },
    {
      name: 'Avion',
      amount: transports.plane,
    },
    {
      name: 'Train',
      amount: transports.train,
    },
    {
      name: 'Transports en public',
      amount: transports.public_transports,
    },
  ]
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>ÉTAT DE FRAIS</Text>
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
      
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>MISSIONNAIRE</Text>
        <Text style={styles.section.text}>Qualité : {agent.gender} {agent.lastname.toUpperCase()} {agent.firstname}</Text>
        {/* <Text style={styles.section.text}>Statut : {agent.unimesStatus} de catégorie {agent.unimesCategory}</Text> */}
        <Text style={styles.section.text}>Service / Département : {agent.unimesDepartment}</Text>
        <Text style={styles.section.subtitle}>Adresses du missionnaire :</Text>
        <View style={styles.section.subsection}>
          <Text style={styles.section.text}>Adresse familiale : {agent.streetNumber} {agent.bis} {agent.streetType} {agent.streetName} {agent.postCode} {agent.city}</Text>
          <Text style={styles.section.text}>Adresse administrative : {agent.streetNumberPro} {agent.bisPro} {agent.streetTypePro} {agent.streetNamePro} {agent.postCodePro} {agent.cityPro}</Text>
        </View>
        {/* <Text style={styles.section.text}>Motif de la mission : {mission.mission_purpose}</Text> */}
        
        {mission.region === 'dom-tom' && (
          <Text>Mission dans les DOM-TOM avec un forfait {mission.abroad_costs === "per-diem" ? 'per diem' : 'frais réels'}</Text>
        )}
        {mission.region === 'étranger' && (
          <>
            <Text>Mission dans le pays : {mission.country.toUpperCase()}, avec un forfait {mission.abroad_costs === "per-diem" ? 'per diem' : 'frais réels'}</Text>
            <Text>Le Compte rendu est à fournir au retour de la mission si financement RI.</Text>
          </>
        )}
        <Text style={styles.section.subtitle}>Modalités de la mission</Text>
        <View style={styles.flexSection}>
          <View style={styles.halfSection}>
            <Text style={{textAlign:"center", padding: '4'}}>Début de mission</Text>
            <Text style={styles.section.text}>Date et heure : {dep.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu de départ : {mission.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.halfSection}>
            <Text style={{textAlign:"center", padding: '4'}}>Fin de mission</Text>
            <Text style={styles.section.text}>Date et heure : {ret.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu d'arrivée : {mission.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>FRAIS A REMBOURER A L'AGENT</Text>
        <Text style={styles.section.text} />
















        {transportsExpenses.map((cat) => (
          <View key={cat} style={styles.section.gest} >
            <View style={styles.section.gest.first}>
              <Text>{cat.name}</Text>
            </View>
            <View style={styles.section.gest.second}>
              <Text>{cat.amount}</Text>
            </View>
          </View>
        ))}



























      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title}>SERVICE OU DÉPARTEMENT</Text>
        <Text style={styles.section.text} />
        <Text>Utilisation de transports en commun : {transports.public_transports ? 'Oui.' : 'Non.'}</Text>
        {/* <Text style={styles.section.text}>Autres moyens de transports / commodités : {otherMeansofTransports.map((other) => other + ' - ')}</Text> */}
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
        {/* <Text style={styles.section.text}>Demande d'avance : {advance.advance_amount > 0 ? advance.advance_amount + '€' : 'Non.'}</Text> */}
      </View>
      {/* {(more.informations && more.informations.length > 0) && (
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title}>AUTRES</Text>
          <Text style={styles.section.text}>{more.informations}</Text>
        </View>
      )} */}
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>SIGNATURE</Text>
        <View style={[{ display: 'flex', flexDirection: 'row'}]}>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {new Date().toLocaleDateString()}</Text>
            <Text style={{fontSize: 10}}>Signature de l'agent</Text>
            <Image source={agentSignature} style={styles.signature} />
            {/* <img src={agentSignature}></img> */}
            {/* <Image debug src={"https://pom.unimes.fr/back/.." +signature.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {''}</Text>
            <Text style={{fontSize: 10}}>Signature du directeur de département ou du chef de service</Text>
            {/* <Image debug src={"http://10.30.20.87:8000" +signature.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {''}</Text>
            <Text style={{fontSize: 10}}>Signature de l'ordonnateur (Président ou DGS)</Text>
            {/* <Image debug src={''} /> */}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);}

EfPdf.propTypes = {

};

export default EfPdf;
