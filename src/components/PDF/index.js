import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
// import Logo from 'src/assets/images/logo.svg'
import Logo from 'src/assets/images/logo.png'
// import SvgImage from './SvgImage';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '20',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: '1px solid red',
    height: 400,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    image: {
      width: '40%'
    },
    title: {
      width: '30%',
      color: 'red',
      fontWeight: 'bold'
    }
  }
});

const MyPDF = ({ data }) => {

  const dep = new Date(data.departure);
  const finalDep = `${dep.getDate()}-${dep.getMonth() + 1}-${dep.getFullYear()}`
  const depHour = `${dep.getHours()}H${dep.getMinutes()}}`; 

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>Ordre de Mission</Text>
      </View>
      <View style={styles.section}>

        <Text>Missionnaire</Text>
      </View>
      <View style={styles.section}>
        <Text>Mission</Text>
        <Text>Départ : {finalDep} à {depHour}</Text>
        <Text>Mission</Text>
        <Text>Mission</Text>
        <Text>Mission</Text>
      </View>
      <View style={styles.section}>
        <Text>Transports</Text>
      </View>
      <View style={styles.section}>
        <Text>Hébergement</Text>
      </View>
      <View style={styles.section}>
        <Text>Avance</Text>
      </View>
      <View style={styles.section}>
        <Text>Autres</Text>
      </View>
      <View style={styles.section}>
        <Text>Signature</Text>
      </View>
    </Page>
  </Document>
);}

MyPDF.propTypes = {

};

export default MyPDF;
