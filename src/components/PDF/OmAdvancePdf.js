import React from 'react';
import PropTypes from 'prop-types';
import { Font, Page, Text, View, Image, PDFViewer } from '@react-pdf/renderer';


// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';


// Selectors
import { setValidationDateForPdf, setValidationDate } from 'src/selectors/pdfFunctions';

Font.register({ family: 'Radjhani', src: RadjhaniFont });
import { styles } from './pdfStyles';

const OmAdvancePdf = ({
  data,
  agent,
  // creationDate,
  signature,
  validationDate,
  gest,
  acSignature,
  acValidationDate
}) => {

  const dafGest = gest ? (gest.agent.slice(0,1) + '.' + gest.agent.slice(1,2)).toUpperCase() : '';
  const creationDate = setValidationDate(data.created_at);
  let validationDateToDisplay = null;
  let acValidationDateToDisplay = null;

  if (validationDate) {
    validationDateToDisplay = signature ? setValidationDate() : validationDate;
  }
  if (acValidationDate) {
    acValidationDateToDisplay = acSignature ? setValidationDate() : acValidationDate;
  }
  // const acValidationDate = acSignature ? setValidationDate() : null;
  // const validationDate = setValidationDate();

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
          {data.unknown_amount && <Text style={styles.section.text} >Je soussigné.e, {agent.lastname.toUpperCase()} {agent.firstname}, déclare faire une demande d'avance auprès du service financier sans connaître le montant total de la mission. Je laisse le soin au service financier de calculer à ma place le montant total et de procéder à une avance de 75% dudit montant. </Text>}
          {!data.unknown_amount && <Text style={styles.section.text}>Je soussigné.e, {agent.lastname.toUpperCase()} {agent.firstname}, demande que soit accordée une avance de {data.advance_amount} euros, montant qui correspond à 75% du montant total de la mission, soit {data.total_amount} euros. </Text>}
          <Text style={[styles.section.text, {textAlign: 'right'}]}>Fait à Nîmes le {setValidationDateForPdf(creationDate)}.</Text>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title} wrap={false}>DÉTAILS ÉTAT PRÉVISIONNEL DES FRAIS</Text>
          <Text style={styles.section.text}> Nombre de nuits : {data.nights_number} </Text>
          <Text style={styles.section.text}> Nombre de repas : {data.meals_number} </Text>
          <Text style={styles.section.text}> Montant des autres frais : {data.other_expenses_amount} </Text>
          <Text style={styles.section.text}> Justification des autres frais : {data.other_expenses_justification} </Text>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title} wrap={false}>PARTIE GESTIONNAIRE DAF</Text>
          
          {gest !== undefined && <Text style={styles.section.text}> Le demande d'avance {gest.validation ? 'a été' : "n'a pas été"} validée par {dafGest}.</Text>}
          {gest !== undefined && <Text style={styles.section.text}> Commentaires : {gest.comment} </Text>}
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.section.title} wrap={false}>SIGNATURE</Text>
          <View style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={[styles.section.subsection, {height: 150, padding: 5, width: '49%'}]}>
              <Text style={[styles.section.text, {textTransform: 'uppercase', textAlign: 'center'}]}>L'ordonnateur.rice</Text>
              <Text style={styles.section.text} />
              <Text style={styles.section.text} />
              <Text style={styles.section.text}>Validé à Nîmes, le {validationDateToDisplay ? setValidationDateForPdf(validationDateToDisplay) : '__/__/____'}.</Text>
              <Text style={styles.section.text}>Signature :</Text>
              {signature !== '' && (
                <Image
                  src={signature}
                  // style={styles.header.image}
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
