import React from 'react';
import PropTypes from 'prop-types';
import { Font, Text, View } from '@react-pdf/renderer';

// Assets
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';
import { getDDMMYYDate, getHHMMTime } from 'src/selectors/dateFunctions';


Font.register({ family: 'Radjhani', src: RadjhaniFont });

// Create styles
import { styles } from './pdfStyles';

const EfSteps = ({ steps, isTeaching }) => {
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
    {steps.map((step) => (
      <View key={step.id}>
        <View style={styles.section.row}>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>Départ</Text>
          </View>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>{getDDMMYYDate(new Date(step.departure))}</Text>
          </View>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>{getHHMMTime(new Date(step.departureHour))}</Text>
          </View>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>{step.departurePlace}</Text>
          </View>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>{step.amCourseBeginning}</Text>
          </View>
          <View style={[styles.section.row.cell, {borderRight: '1px solid #1a1a1a'}]}>
            <Text style={styles.section.row.cell.text}>{step.amCourseEnding}</Text>
          </View>
        </View>
        <View style={styles.section.row}>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>Arrivée</Text>
          </View>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>{step.arrival ? getDDMMYYDate(new Date(step.arrival)): step.arrival}</Text>
          </View>
          <View style={styles.section.row.cell}>
            <Text style={styles.section.row.cell.text}>{getHHMMTime(new Date(step.arrivalHour))}</Text>
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
    ))}
    <View style={{borderTop: '1px solid #1a1a1a'}} />
  </View>
);
}

EfSteps.propTypes = {

};

export default EfSteps;
