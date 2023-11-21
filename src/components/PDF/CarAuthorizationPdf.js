import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';
import RadjhaniBoldFont from 'src/assets/fonts/Rajdhani-Bold.ttf';


Font.register({ family: 'Radjhani', src: RadjhaniFont });
Font.register({ family: 'RadjhaniBold', src: RadjhaniBoldFont });
Font.registerHyphenationCallback(word => [word]);

import { styles } from './pdfStyles';
import { setValidationDateForPdf, setValidationDate, setExistingValidationDate } from 'src/selectors/pdfFunctions';

const CarAuthorizationPdf = ({ data, vehicleTypes, agent, gest, signature, reasons}) => {
  let chosenVehicleType = {};
  
  if (data.carType === 'personal-car' || data.type === 'personal-car') {
    chosenVehicleType = vehicleTypes.find((v) => v.id === 0);
  }
  else if (data.carType === 'company-car' || data.type === 'company-car') {
    chosenVehicleType = vehicleTypes.find((v) => v.id === 2);
  }
  else if (data.carType === 'rent-car' || data.type === 'rent-car') {
    chosenVehicleType = vehicleTypes.find((v) => v.id === 3);
  }
  
  let reasonsAsString = '';
  reasons.forEach((reason) => {
    if (data.reasons.indexOf(reason.id) >= 0) {
      reasonsAsString += reason.label + ' - ';
    }
  })
  console.log(data);
  const validationDate = signature ? (gest.validation_date ? setExistingValidationDate(gest.validation_date) : setValidationDate()) : null;

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>DEMANDE D’AUTORISATION D'UN VEHICULE </Text>
      </View>
      <Text style={styles.header.subtitle}>Décret n°2006-781 du 3 juillet 2006 article 10</Text>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>VÉHICULE</Text>
        <Text style={styles.section.text}>Type de véhicule choisi : {chosenVehicleType.name}</Text>
        <Text style={styles.section.text} />
        {chosenVehicleType.id === 0 &&  (
          <>
            <Text style={styles.section.notabene}>Produire obligatoirement la photocopie de la carte grise et de l’attestation d’assurance</Text>
            <Text style={[styles.section.text, {textDecoration: 'underline'}]}>Informations sur le véhicule :</Text>
            <Text style={{ textIndent: 10, fontFamily: 'RadjhaniBold'}}>Marque : <Text style={{fontFamily: 'Radjhani'}}>{data.make ?? data.vehicle.make}</Text></Text>
            <Text style={{ textIndent: 10, fontFamily: 'RadjhaniBold'}}>Immatriculation : <Text style={{fontFamily: 'Radjhani'}}>{data.licensePlate ?? data.vehicle.license_plate}</Text></Text>
            <Text style={{ textIndent: 10, fontFamily: 'RadjhaniBold'}}>Puissance fiscale : <Text style={{fontFamily: 'Radjhani'}}>{data.rating ?? data.vehicle.rating}</Text></Text>
            <Text style={{ textIndent: 10, fontFamily: 'RadjhaniBold'}}>Compagnie d'assurance : <Text style={{fontFamily: 'Radjhani'}}>{data.rating ?? data.vehicle.insurance}</Text></Text>
            <Text style={{ textIndent: 10, fontFamily: 'RadjhaniBold'}}>Numéro de Police : <Text style={{fontFamily: 'Radjhani'}}>{data.police ?? data.vehicle.police}</Text></Text>
          </>
        )}

      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>DÉPLACEMENT</Text>
        <Text style={[styles.section.text, {fontFamily: 'RadjhaniBold', marginBottom: 10}]}>Raisons justifiant l'utilisation d'un véhicule : <Text style={[styles.section.text, {fontFamily: 'Radjhani'}]}>{reasonsAsString} </Text> </Text>
        {data.otherReason && <Text style={[styles.section.text, {fontFamily: 'RadjhaniBold', marginBottom: 10}]}>Autres raisons justifiant l'utilisation d'un véhicule : <Text style={[styles.section.text, {fontFamily: 'Radjhani'}]}>{data.otherReason} </Text> </Text>}
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>En application de l’article 10 du décret n°2006-781 du 3 juillet 2006 fixant les conditions et les modalités de règlement des frais occasionnés par les déplacements temporaires des personnels civils de l’Etat, je soussigné(e) {agent.lastname.toUpperCase()} {agent.firstname} déclare décharger l’université de Nîmes de toute responsabilité dans le cadre d’un accident qui surviendrait lors du déplacement avec mon véhicule entre ma résidence administrative ou familiale et le lieu de la mission.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>SIGNATURES</Text>
        <View style={[{ display: 'flex', flexDirection: 'row'}]}>
          {/* <View style={{border: '1px solid #1a1a1a', width: '50%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {new Date().toLocaleDateString()}</Text>
            <Text style={{fontSize: 10}}>Signature de l'agent demandeur</Text>
            <Image source={agentSignature} style={styles.signature} />
          </View> */}
          <View style={{border: '1px solid #1a1a1a', width: '100%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le __ / __ / ____</Text>
            <Text style={{fontSize: 10}}>Signature du prêteur (le cas échéant)</Text>
          </View>
        </View>
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>DÉCISION</Text>
        <Text style={{marginBottom: 10}}>Bon pour accord : </Text>
        <View style={[styles.section.subsection, {height: 150, padding: 5}]}>
        <Text style={{fontSize: 10}}>Validé à Nîmes le {validationDate ? setValidationDateForPdf(validationDate) : '__/__/____'} {gest ? `, par ${gest.name} (${gest.role})` : ''}.</Text>
          <Text style={styles.section.text}>Signature de l'ordonnateur.rice (Président, DGS, VP) :</Text>
          {(signature && signature !== '') && (
            <Image
              src={signature}
              style={styles.header.image}
            />
          )}

        </View>
      </View>
    </Page>
);}

CarAuthorizationPdf.propTypes = {

};

export default CarAuthorizationPdf;
