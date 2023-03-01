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
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center'

    }
  }
});

const MyPDF = ({ data, agent, vehicleTypes, agentSignature}) => {
  
  const {mission, transports, accomodations, advance, signature, more} = data;
  
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


  
  const maxMealsNumber = getMaxMealsAndNights(mission);
  const freeMeals = maxMealsNumber - (accomodations.meals_paid_by_agent + accomodations.meals_in_admin_restaurants);
  
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
        <Text>Ordre de Mission : {data.is_ponctual ? 'PONCTUEL' : 'PERMANENT'}</Text>
        {data.expenses && (
          <Text>Avec frais pris en charge par Unîmes, à transmettre au service financier après visa du service supportant la dépense.</Text>
        )}
        {!data.expenses && (
          <Text>Sans frais, notamment pris en charge par un organisme extérieur, à transmettre à la DRH.</Text>
        )}
      </View>
      {/* <View style={styles.section} wrap={false}>
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

      </View> */}
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>MISSIONNAIRE</Text>
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
        <Text style={styles.section.title} wrap={false}>MISSION</Text>
        <Text style={styles.section.text}>Motif de la mission : {mission.mission_purpose}</Text>
        <Text style={styles.section.text}>Adresse de la mission : {mission.address.streetNumber} {mission.address.bis} {mission.address.streetType} {mission.address.streetName} {mission.address.postCode} {mission.address.city}</Text>
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
        <Text style={styles.section.title} wrap={false}>TRANSPORTS</Text>
        <Text style={styles.section.text}>Modalités de déplacement pour la mission : {chosenVehicleType.hasOwnProperty('name') ? 'Voiture - ' : ''}{transports.transport_type.map((t) => t + ' - ')}{transports.planeClass ? 'Avion' : ''}</Text>
        <Text style={styles.section.text} />
        <Text style={styles.section.text} />
        {trainData.hasOwnProperty('class') && (
          <Text>Train : Voyage en {trainData.class === 'second-class' ? 'deuxième classe' : 'première classe'}, {trainData.payment.includes('agent') ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {planeData.hasOwnProperty('class') && (
          <Text>Avion : Voyage en {planeData.class === 'business-class' ? 'classe affaire' : 'classe éco'}, {planeData.payment.includes('user') ? "avancé par l'agent." : 'payé par Unîmes.'}</Text>
        )}
        {chosenVehicleType.hasOwnProperty('name') && (
          <>
            <Text>Vehicule : {chosenVehicleType.name}{!chosenVehicleType.name.includes('Covoiturage') ? `, immatriculé ${transports.authorizations[0].vehicle.license_plate}` : '.'}</Text>
            {transports.vehicle === 0 && <Text>Remboursement Forfait SNCF 2ème classe.</Text>}
          </>
        )}
        <Text style={styles.section.text} />
        <Text style={styles.section.text} />
        <Text>Utilisation de transports en commun : {transports.publicTransports ? 'Oui.' : 'Non.'}</Text>
        <Text style={styles.section.text}>Autres moyens de transports / commodités : {otherMeansofTransports.map((other) => other + ' - ')}</Text>
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
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>AVANCE</Text>
        <Text style={styles.section.text}>Demande d'avance : {advance.advance_amount > 0 ? advance.advance_amount + '€' : 'Non.'}</Text>
      </View>
      {(more.informations && more.informations.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.section.title}>AUTRES</Text>
          <Text style={styles.section.text}>{signature.informations}</Text>
        </View>
      )}
      <View style={styles.section}>
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

MyPDF.propTypes = {

};

export default MyPDF;
