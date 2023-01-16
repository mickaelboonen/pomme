import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: '1px solid red'
  }
});

const MyPDF = ({ data }) => {

  console.log(data);

  const dep = new Date(data.departure);
  const finalDep = `${dep.getDate()}-${dep.getMonth() + 1}-${dep.getFullYear()}`
  const depHour = `${dep.getHours()}H${dep.getMinutes()}}`
  console.log(finalDep);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Missionnaire</Text>
        Qualité : Madame ; Monsieur
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
