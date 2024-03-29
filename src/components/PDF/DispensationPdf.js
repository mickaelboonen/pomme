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
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    fontSize:12,
    fontFamily: 'Radjhani',
    marginTop: 20,
    marginBottom: 20,
  },
  signature: {
    maxWidth: '100%',
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
    text: {
      marginBottom: '4',
    },
    notabene: {
      fontSize: 9,
      marginBottom: '4'
    },    
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    alignItems: 'center',
    width: '100%',
    image: {
      width: '40%',
    },
    title: {
      width: '50%',
      fontWeight: 700,
      fontSize: 24,
      textAlign: 'center'

    },
    subtitle: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 15,

    }
  }
});

const DispensationPdf = ({ data, agent, agentSignature}) => {
  
  //Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita cum accusamus dolore, ducimus quibusdam nam vitae. Quos maxime eos magni, iste non optio repudiandae at ipsa repellendus? Obcaecati cupiditate error delectus saepe iste magni vel illum ut. Aliquam error maxime explicabo, quis culpa, quia dolor at, excepturi quisquam laboriosam rem.

  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <Image
          src={Logo}
          style={styles.header.image}
        />
        <Text style={styles.header.title}>{data.type.toUpperCase()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>RAISONS DE LA DÉROGATION</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>{data.reasons}</Text>
        <Text style={styles.section.text} />
      </View>
      <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>REGLE DU GUIDE DES MISSIONS FAISANT L'OBJET D'UNE DEMANDE DE DÉROGATION</Text>
        <Text style={[styles.section.text, {paddingRight: 10, paddingLeft: 10, textAlign: 'justify'}]}>{data.rule}</Text>
      </View>
      {/* <View style={styles.section}>
        <Text style={styles.section.title} wrap={false}>SIGNATURE DU DEMANDEUR</Text>
        <View style={[{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
          <View style={{height: 100, padding: 5}}>
            <Text style={{fontSize: 10}}>Nîmes, le {new Date().toLocaleDateString()}</Text>
          </View>
          <View style={{height: 100, width: '50%', padding: 5}}>
            <Image source={agentSignature} style={styles.signature} />
          </View>
        </View>
      </View> */}

      <View style={styles.section} wrap={false}>
        <Text style={styles.section.title} wrap={false}>DÉCISION</Text>
        <Text style={{marginBottom: 10}}>Bon pour accord : </Text>
        <View style={[{ display: 'flex', flexDirection: 'row'}]}>
          <View style={{border: '1px solid #1a1a1a', width: '50%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nom et signature du directeur de département ou chef de service</Text>
            {/* <Image source={agentSignature} style={styles.signature} /> */}
          </View>
          <View style={{border: '1px solid #1a1a1a', width: '50%', height: 150, padding: 5}}>
            <Text style={{fontSize: 10}}>Nom et signature de l’ordonnateur ou son représentant</Text>

          </View>
        </View>
      </View>
    </Page>
  </Document>
);}

DispensationPdf.propTypes = {

};

export default DispensationPdf;
