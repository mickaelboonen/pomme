import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import classNames from 'classnames';
import { useSelector } from 'react-redux';
// import { Link, useLoaderData } from 'react-router-dom';
import { BlobProvider, Document } from '@react-pdf/renderer';

// import '../style.scss';


// Components



// Components
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

import { setValidationDate, setExistingValidationDate } from 'src/selectors/pdfFunctions';

// Actions
import ScienceEventPdf from 'src/components/PDF/ScienceEventPdf';
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';

const PdfProvider = ({ agentFullData, data, om, toggleViewer, watch, submitFunction}) => {

  const {
    app: { countries },
    vehicle: { vehicleTypes, staticReasons},
    tmp: { loader, signature}
  } = useSelector((state) => state);

  return (
    <div className='form__section'>
      <div className="form__section-field-buttons" style={{textAlign: 'center'}}>
        {!loader &&(
          <BlobProvider document={
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
          }>
            {({ blob }) => (
              <>
                <button type="button" onClick={() => { const data = watch(); data.file = new File([blob], data.name, {type: 'pdf'}); submitFunction(data);}}>
                  Valider le document
                </button>
                  <button type="button" id="viewer-opener" onClick={toggleViewer} style={{marginLeft: '1rem'}}>
                    VOIR
                  </button>
              </>
            )}
          </BlobProvider>
        )}
      </div>
    </div>
  );
}

PdfProvider.propTypes = {

};

export default PdfProvider;
