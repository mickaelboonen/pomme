import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Document, PDFViewer } from '@react-pdf/renderer';

// Sélecteurs
import { setValidationDate, setExistingValidationDate } from 'src/selectors/pdfFunctions';

// PDFs
import ScienceEventPdf from 'src/components/PDF/ScienceEventPdf';
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

const FullPdfDocument = ({ agentFullData, data, om }) => {
  return (
    <Document>
      <OmPdf
        countries={countries}
        data={om}
        agent={agentFullData}
        vehicleTypes={vehicleTypes}
        manager={om.management}
        signature={''}
      />
      <OmAdvancePdf
        data={data.advance}
        acValidationDate={setValidationDate()}
        validationDate={''}
        agent={agentFullData}
        gest={om.management.workflow.find((actor) => actor.current_status === 3)}
        acSignature={signature ? signature.link : ''}
      />
      {data.transports.authorizations.length > 0 && data.transports.authorizations.map((auth) => (
        <CarAuthorizationPdf
          key={'c-a-' + data.transports.authorizations.indexOf(auth)}
          data={auth}
          agent={agentFullData}
          vehicleTypes={vehicleTypes}
          reasons={staticReasons}
        />
      ))}
      {data.transports.dispensations.length > 0 && data.transports.dispensations.map((disp) => (
        <DispensationPdf
          key={'d-' + data.transports.dispensations.indexOf(disp)}
          data={disp}
        />
      ))}
      {data.mission.scientificEvents.length > 0 && data.mission.scientificEvents.map((event) => (
        <ScienceEventPdf
          key={'s-e-' + data.mission.scientificEvents.indexOf(event)}
          data={event}
          agent={agentFullData}
          creationDate={setExistingValidationDate(data.created_at)}
        />
      ))}
    </Document>
  );
}

FullPdfDocument.propTypes = {

};

export default FullPdfDocument;
