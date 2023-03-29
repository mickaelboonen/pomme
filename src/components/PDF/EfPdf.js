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
      borderBottom: '1px solid #1a1a1a',
      borderLeft: '1px solid #1a1a1a',
      flexDirection: 'row',
      first: {
        width: '50%',
        text: {
          paddingLeft: '10',
        }
      },
      second: {
        width: '50%',
        borderRight: '1px solid #1a1a1a',
        borderLeft: '1px solid #1a1a1a',
        text: {
          textAlign: 'center',
          paddingLeft: '10',
          width: '100%'
        }
      },
      title: {
        textTransform: 'uppercase',
        backgroundColor: '#c1c1c1',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '2',
        borderTop: '1px solid #1a1a1a',
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

const EfPdf = ({ data, agent, agentSignature, mealsExpenses, x}) => {

  console.log(mealsExpenses);
  // const {admin, french, overseas} = mealsExpenses;
  const { mission, transports, accomodations } = data;
  
  
  const dep = new Date(mission.departure);
  const ret = new Date(mission.comeback);
    
  const maxMealsNumber = getMaxMealsAndNights(mission);
  const freeMeals = maxMealsNumber - (accomodations.meals_paid_by_agent + accomodations.meals_in_admin_restaurants);

  const filterArrays = (array) => {
    return array.filter((row) => row.amount);
  }
  let transportsExpenses = [
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
    {
      name: 'Carburant pour véhicule administratif ou de location',
      amount: transports.fuel,
    },
    {
      name: 'Frais de péage',
      amount: transports.toll,
    },
    {
      name: 'Parking',
      amount: transports.parking,
    },
    {
      name: 'Taxi',
      amount: transports.taxi,
    },
    {
      name: 'Ferry',
      amount: transports.ferry,
    },
  ];
  let accomodationsExpenses = [
    {
      name: 'Hébergement',
      amount: accomodations.hotel,
    },
    {
      name: 'Repas pris dans un restaurant administratif ou assimilé',
      amount: `${accomodations.meals_in_admin_restaurants} repas pour un montant de ${'admin'}`,
    },
    {
      name: 'Repas à titre onéreux en France',
      amount: accomodations.meals_paid_by_agent_in_france,
    },
    {
      name: "Repas à titre onéreux à l'étranger",
      amount: accomodations.meals_paid_by_agent_overseas,
    },
  
  ];
  let otherExpenses = [
    {
      name: 'Frais de Visa',
      amount: mission.visa,
    },
    {
      name: "Frais d'inscription à un colloque, réunion, séminaire scientifique",
      amount: accomodations.event,
    },
  ];
  transportsExpenses = filterArrays(transportsExpenses);
  accomodationsExpenses = filterArrays(accomodationsExpenses);
  otherExpenses = filterArrays(otherExpenses);


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
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>AGENT</Text>
        <Text style={styles.section.text}>Qualité : {agent.gender} {agent.lastname.toUpperCase()} {agent.firstname}</Text>
        <Text style={styles.section.text}>Service / Département : {agent.unimesDepartment}</Text>
        <Text style={styles.section.text} />
        <Text style={styles.section.subtitle}>Modalités de la mission</Text>
        <View style={styles.flexSection}>
          <View style={styles.halfSection}>
            <Text style={{textAlign:"center", padding: '4'}}>Début de mission</Text>
            <Text style={styles.section.text}>Date et heure : {dep.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu de départ : {mission.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
            {mission.departure_place.includes('home') && <Text style={styles.section.text}>Adresse : {agent.streetNumber} {agent.bis} {streetType.find((type) => agent.streetType === type.id).name} {agent.streetName} {agent.postCode} {agent.city}</Text>}
            {!mission.departure_place.includes('home') && <Text style={styles.section.text}>Adresse : {agent.streetNumberPro} {agent.bisPro} {streetType.find((type) => agent.streetTypePro === type.id).name} {agent.streetNamePro} {agent.postCodePro} {agent.cityPro} </Text>}
          </View>
          <View style={styles.separator} />
          <View style={styles.halfSection}>
            <Text style={{textAlign:"center", padding: '4'}}>Fin de mission</Text>
            <Text style={styles.section.text}>Date et heure : {ret.toLocaleString()}</Text>
            <Text style={styles.section.text}>Lieu d'arrivée : {mission.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
            {mission.departure_place.includes('home') && <Text style={styles.section.text}>Adresse : {agent.streetNumber} {agent.bis} {streetType.find((type) => agent.streetType === type.id).name} {agent.streetName} {agent.postCode} {agent.city}</Text>}
            {!mission.departure_place.includes('home') && <Text style={styles.section.text}>Adresse : {agent.streetNumberPro} {agent.bisPro} {streetType.find((type) => agent.streetTypePro === type.id).name} {agent.streetNamePro} {agent.postCodePro} {agent.cityPro} </Text>}

          </View>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>FRAIS A REMBOURSER A L'AGENT</Text>
        <Text style={styles.section.text} />
        <View style={styles.section.gest} >
          <View style={styles.section.gest.first}>
            <Text style={styles.section.gest.title}>Transport</Text>
          </View>
          <View style={styles.section.gest.second}>
            <Text style={styles.section.gest.title}>Montant</Text>
          </View>
        </View>
        {transportsExpenses.map((row) => (
          <View key={row.name} style={styles.section.gest} >
            <View style={styles.section.gest.first}>
              <Text style={styles.section.gest.first.text}>{row.name}</Text>
            </View>
            <View style={styles.section.gest.second}>
              <Text style={styles.section.gest.second.text}>{row.amount}</Text>
            </View>
          </View>
        ))}
        {transports.personal_car &&(
          <View style={styles.section.gest} >
            <View style={styles.section.gest.first}>
              <Text style={styles.section.gest.first.text}>Véhicule personnel</Text>
            </View>
            <View style={styles.section.gest.second}>
              <Text style={styles.section.gest.second.text}>{transports.personal_car}€ (Nb. chevaux fiscaux : {transports.horsepower} / Kilométrage : {transports.km})</Text>
            </View>
          </View>
        )}
        <View style={styles.section.gest} >
          <View style={styles.section.gest.first}>
            <Text style={styles.section.gest.title}>Hébergement & repas</Text>
          </View>
          <View style={styles.section.gest.second}>
            <Text style={styles.section.gest.title}>Montant</Text>
          </View>
        </View>
        {accomodationsExpenses.map((row) => (
          <View key={row.name} style={styles.section.gest} >
            <View style={styles.section.gest.first}>
              <Text style={styles.section.gest.first.text}>{row.name}</Text>
            </View>
            <View style={styles.section.gest.second}>
              <Text style={styles.section.gest.second.text}>{row.amount}</Text>
            </View>
          </View>
        ))}
        <View style={styles.section.gest} >
          <View style={styles.section.gest.first}>
            <Text style={styles.section.gest.title}>Autres frais</Text>
          </View>
          <View style={styles.section.gest.second}>
            <Text style={styles.section.gest.title}>Montant</Text>
          </View>
        </View>
        {otherExpenses.map((row) => (
          <View key={row.name} style={styles.section.gest} >
            <View style={styles.section.gest.first}>
              <Text style={styles.section.gest.first.text}>{row.name}</Text>
            </View>
            <View style={styles.section.gest.second}>
              <Text style={styles.section.gest.second.text}>{row.amount}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.section.text} />
        <Text style={styles.section.text} />
        {mission.region === 'dom-tom' && <Text>Mission dans les DOM-TOM : {mission.abroad_costs === "per-diem" ? 'Forfait per diem.' : 'Frais réels dans la limite du forfait.'}</Text>}
        {mission.region === 'étranger' &&  <Text>Mission dans le pays : {mission.country.toUpperCase()}, avec un forfait {mission.abroad_costs === "per-diem" ? 'Forfait per diem.' : 'Frais réels dans la limite du forfait.'}</Text>}
      </View>
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