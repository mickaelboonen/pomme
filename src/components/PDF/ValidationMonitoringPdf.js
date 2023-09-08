import React from 'react';
import PropTypes from 'prop-types';
import { Font, Document, Page, Text, View } from '@react-pdf/renderer';

// Assets
import RadjhaniFont from 'src/assets/fonts/Rajdhani-Medium.ttf';

// Selectors
import { getDDMMYYDate } from 'src/selectors/dateFunctions';

Font.register({ family: 'Radjhani', src: RadjhaniFont });

import { styles } from './pdfStyles';

const ValidationMonitoringPdf = ({ om, isGest, agent, gestData, user }) => {
  console.log(om.management.workflow);
  return (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={{textAlign: 'center', fontSize: "30"}}>BORDEREAU DE SIGNATURE</Text>
        <Text style={{fontSize: "15", textAlign: 'center', margin: '7'}}>{om.name}</Text>
      </View>
      <View style={[styles.section, {fontSize: '12'}]} wrap={false}>
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap", backgroundColor: "#e84e24", fontSize: '15', borderTop: '1px solid #1f1f1f', borderTop: '1px solid #1f1f1f'}}>
          <View style={{width: '20%', borderLeft: '1px solid #1f1f1f', borderRight: '1px solid #1f1f1f', padding: '5'}}>
            <Text>SIGNATAIRE</Text>
          </View>
          <View style={{width: '20%', borderRight: '1px solid #1f1f1f', padding: '5'}}>
            <Text>DATE</Text>
          </View>
          <View style={{width: '60%', borderRight: '1px solid #1f1f1f', padding: '5', fontWeight: "700"}}>
            <Text>ANNOTATION</Text>
          </View>
        </View>
        {isGest && (
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap", borderTop: '1px solid #1f1f1f' }}>
          <View style={{width: '20%', borderLeft: '1px solid #1f1f1f', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{agent.firstname + ' ' + agent.lastname}</Text>
            <Text>{agent.position}</Text>
          </View>
          <View style={{width: '20%', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{getDDMMYYDate(new Date())}</Text>
          </View>
          <View style={{width: '60%', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Text>ACTION : VISA</Text>
            <Text style={{fontSize: "10", marginTop: '5'}}>{gestData}
            </Text>
          </View>
        </View>
        )}
        {om.management.workflow.map((gest) => (
          <View key={gest.agent} style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap", borderTop: '1px solid #1f1f1f'}}>
            <View style={{width: '20%', borderLeft: '1px solid #1f1f1f', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text>{gest.agent}</Text>
              <Text>{gest.role}</Text>
            </View>
            <View style={{width: '20%', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {gest.validation_date !== null && <Text>{getDDMMYYDate(new Date(gest.validation_date))}</Text>}
            {/* <Text>{getDDMMYYDate(new Date(gest.validation_date))}</Text> */}
            </View>
            <View style={{width: '60%',borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              {gest.validation !== null && (
                <>
                  <Text>ACTION : {gest.role === 'DGS' ? 'SIGNATURE' : 'VISA'}</Text>
                  <Text style={{fontSize: "10", marginTop: '5'}}>{gest.comment}</Text>
                </>
              )}
            </View>
          </View>
        ))}
        {!isGest && (
          <>
            {om.management.workflow.map((gest) => (
              <View key={gest.agent} style={{display: 'flex', flexDirection: 'row', flexWrap: "wrap", borderTop: '1px solid #1f1f1f'}}>
                <View style={{width: '20%', borderLeft: '1px solid #1f1f1f', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Text>{gest.name}</Text>
                  <Text>{gest.role}</Text>
                </View>
                <View style={{width: '20%', borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                {gest.validation_date !== null && <Text>{getDDMMYYDate(new Date(gest.validation_date))}</Text>}
                {/* <Text>{getDDMMYYDate(new Date(gest.validation_date))}</Text> */}
                </View>
                <View style={{width: '60%',borderRight: '1px solid #1f1f1f', padding: '5', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  {gest.validation !== null && (
                    <>
                      <Text>ACTION : {gest.role === 'DGS' ? 'SIGNATURE' : 'VISA'}</Text>
                      <Text style={{fontSize: "10", marginTop: '5'}}>{gest.comment}</Text>
                    </>
                  )}
                </View>
              </View>
            ))}
          </>
        )}
        <View style={{borderTop: '1px solid #1f1f1f'}} />
      </View>
    </Page>
  </Document>
);}

ValidationMonitoringPdf.propTypes = {

};

export default ValidationMonitoringPdf;
