import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, Image } from '@react-pdf/renderer';
import { floatMultiplication, OTHER_MEALS_AMOUNT, ADMIN_MEALS_AMOUNT } from 'src/selectors/mathFunctions';

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';

import { streetType } from 'src/data/addressData';

// Selectors
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';
import EfSteps from './EfSteps';

Font.register({ family: 'Radjhani', src: RadjhaniFont });

import { styles } from './pdfStyles';

const EfPdf = ({ data, agent, agentSignature, country, om}) => {
  
  const { mission, transports, accomodations, stages } = data;
  const { mission: { addresses, planning }} = om;
  
  const dep = new Date(mission.departure);
  const ret = new Date(mission.comeback);
    
  const maxMealsNumber = getMaxMealsAndNights(mission);
  const freeMeals = maxMealsNumber - (accomodations.meals_paid_by_agent_in_france + accomodations.meals_paid_by_agent_overseas + accomodations.meals_in_admin_restaurants);

  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, ADMIN_MEALS_AMOUNT);
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, OTHER_MEALS_AMOUNT);
  const overseasMeals = floatMultiplication(accomodations.meals_paid_by_agent_overseas, OTHER_MEALS_AMOUNT);

  const filterArrays = (array) => {
    return array.filter((row) => row.amount);
  }
  let transportsExpenses = [
    {
      name: 'Avion',
      amount: transports.plane > 0 ? `${transports.plane}€` : transports.plane,
    },
    {
      name: 'Train',
      amount: transports.train > 0 ? `${transports.train}€` : transports.train,
    },
    {
      name: 'Transports en public',
      amount: transports.public_transports > 0 ? `${transports.public_transports}€` : transports.public_transports,
    },
    {
      name: 'Carburant pour véhicule administratif ou de location',
      amount: transports.fuel > 0 ? `${transports.fuel}€` : transports.fuel,
    },
    {
      name: 'Frais de péage',
      amount: transports.toll > 0 ? `${transports.toll}€` : transports.toll,
    },
    {
      name: 'Parking',
      amount: transports.parking > 0 ? `${transports.parking}€` : transports.parking,
    },
    {
      name: 'Taxi',
      amount: transports.taxi > 0 ? `${transports.taxi}€` : transports.taxi,
    },
    {
      name: 'Ferry',
      amount: transports.ferry > 0 ? `${transports.ferry}€` : transports.ferry,
    },
  ];
  let accomodationsExpenses = [
    {
      name: 'Hébergement',
      amount: accomodations.hotel ? `${accomodations.hotel}€` : accomodations.hotel,
    },
    {
      name: 'Repas pris dans un restaurant administratif ou assimilé',
      amount: accomodations.meals_in_admin_restaurants > 0 ? `${accomodations.meals_in_admin_restaurants} repas soit ${adminMealsAmount}€` : '0',
    },
    {
      name: 'Repas à titre onéreux en France',
      amount: accomodations.meals_paid_by_agent_in_france > 0 ? `${accomodations.meals_paid_by_agent_in_france} repas soit ${frenchMeals}€` : mission.region === 'métropole' ? '0' : 0,
    },
    {
      name: "Repas à titre onéreux à l'étranger",
      amount: accomodations.meals_paid_by_agent_overseas > 0 ? `${accomodations.meals_paid_by_agent_overseas} repas.` : accomodations.meals_paid_by_agent_overseas,
    },
    {
      name: `Repas gratuits ${mission.region !== 'métropole' ? "à l'étranger" : "en France."}`,
      amount: `${freeMeals.toString()} repas.`,
    },
  
  ];
  let otherExpenses = [
    {
      name: 'Frais de Visa',
      amount: transports.visa > 0 ? `${transports.visa}€` : transports.visa,
    },
    {
      name: "Frais d'inscription à un colloque, réunion, séminaire scientifique",
      amount: accomodations.event > 0 ? `${accomodations.event}€` : accomodations.event,
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
        <Text style={styles.section.subtitle}>Adresses du missionnaire :</Text>
        <View style={styles.section.subsection}>
          <Text style={styles.section.text}>Adresse familiale : {agent.streetNumber} {agent.bis} {streetType.find((type) => agent.streetType === type.id).name} {agent.streetName} {agent.postCode} {agent.city}</Text>
          <Text style={styles.section.text}>Adresse administrative : Université de Nîmes {agent.streetNumberPro} {agent.bisPro} {streetType.find((type) => agent.streetTypePro === type.id).name} {agent.streetNamePro} {agent.postCodePro} {agent.cityPro}</Text>
        </View>

        {/* <Text style={styles.section.subtitle}>Modalités de la mission</Text>
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
        </View> */}
        {/*  */}
        <Text style={styles.section.subtitle}>Modalités de la mission :</Text>
        <View style={styles.section.subsection}>
            <Text style={styles.section.text}>DÉBUT DE LA MISSION</Text>
            <Text style={[styles.section.text, {paddingLeft: '10'}]}>Date et heure : {dep.toLocaleString()}</Text>
            <Text style={[styles.section.text, {paddingLeft: '10'}]}>Lieu de départ : {mission.departure_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
            <Text style={[styles.section.text, {marginTop: '8'}]}>ÉTAPES DE LA MISSION</Text>
          {addresses.map((address) => (
            <Text style={[styles.section.text, {paddingLeft: '10'}]} key={address.streetName}>
              Adresse n° {addresses.indexOf(address) + 1} : {address.streetNumber === 0 ? '' : address.streetNumber} {address.bis} {streetType.find((type) => address.streetType === type.id).name} {address.streetName} {address.postCode} {address.city}
            </Text>
          ))}
          {planning && (
            <>
              <Text style={[styles.section.text, {marginTop: '8'}]}>PLANNING DE LA MISSION</Text>
              <Text style={[styles.section.text, {paddingLeft: '10'}]}>{mission.planning}</Text>
            </>
          )}
          <Text style={[styles.section.text, {marginTop: '8'}]}>FIN DE LA MISSION</Text>
          <Text style={[styles.section.text, {paddingLeft: '10'}]}>Date et heure : {ret.toLocaleString()}</Text>
          <Text style={[styles.section.text, {paddingLeft: '10'}]}>Lieu d'arrivée : {mission.comeback_place.includes('home') ? 'Résidence familiale' : 'Résidence administrative'}</Text>
        </View>
        {/*  */}
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>FRAIS A REMBOURSER A L'AGENT</Text>
        <Text style={styles.section.text} />
        <View style={styles.section.efArray} >
          <View style={styles.section.efArray.first}>
            <Text style={styles.section.efArray.title}>Transport</Text>
          </View>
          <View style={styles.section.efArray.second}>
            <Text style={styles.section.efArray.title}>Montant</Text>
          </View>
        </View>
        {transportsExpenses.map((row) => (
          <View key={row.name} style={styles.section.efArray} >
            <View style={styles.section.efArray.first}>
              <Text style={styles.section.efArray.first.text}>{row.name}</Text>
            </View>
            <View style={styles.section.efArray.second}>
              <Text style={styles.section.efArray.second.text}>{row.amount}</Text>
            </View>
          </View>
        ))}
        {transports.personal_car &&(
          <View style={styles.section.efArray} >
            <View style={styles.section.efArray.first}>
              <Text style={styles.section.efArray.first.text}>Véhicule personnel</Text>
            </View>
            <View style={styles.section.efArray.second}>
              <Text style={styles.section.efArray.second.text}>{transports.personal_car}€ (Nb. chevaux fiscaux : {transports.horsepower} / Kilométrage : {transports.km})</Text>
            </View>
          </View>
        )}
        <View style={styles.section.efArray} >
          <View style={styles.section.efArray.first}>
            <Text style={styles.section.efArray.title}>Hébergement & repas</Text>
          </View>
          <View style={styles.section.efArray.second}>
            <Text style={styles.section.efArray.title}>Montant ou Nombre</Text>
          </View>
        </View>
        {accomodationsExpenses.map((row) => (
          <View key={row.name} style={styles.section.efArray} >
            <View style={styles.section.efArray.first}>
              <Text style={styles.section.efArray.first.text}>{row.name}</Text>
            </View>
            <View style={styles.section.efArray.second}>
              <Text style={styles.section.efArray.second.text}>{row.amount}</Text>
            </View>
          </View>
        ))}
        <View style={styles.section.efArray} >
          <View style={styles.section.efArray.first}>
            <Text style={styles.section.efArray.title}>Autres frais</Text>
          </View>
          <View style={styles.section.efArray.second}>
            <Text style={styles.section.efArray.title}>Montant</Text>
          </View>
        </View>
        {otherExpenses.map((row) => (
          <View key={row.name} style={styles.section.efArray} >
            <View style={styles.section.efArray.first}>
              <Text style={styles.section.efArray.first.text}>{row.name}</Text>
            </View>
            <View style={styles.section.efArray.second}>
              <Text style={styles.section.efArray.second.text}>{row.amount}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.section.text} />
        <Text style={styles.section.text} />
        {mission.region === 'dom-tom' && <Text>Mission dans les DOM-TOM : {mission.abroad_costs === "per-diem" ? 'Forfait per diem.' : 'Frais réels dans la limite du forfait.'}</Text>}
        {mission.region === 'étranger' &&  <Text>Mission dans le pays : {country.name.toUpperCase()}, avec un {mission.abroad_costs === "per-diem" ? 'Forfait per diem.' : 'Frais réels dans la limite du forfait.'}</Text>}
      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>SIGNATURE</Text>
        <View style={[{ display: 'flex', flexDirection: 'row'}]}>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {new Date().toLocaleDateString()}</Text>
            <Text style={{fontSize: 10}}>Signature de l'agent.e</Text>
            <Image source={agentSignature} style={styles.signature} />
            {/* <img src={agentSignature}></img> */}
            {/* <Image debug src={"https://pom.unimes.fr/back/.." +signature.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {''}</Text>
            <Text style={{fontSize: 10}}>Signature du.de la directeur.rice de département ou du.de la chef.fe de service</Text>
            {/* <Image debug src={"http://10.30.20.87:8000" +signature.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '33%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {''}</Text>
            <Text style={{fontSize: 10}}>Signature de l'ordonnateur.rice (Président, DGS, VP)</Text>
            {/* <Image debug src={''} /> */}
          </View>
        </View>
      </View>
      {stages.length > 1 && <EfSteps steps={stages} isTeaching={data.is_teaching}/>}
    </Page>
  </Document>
);}

EfPdf.propTypes = {

};

export default EfPdf;
