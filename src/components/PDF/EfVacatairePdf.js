import React from 'react';
import PropTypes from 'prop-types';
import { Font, Page, Text, View, Image } from '@react-pdf/renderer';
import { floatMultiplication, floatAddition, floatSubtraction, OTHER_MEALS_AMOUNT, ADMIN_MEALS_AMOUNT } from 'src/selectors/mathFunctions';

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';

// Selectors
import EfSteps from './EfSteps';
import { setValidationDateForPdf, setValidationDate } from '../../selectors/pdfFunctions';

Font.register({ family: 'Radjhani', src: RadjhaniFont });

import { styles } from './pdfStyles';

const EfVacatairePdf = ({ data, agent, signature, gest}) => {

  const { transports, accomodations, stages } = data;


  let transportsFields = Object.entries(transports).filter((transport) => (!transport[0].includes('_files') && transport[0] !== 'km' && transport[0] !== 'horsepower' ) && transport[1]);
  transportsFields = transportsFields.filter((transport) => transport[0] !== 'id' && transport[0] !== 'status');

  const transportsAmountsArray = transportsFields.map((t) => t[1]);

  const totalTransportsExpenses = floatAddition(transportsAmountsArray);


  const adminMealsAmount = floatMultiplication(accomodations.meals_in_admin_restaurants, ADMIN_MEALS_AMOUNT);
  const frenchMeals = floatMultiplication(accomodations.meals_paid_by_agent_in_france, ADMIN_MEALS_AMOUNT); // ADMIN_MEALS_AMOUNT  parce que c'est le tarif vacataire
  // const overseasMeals = floatMultiplication(accomodations.meals_paid_by_agent_overseas, OTHER_MEALS_AMOUNT);

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
      amount: accomodations.meals_paid_by_agent_in_france > 0 ? `${accomodations.meals_paid_by_agent_in_france} repas soit ${frenchMeals}€` : '0',
    },
    {
      name: "Repas à titre onéreux à l'étranger",
      amount: accomodations.meals_paid_by_agent_overseas > 0 ? `${accomodations.meals_paid_by_agent_overseas} repas.` : accomodations.meals_paid_by_agent_overseas,
    }  
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
  const totalMeals = floatAddition([adminMealsAmount, frenchMeals]);
  const othersExpensesAmount = floatAddition([transports.visa ?? 0, accomodations.event ?? 0]);

  const totalAmount = floatAddition([totalMeals, othersExpensesAmount, totalTransportsExpenses, accomodations.hotel ?? 0])

  const validationDate = signature ? setValidationDate() : null;
  // console.log("gest = ", gest);
  return (
  <Page size="A4" style={styles.page}>
    <View style={styles.header} fixed>
      <Image
        src={Logo}
        style={styles.header.image}
      />
      <Text style={styles.header.title}>État de frais - Vacataires</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.section.title} wrap={false}>AGENT</Text>
      <Text style={styles.section.text}>Qualité : {agent.gender} {agent.lastname.toUpperCase()} {agent.firstname}</Text>
      <Text style={styles.section.text}>Service / Département : {agent.unimesDepartment}</Text>
      <Text style={styles.section.text} />
      <Text style={styles.section.subtitle}>Adresses du missionnaire :</Text>
      <View style={styles.section.subsection}>
        <Text style={styles.section.text}>Adresse familiale : {agent.address} {agent.address2} {agent.postCode} {agent.city}</Text>
        <Text style={styles.section.text}>Adresse administrative : Université de Nîmes {agent.addressPro} {agent.address2Pro} {agent.postCodePro} {agent.cityPro}</Text>
      </View>
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
      {otherExpenses.length > 0 && (
        <View style={styles.section.efArray} >
          <View style={styles.section.efArray.first}>
            <Text style={styles.section.efArray.title}>Autres frais</Text>
          </View>
          <View style={styles.section.efArray.second}>
            <Text style={styles.section.efArray.title}>Montant</Text>
          </View>
        </View>
      )}
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
    </View>
    {/* {stages.length > 1 && <EfSteps steps={stages} isTeaching={data.is_teaching}/>} */}
    <View style={styles.section} wrap={false}>
      <Text style={styles.section.title} wrap={false}>TOTAUX</Text>
      <View style={[styles.section.subsection, {padding: 5}]}>
        <Text style={styles.section.text}>Total transports : {totalTransportsExpenses} euros.</Text>
        <Text style={styles.section.text}>Total nuités : {accomodations.hotel ? accomodations.hotel : '0'} euros.</Text>
        <Text style={styles.section.text}>Total repas : {totalMeals} euros.</Text>
        <Text style={styles.section.text}>Autres : {othersExpensesAmount} euros.</Text>
        <Text style={styles.section.text}>Total général en chiffres : {totalAmount} euros.</Text>
      </View>
    </View>
    <View style={styles.section} wrap={false}>
      <Text style={styles.section.title} wrap={false}>SIGNATURE</Text>
      <View style={[styles.section.subsection, {height: 150, padding: 5}]}>
        <Text style={styles.section.text}>Validé à Nîmes, le {validationDate ? setValidationDateForPdf(validationDate) : '__/__/____'}.</Text>
        {!gest && <Text style={styles.section.text}>Signature de l'ordonnateur.rice (Président, DGS, VP)</Text>}
        {(gest && gest.position === "DGS" ) && (
          <>
            <Text style={styles.section.text}>Ordonnat{gest ? (gest.gender === "M." ? 'eur' : 'rice'): 'eur.rice (Président, DGS, VP)'} : {gest ? gest.gender + ' ' + gest.lastname : ''}</Text>
            <Text style={styles.section.text}>Direction Générale des Services</Text>
            <Text style={styles.section.text}>Signature :</Text>
          </>
        )}
        {(signature && signature !== '') && <Image src={signature}  style={{width: '50%'}}/>}
      </View>
    </View>
  </Page>
);}

EfVacatairePdf.propTypes = {

};

export default EfVacatairePdf;
