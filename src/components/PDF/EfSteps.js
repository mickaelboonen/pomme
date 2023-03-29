import React from 'react';
import PropTypes from 'prop-types';
import { Font, Text, View, StyleSheet } from '@react-pdf/renderer';

// Assets
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';
import { getDDMMYYDate, getHHMMTime } from '../../selectors/dateFunctions';


Font.register({ family: 'Radjhani', src: RadjhaniFont });

// Create styles
const styles = StyleSheet.create({
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
    row: {
      display: 'flex',
      borderLeft: '1px solid #1a1a1a',
      // borderBottom: '0',
      flexDirection: 'row',
      cell: {
        width: '50%',
        borderTop: '1px solid #1a1a1a',
        borderRight: '1px solid #1a1a1a',
        text: {
          textAlign: 'center',
        }
      },
      headerCell: {
        width: '50%',
        borderTop: '1px solid #1a1a1a',
        borderRight: '1px solid #1a1a1a',
        backgroundColor: '#c1c1c1',
        padding: '2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        textTransorm: 'uppercase',
        text: {
          textAlign: 'center',
        }
      }
    }
  }
});

const EfSteps = ({ steps, isTeaching }) => {
  
    console.log("LOOKATME = ", isTeaching);
  return (
  <View style={styles.section} wrap={false}>
    <Text style={styles.section.title} wrap={false}>ÉTAPES</Text>
    <View style={styles.section.row}>
      <View style={styles.section.row.headerCell}>
        <Text style={styles.section.row.headerCell.text}>ÉTAPES</Text>
      </View>
      <View style={styles.section.row.headerCell}>
        <Text style={styles.section.row.headerCell.text}>DATE</Text>
      </View>
      <View style={styles.section.row.headerCell}>
        <Text style={styles.section.row.headerCell.text}>HEURE</Text>
      </View>
      <View style={styles.section.row.headerCell}>
        <Text style={styles.section.row.headerCell.text}>COMMUNE</Text>
      </View>
      <View style={styles.section.row.headerCell}>
        <Text style={styles.section.row.headerCell.text}>MATIN : HEURES DE DÉBUT ET FIN DE COURS</Text>
      </View>
      <View style={[styles.section.row.headerCell, {borderRight: '1px solid #1a1a1a'}]}>
        <Text style={styles.section.row.headerCell.text}>APRES-MIDI : HEURES DE DÉBUT ET FIN DE COURS</Text>
      </View>
    </View>
    <Text style={styles.section.text} />
    <Text style={styles.section.text} />
    {steps.map((step) => {
      
      const day = getDDMMYYDate(new Date(step.departure));
      const departureHour = getHHMMTime(new Date(step.departureHour));
      const arrivalHour = getHHMMTime(new Date(step.arrivalHour));
      
      return (
        <View key={step.id}>
          <View style={styles.section.row}>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>Départ</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{day}</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{departureHour}</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{step.departurePlace}</Text>
            </View>
            {/* {isTeaching & ( */}
              <View style={styles.section.row.cell}>
                <Text style={styles.section.row.cell.text}>{step.amCourseBeginning}</Text>
              </View>
            {/* )} */}
            {/* {isTeaching & ( */}
            <View style={[styles.section.row.cell, {borderRight: '1px solid #1a1a1a'}]}>
              <Text style={styles.section.row.cell.text}>{step.amCourseEnding}</Text>
            </View>
            {/* )} */}
          </View>
          <View style={styles.section.row}>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>Arrivée</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{step.arrival}</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{arrivalHour}</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{step.arrivalPlace}</Text>
            </View>
            <View style={styles.section.row.cell}>
              <Text style={styles.section.row.cell.text}>{step.pmCourseBeginning}</Text>
            </View>
            <View style={[styles.section.row.cell, {borderRight: '1px solid #1a1a1a'}]}>
              <Text style={styles.section.row.cell.text}>{step.pmCourseEnding}</Text>
            </View>
          </View>
        </View>
    )})}
    <View style={{borderTop: '1px solid #1a1a1a'}} />
  </View>
);}

EfSteps.propTypes = {

};

export default EfSteps;
