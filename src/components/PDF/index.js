import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import Logo from 'src/assets/images/logo.svg'
import Logo from 'src/assets/images/logo.png'
// import SvgImage from './SvgImage';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '15',
    fontSize:'12',
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
    margin: 10,
    marginTop: 0,
    padding: 10,
    flexGrow: 1,
    title: {
      fontSize: 20,
      border: '1px solid #1a1a1a',
      backgroundColor: '#c1c1c1',
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
      // height: '100%',
      // color: 'red',
      fontWeight: 'bold',
      fontSize: 24,
      textAlign: 'center'

    }
  }
});

const MyPDF = ({ data, agent, om}) => {
  // console.log(data);
  const [mission, transports, accomodation, advance, signature, more] = data;
  console.log(transports.data);
  const dep = new Date(mission.data.departure);
  const ret = new Date(mission.data.comeback);
  // console.log(dep.toLocaleString());
  // const finalDep = `${dep.getDate()}-${dep.getMonth() + 1}-${dep.getFullYear()}`
  // const depHour = `${dep.getHours()}H${dep.getMinutes()}`; 
  

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
      {/* <View style={styles.firstSection}>
        <Text>Ordre de Mission : {om.is_ponctual ? 'PONCTUEL' : 'PERMANENT'}</Text>
        {om.expenses && (
          <Text>Avec frais pris en charge par Unîmes, à transmettre au service financier après visa du service supportant la dépense.</Text>
        )}
        {!om.expenses && (
          <Text>Sans frais, notamment pris en charge par un organisme extérieur, à transmettre à la DRH.</Text>
        )}
      </View> */}
      <View style={styles.section}>
        <Text style={styles.section.title}>MISSIONNAIRE</Text>
        <Text style={styles.section.text}>Qualité : {agent.gender} {agent.lastname.toUpperCase()} {agent.firstname}</Text>
        <Text style={styles.section.text}>Statut : {agent.unimesStatus} de catégorie {agent.unimesCategory}</Text>
        <Text style={styles.section.text}>Service / Département : {agent.unimesDepartment}</Text>
        <Text style={styles.section.subtitle}>Adresses du missionnaire :</Text>
        <View style={styles.section.subsection}>
          <Text style={styles.section.text}>Adresse familiale : {agent.streetNumber} {agent.bis} {agent.streetType} {agent.streetName} {agent.postCode} {agent.city}</Text>
          <Text style={styles.section.text}>Adresse administrative : {agent.streetNumberPro} {agent.bisPro} {agent.streetTypePro} {agent.streetNamePro} {agent.postCodePro} {agent.cityPro}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>MISSION</Text>
        <Text style={styles.section.text}>Mission {om.is_ponctual ? 'ponctuelle' : 'permanente'} {om.expenses ? 'avec' : 'sans'} frais</Text>
        <Text style={styles.section.text}>Motif de la mission : {mission.data.missionPurpose}</Text>
        <Text style={styles.section.text}>Adresse de la mission : {mission.data.streetNumber} {mission.data.bis} {mission.data.streetType} {mission.data.streetName} {mission.data.postCode} {mission.data.city}</Text>
        {mission.data.region === 'dom-tom' && (
          <Text>Mission dans les DOM-TOM avec un forfait {mission.data.abroadCosts === "per-diem" ? 'per diem' : 'frais réels'}</Text>
        )}
        {mission.data.region === 'étranger' && (
          <>
            <Text>Mission dans le pays : {mission.data.country.toUpperCase()}, avec un forfait {mission.data.abroadCosts === "per-diem" ? 'per diem' : 'frais réels'}</Text>
            <Text>Le Compte rendu est à fournir au retour de la mission si financement RI.</Text>
          </>
        )}
        <Text style={styles.section.subtitle}>Modalités de la mission</Text>
        <View style={styles.flexSection}>
          <View style={styles.halfSection} borderRight='1px solid red'>
            <Text style={{textAlign:"center", padding: '4'}}>Début de mission</Text>
            <Text style={styles.section.text}>Date et heure : {dep.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu : {mission.data.departurePlace.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.halfSection}>
            <Text style={{textAlign:"center", padding: '4'}}>Fin de mission</Text>
            <Text style={styles.section.text}>Date et heure : {ret.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu : {mission.data.comebackPlace.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>TRANSPORTS</Text>
        <Text style={styles.section.text}>Modalités de déplacement pour la mission : {transports.data.vehicle ? 'Voiture - ' : ''}{transports.data.trainClass ? 'Train - ' : ''}{transports.data.planeClass ? 'Avion' : ''}</Text>
        {transports.data.trainClass && (
          <Text style={styles.section.text}>Train : Voyage en {transports.data.trainClass === 'second-class' ? 'deuxième classe' : 'première classe.'}, {transports.data.trainPayment === 'agent' ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {transports.data.planeClass && (
          <Text style={styles.section.text}>Train : Voyage en {transports.data.planeClass === 'business-class' ? 'classe affaire' : 'classe éco.'}, {transports.data.trainPayment === 'user' ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {transports.data.vehicle && (
          <Text style={styles.section.text}>Train : Voyage en {transports.data.planeClass === 'business-class' ? 'classe affaire' : 'classe éco.'}, {transports.data.trainPayment === 'user' ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>HÉBERGEMENT ET REPAS</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>AVANCE</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>AUTRES</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>SIGNATURE</Text>
      </View>
    </Page>
  </Document>
);}

MyPDF.propTypes = {

};

export default MyPDF;
