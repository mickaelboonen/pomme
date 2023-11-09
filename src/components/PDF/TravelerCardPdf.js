import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Assets
import Logo from 'src/assets/images/logo.png'
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';
import RadjhaniBoldFont from 'src/assets/fonts/Rajdhani-Bold.ttf';


Font.register({ family: 'Radjhani', src: RadjhaniFont });
Font.register({ family: 'RadjhaniBold', src: RadjhaniBoldFont });

// Create styles
import { styles } from './pdfStyles';

const TravelerCardPdf = ({ data, agent, contacts, agentAddress, programs}) => {
  
  // console.log(programs);
  const {address, address2, city, postCode } = agentAddress;
  const fullAddress = `${address} ${address2} ${postCode} ${city}`

  const sortedPrograms = {
    train: programs.filter((p) => p.sector === 'Ferroviaire'),
    plane: programs.filter((p) => p.sector === 'Aérien'),
  }

  const reverseDate = (date) => {
    const parts = date.split("-");
    return parts[2] + '-' + parts[1] + '-' + parts[0]
  }

  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>PROFIL VOYAGEUR</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>INFORMATIONS GÉNÉRALES</Text>

        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Nom de la société : Université de Nîmes</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Adresse : 5 rue du Docteur Georges Salan 30021 NÎMES Cedex 1</Text>
        <Text style={styles.section.text} />
        <Text style={styles.section.programSubtitle}>CONTACTS ADMINISTRATIFS</Text>
        <Text style={styles.section.text} />
        {contacts.map((c) => (
          <Text key={c.id} style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>{c.icon} {c.name}{c.phone !== '' ? ' - 04.66.36.' :''}{c.phone} </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>INFORMATIONS VOYAGEUR</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Prénom : {agent.firstname}</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Nom : {agent.lastname.toUpperCase()}</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Téléphone portable : {agent.telephone}</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Date de naissance : {agent.birthday}</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>Adresse : {fullAddress}</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>E-mail : {agent.email}</Text>
      </View>

      <View style={styles.section} wrap={false}>
        <Text style={[styles.section.title, {marginBottom: 0, borderBottom: 0}]} wrap={false}>INFORMATIONS DE TRANSPORTS</Text>
        {sortedPrograms.train.length > 0 && <Text style={styles.section.programSubtitle}>FERROVIAIRE</Text>}
        {sortedPrograms.train.map((p) => (
          <View style={styles.section.program} key={p.id}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.section.program.column}>N° carte {p.type === 'Abonnement' ? "d'abonnement" : 'de fidélité' } :</Text>
              <Text style={[styles.section.program.column, { borderRight: '1px solid #1a1a1a'}]}>{p.number}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.section.program.column}>Type : </Text>
              <Text style={[styles.section.program.column, { borderRight: '1px solid #1a1a1a'}]}>{p.name}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.section.program.column, { borderBottom: '1px solid #1a1a1a'}]}>Date d'expiration :</Text>
              <Text style={[styles.section.program.column, { borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a'}]}>{reverseDate(p.expiration)}</Text>
            </View>
          </View>
        ))}
        {sortedPrograms.plane.length > 0 && <Text style={styles.section.programSubtitle}>AERIEN</Text>}
        {sortedPrograms.plane.map((p) => (
          <View style={styles.section.program} key={p.id}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.section.program.column}>N° carte {p.type === 'Abonnement' ? "d'abonnement" : 'de fidélité' } :</Text>
              <Text style={[styles.section.program.column, { borderRight: '1px solid #1a1a1a'}]}>{p.number}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={styles.section.program.column}>Type : </Text>
              <Text style={[styles.section.program.column, { borderRight: '1px solid #1a1a1a'}]}>{p.name}</Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.section.program.column, { borderBottom: '1px solid #1a1a1a'}]}>Date d'expiration :</Text>
              <Text style={[styles.section.program.column, { borderBottom: '1px solid #1a1a1a', borderRight: '1px solid #1a1a1a'}]}>{reverseDate(p.expiration)}</Text>
            </View>
          </View>
        ))}
      </View>
    </Page>
);}

TravelerCardPdf.propTypes = {

};

export default TravelerCardPdf;
