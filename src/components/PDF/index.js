import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';

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
      // flexGrow: 1,
      borderTop: '1px solid #1a1a1a',
      borderLeft: '1px solid #1a1a1a',
      width: '17%'
      
      // display: 'flex',
      // justifyContent: 'center'
      // flexDirection: 'column',
      // alignItems: 'center'
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
      // height: '100%',
      // color: 'red',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center'

    }
  }
});

const MyPDF = ({ data, agent, om, vehicleTypes}) => {
  
  const [mission, transports, accomodation, advance, signature] = data;
  console.log(signature.data);
  const dep = new Date(mission.data.departure);
  const ret = new Date(mission.data.comeback);
  

  const chosenVehicleType = vehicleTypes.find((type) => type.id === transports.data.vehicle );
  const maxMealsNumber = getMaxMealsAndNights(mission.data);
  const freeMeals = maxMealsNumber - (accomodation.data.mealsPaidByAgent + accomodation.data.mealsInAdminRestaurants);

  

  const gestArray = ['%', 'UB', 'CR', 'Code Nacres', 'Code LOLF', 'Code Analytique'];
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
        <Text>Ordre de Mission : {om.is_ponctual ? 'PONCTUEL' : 'PERMANENT'}</Text>
        {om.expenses && (
          <Text>Avec frais pris en charge par Unîmes, à transmettre au service financier après visa du service supportant la dépense.</Text>
        )}
        {!om.expenses && (
          <Text>Sans frais, notamment pris en charge par un organisme extérieur, à transmettre à la DRH.</Text>
        )}
      </View>
      <View style={styles.section}>
          <Text style={styles.section.title}>SERVICE OU DÉPARTEMENT</Text>
          <View style={{display: 'flex', width: '100%', flexDirection: 'row', borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a'}}>
            {gestArray.map((cat) => (
              <View key={cat} style={styles.section.gest}>
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
            <Text style={styles.section.text}>Lieu de départ : {mission.data.departurePlace.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.halfSection}>
            <Text style={{textAlign:"center", padding: '4'}}>Fin de mission</Text>
            <Text style={styles.section.text}>Date et heure : {ret.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu d'arrivée : {mission.data.comebackPlace.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>TRANSPORTS</Text>
        <Text style={styles.section.text}>Modalités de déplacement pour la mission : {!isNaN(transports.data.vehicle) ? 'Voiture - ' : ''}{transports.data.trainClass ? 'Train - ' : ''}{transports.data.planeClass ? 'Avion' : ''}</Text>
        <Text style={styles.section.text} />
        {transports.data.trainClass && (
          <Text style={styles.section.text}>Train : Voyage en {transports.data.trainClass === 'second-class' ? 'deuxième classe' : 'première classe'}, {transports.data.trainPayment === 'agent' ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {transports.data.planeClass && (
          <Text style={styles.section.text}>Avion : Voyage en {transports.data.planeClass === 'business-class' ? 'classe affaire' : 'classe éco'}, {transports.data.trainPayment === 'user' ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {!isNaN(transports.data.vehicle) && (
          <>
            <Text style={styles.section.text}>Vehicule : {chosenVehicleType.name}{transports.data.vehicle === 0 ? `, immatriculé ${transports.data.authorizations[0].vehicle.license_plate}` : '.'}</Text>
            {transports.data.vehicle === 0 && <Text style={styles.section.notabene}>Remboursement Forfait SNCF 2ème classe.</Text>}
          </>
        )}
        <Text style={styles.section.text} />
        <Text style={styles.section.text}>Utilisation de transports en commun : {transports.data.publicTransports ? 'Oui.' : 'Non.'}</Text>
        <Text style={styles.section.text}>Autres moyens de transports / commodités : {transports.data.others.map((other) => other + ' - ')}</Text>
      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title}>HÉBERGEMENT ET REPAS</Text>
        {accomodation.data.hotel && (
          <Text style={styles.section.text}>Hotel : {accomodation.data.nightsNumber} nuits, {accomodation.data.hotelPayment === 'unimes' ? 'payé par Unîmes.' : "avancé par l'agent."}</Text>
        )}
        {!accomodation.data.hotel && (
          <Text style={styles.section.text}>Pas d'hotel pour la durée de la mission.</Text>
        )}
        <Text>Repas :</Text>
        <Text style={{textIndent: '10'}}>{freeMeals} repas gratuits</Text>
        <Text style={{textIndent: '10'}}>{accomodation.data.mealsInAdminRestaurants} repas en restaurant administratif</Text>
        <Text style={{textIndent: '10'}}>{accomodation.data.mealsPaidByAgent} repas autres</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title}>AVANCE</Text>
        <Text style={styles.section.text}>Demande d'avance : {advance.data.advanceAmount > 0 ? advance.data.advanceAmount + '€' : 'Non.'}</Text>
      </View>
      {signature.data.otherInfos.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.section.title}>AUTRES</Text>
          <Text style={styles.section.text}>{signature.data.otherInfos}</Text>
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.section.title}>SIGNATURE</Text>
        <View style={[{ display: 'flex', flexDirection: 'row'}]}>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {'DATE'}</Text>
            <Text style={{fontSize: 10}}>Signature de l'agent</Text>
            {/* <Image debug src={"https://pom.unimes.fr/back/.." +signature.data.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {'DATE'}</Text>
            <Text style={{fontSize: 10}}>Signature du directeur de département ou du chef de service</Text>
            {/* <Image debug src={"http://10.30.20.87:8000" +signature.data.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {'DATE'}</Text>
            <Text style={{fontSize: 10}}>Signature de l'ordonnateur (Président ou DGS)</Text>
            {/* <Image debug src={''} /> */}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);}

MyPDF.propTypes = {

};

export default MyPDF;
