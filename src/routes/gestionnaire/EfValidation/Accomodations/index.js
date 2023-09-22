import React from 'react';
import PropTypes from 'prop-types';

import '../style.scss';

// Components
import FormSectionTitle from 'src/components/FormSectionTitle';
import InputValueDisplayer from '../InputValueDisplayer';
import FileHandler from '../FileHandler';

const AccomodationsVal = ({ data, displayPdf, entity, missionRegion }) => {  
  return (
    <>
      <div className="form__section">
        <FormSectionTitle>Hébergement</FormSectionTitle>

        <InputValueDisplayer
          label="Nombre de nuits à l'hôtel"
          value={data.nights_number}
        />
        <InputValueDisplayer
          label="Montant de l'hôtel"
          value={data.hotel}
        />
        <InputValueDisplayer
          label="Règlement de l'hôtel"
          value={data.hotel_payment === 'agent' ? "Avancé par l'agent" : "Payé par Unîmes"}
        />
        {data.hotel_files.map((file) => (
          <FileHandler
            key={data.hotel_files.indexOf(file)}
            label="Facture.s nominative.s acquittée.s"
            dataLink={file.dataLink}
            url={file.file.url}
            displayPdf={displayPdf}
            entity={entity}
            entityId={data.id}
            status={file.file.status}
          />
        ))}
      </div>
      <div className="form__section">
        <FormSectionTitle>Repas</FormSectionTitle>
        
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent en restaurant administratif"
          value={data.meals_in_admin_restaurants ?? 0}
        />
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent"
          value={data.meals_paid_by_agent_in_france}
        />
        <InputValueDisplayer
          label="Nombre de repas payés par l'agent"
          value={data.free_meals_in_france}
        />
        
        {missionRegion === "étranger" && (
          <>
            <InputValueDisplayer
              label="Nombre de repas payés par l'agent"
              value={data.meals_paid_by_agent_overseas}
            />
            <InputValueDisplayer
              label="Nombre de repas payés par l'agent en restaurant administratif"
              value={data.overseas_free_meals}
            />
          </>
        )}
      </div>
      {data.event_files.length > 0 && (
        <div className="form__section">
          <FormSectionTitle>Événements</FormSectionTitle>
          <InputValueDisplayer
            label="Montant payé pour le ou les événements"
            value={data.event}
          />
          {data.event_files.map((file) => (
            <FileHandler
              key={data.event_files.indexOf(file)}
              label="Facture.s nominative.s acquittée.s"
              dataLink={file.dataLink}
              url={file.file.url}
              displayPdf={displayPdf}
              entity={entity}
              entityId={data.id}
              status={file.file.status}
            />
          ))}
        </div>
      )}
    </>
  );
};

AccomodationsVal.propTypes = {
};

export default AccomodationsVal;
