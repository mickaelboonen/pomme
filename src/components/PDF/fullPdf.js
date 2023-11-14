import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form";
import { Link, useLoaderData } from 'react-router-dom';
import { FaEye, FaDownload, FaEyeSlash } from 'react-icons/fa';
import { BlobProvider, Document, PDFViewer } from '@react-pdf/renderer';

import '../style.scss';

// Components
import TextareaField from 'src/components/Fields/TextareaField';
import ButtonElement from 'src/components/Fields/ButtonElement';
import FileField from 'src/components/Fields/FileField';
import CheckboxInput from 'src/components/Fields/CheckboxInput';
import FormSectionTitle from 'src/components/FormSectionTitle';
import RadioInput from 'src/components/Fields/RadioInput';
import HiddenField from 'src/components/Fields/HiddenField';
import { useDispatch, useSelector } from 'react-redux';
import ValidationMonitoringPdf from 'src/components/PDF/ValidationMonitoringPdf';
import OmPdf from 'src/components/PDF/OmPdf';
import OmAdvancePdf from 'src/components/PDF/OmAdvancePdf';

import { setValidationDate, setExistingValidationDate} from 'src/selectors/pdfFunctions';

// Actions
import { getSavedFileName } from 'src/selectors/formDataGetters';
import {  addEfMonitoringPdf,addOmMonitoringPdf } from 'src/reducer/omManager';
import { getDDMMYYDate } from 'src/selectors/dateFunctions';
import ScienceEventPdf from 'src/components/PDF/ScienceEventPdf';
import CarAuthorizationPdf from 'src/components/PDF/CarAuthorizationPdf';
import DispensationPdf from 'src/components/PDF/DispensationPdf';
import classNames from 'classnames';

const FullPdf = ({ data, user, gest, isOm, om}) => {

  const { app: { countries },
    vehicle: { vehicleTypes },
    tmp: { tmpAgent, agentProfessionalAddress, agentPersonalAddress, loader, signature, acSignature}
  } = useSelector((state) => state);
  // console.log(signature);

  const currentActor = om.management.workflow.find((actor) => actor.agent === user);
  const needsSignature = om.management.workflow.indexOf(currentActor) === om.management.workflow.length - 1;
//---------------------------------------------------------------------------

  // console.log("errors = ", errors);
  const agentFullData = {
    ...tmpAgent,
    ...agentProfessionalAddress,
    ...agentPersonalAddress
  };
  const staticReasons = [
    {
      id: "time",
      label: "Gain de temps",
    },
    {
      id: "no-public-transports",
      label: "Absence de transport en commun",
    },
    {
      id: "materials-transporting",
      label: "Obligation de transport de matériel lourd, encombrant, fragile",
    },
    {
      id: "handicap",
      label: "Handicap",
    },
    {
      id: "carpooling",
      label: "Transport d'autres missionnaires",
    },
  ];

  return (
    <Document>
      <OmPdf
        countries={countries}
        data={om}
        agent={agentFullData}
        vehicleTypes={vehicleTypes}
        manager={om.management}
        signature={signature ? signature.link : ''}
      />
      {data.advance.advance && (
        <OmAdvancePdf
          data={data.advance}
          validationDate={needsSignature ? setValidationDate() : ''}
          agent={agentFullData}
          gest={om.management.workflow.find((actor) => actor.current_status === 3)}
          signature={signature ? signature.link : ''}
          acSignature={acSignature ? acSignature.link : ''}
          acValidationDate={setExistingValidationDate(om.management.workflow.find((actor) => actor.role === "Agent Comptable").validation_date)}
          />
      )}
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
};

FullPdf.propTypes = {
};

export default FullPdf;
