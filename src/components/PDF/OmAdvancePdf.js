import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';
import { PDFDocument, StandardFonts, PDFPage } from 'pdf-lib';

import Test from 'src/assets/docs/old-pdf/ef.pdf'

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';

import { streetType } from 'src/data/addressData';

// Selectors
import { getMaxMealsAndNights } from 'src/selectors/formValidationsFunctions';

Font.register({ family: 'Radjhani', src: RadjhaniFont });

import { styles } from './pdfStyles';
import { setValidationDateForPdf } from '../../selectors/pdfFunctions';
import { useSelector } from 'react-redux';

const OmAdvancePdf = ({ data, agent,creationDate, signature, validationDate, gest, acSignature, acValidationDate }) => {
  const dafGest = gest ? (gest.agent.slice(0,1) + '.' + gest.agent.slice(1,2)).toUpperCase() : '';
  return (
    // <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Image
            src={Logo}
            style={styles.header.image}
          />
          <Text style={styles.header.title}>DEMANDE D'AVANCE</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.section.title} wrap={false}>MISSIONNAIRE</Text>
          <Text style={styles.section.text}>Je soussigné{agent.gender !== 'M.' ? 'e' : '' }, {agent.lastname.toUpperCase()} {agent.firstname}, demande que soit accordée une avance de {data.advance_amount} euros, montant qui correspond à 75% du montant total de la mission, soit {data.total_amount} euros. </Text>
          <Text style={[styles.section.text, {textAlign: 'right'}]}>Fait à Nîmes le {setValidationDateForPdf(creationDate)}.</Text>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title} wrap={false}>DÉTAILS ÉTAT PRÉVISIONNEL DES FRAIS</Text>
          <Text style={styles.section.text}> Nombre de nuits : {data.nights_number} </Text>
          <Text style={styles.section.text}> Nombre de repas : {data.meals_number} </Text>
          <Text style={styles.section.text}> Montant des autres frais : {data.other_expenses_number} </Text>
          <Text style={styles.section.text}> Justification des autres frais : {data.other_expenses_justification} </Text>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title} wrap={false}>PARTIE GESTIONNAIRE DAF</Text>
          
          <Text style={styles.section.text}> Le demande d'avance {gest.validation ? 'a été' : "n'a pas été"} validée par {dafGest}.</Text>
          <Text style={styles.section.text}> Commentaires : {gest.comment} </Text>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title} wrap={false}>SIGNATURE</Text>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={[styles.section.subsection, {height: 150, padding: 5, width: '49%'}]}>
              <Text style={[styles.section.text, {textTransform: 'uppercase', textAlign: 'center'}]}>L'ordonnateur.rice</Text>
              <Text style={styles.section.text} />
              <Text style={styles.section.text} />
              <Text style={styles.section.text}>Validé à Nîmes, le {validationDate ? setValidationDateForPdf(validationDate) : '__/__/____'}.</Text>
              <Text style={styles.section.text}>Signature :</Text>
              {signature !== '' && (
                <Image
                  src={signature}
                  style={styles.header.image}
                />
              )}
            </View>
            <View style={[styles.section.subsection, {height: 150, padding: 5, width: '49%'}]}>
            <Text style={[styles.section.text, {textTransform: 'uppercase', textAlign: 'center'}]}>L'agent comptable</Text>
              <Text style={styles.section.text} />
              <Text style={styles.section.text} />
              <Text style={styles.section.text}>Validé à Nîmes, le {acValidationDate ? setValidationDateForPdf(acValidationDate) : '__/__/____'}.</Text>
              <Text style={styles.section.text}>Signature :</Text>
              {acSignature !== '' && (
                <Image
                  src={acSignature}
                  // style={styles.header.image}
                />
              )}
            </View>

          </View>
        </View>
      </Page>
    // </Document>
  );
};

OmAdvancePdf.propTypes = {
  
};

OmAdvancePdf.defaultProps = {
  signature: '',
  acSignature: ''
  // handler: null
}


export default OmAdvancePdf;
