import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

import { setValidationDateForPdf } from 'src/selectors/pdfFunctions';
// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';
import RadjhaniBoldFont from 'src/assets/fonts/Rajdhani-Bold.ttf';


Font.register({ family: 'Radjhani', src: RadjhaniFont });
Font.register({ family: 'RadjhaniBold', src: RadjhaniBoldFont });
Font.registerHyphenationCallback(word => [word]);
// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#fff',
//     padding: 20,
//     fontSize:12,
//     fontFamily: 'Radjhani',
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   signature: {
//     maxWidth: '100%',
//     // height: 100,
//   },
//   firstSection: {
//     padding: 10,
//   },
//   flexSection: {
//     display: 'flex',
//     flexDirection: 'row',
//     border: '1px solid #1a1a1a',
//   },
//   halfSection: {
//     width: '50%',
//     padding:'0 8 8',
//     // border: '1px solid red'
//   },
//   separator: {
//     border: '1px solid #1a1a1a'
//   },
//   section: {
//     margin: '0 10',
//     // marginTop: 0,
//     padding: '0 10 10',
//     title: {
//       fontSize: 14,
//       border: '1px solid #1a1a1a',
//       backgroundColor: '#c1c1c1',
//       fontWeight: 'bold',
//       padding:'8',
//       marginBottom: '8'
//     },
//     text: {
//       marginBottom: '4',
//     },
//     notabene: {
//       fontSize: 9,
//       marginBottom: '4'
//     },    
//   },
//   header: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 15,
//     alignItems: 'center',
//     width: '100%',
//     image: {
//       width: '40%',
//     },
//     title: {
//       width: '50%',
//       fontWeight: 700,
//       fontSize: 24,
//       textAlign: 'center'

//     },
//     subtitle: {
//       fontSize: 12,
//       textAlign: 'center',
//       marginBottom: 15,

//     }
//   }
// });
import { styles } from './pdfStyles';

const ScienceEventPdf = ({ data, agent, creationDate }) => {
  
  const sciencePaymentArray = [
    {
      value: 'unimes',
      label: 'Réglé par Unîmes'
    },
    {
      value: 'agent',
      label: "Avancé par l'agent."
    },
    {
      value: 'free',
      label: "Pris en charge par un autre organisme."
    },
    {
      value: null,
      label: ""
    },
  ];

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>PARTICIPATION A UN EVENEMENT SCIENTIFIQUE</Text>
      </View>
      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>ÉVÉNEMENT & REGLEMENT</Text>
        { data.hasOwnProperty('presentation') && (
          <Text style={styles.section.text}>Type de présentation : {data.presentation.map((type) => type.replace(type[0], type[0].toUpperCase()) + '. ')}</Text>
        )}
        { data.hasOwnProperty('payment') && (
          <Text style={styles.section.text}>Prise en charge des frais d'inscription : {sciencePaymentArray.find((type) => type.value === data.payment).label}</Text>
        )}
        <Text style={styles.section.text}>Budget ou contrat concerné : {data.budget}</Text>
        <Text style={styles.section.text}>Montant à régler : {data.cost}€.</Text>
        <Text style={styles.section.text}>Date limite de règlement : {data.deadline}.</Text>
        <Text style={styles.section.text}>Commentaires : {data.comment}</Text>

        <Text style={styles.section.text} />
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>DÉCISION</Text>
        <View style={[styles.section.subsection, {height: 150, padding: 5}]}>
          <Text style={styles.section.text}>Demande de participation à un événement scientifique créée par {agent.lastname.toUpperCase()} {agent.firstname}, le {setValidationDateForPdf(creationDate)}.</Text>
          <Text style={styles.section.text} />
          <Text style={styles.section.text} />
          <Text style={styles.section.text}>Visa de la Vice-Présidence Recherche :</Text>
        </View>
      </View>
    </Page>
  </Document>
);}

ScienceEventPdf.propTypes = {

};

export default ScienceEventPdf;
