import React, { useEffect, useState } from 'react';

import TextField from 'src/components/Fields/TextField';
import Address from 'src/components/Fields/Address';
import SelectField from 'src/components/Fields/SelectField';
import HiddenField from 'src/components/Fields/HiddenField';


import './style.scss';

const Address2 = ({
  addressType,
  data,
  register,
  errors,
  disabled,
  errorMessages,
  suffixe
}) => {  

  const bisArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  
  const streetType = [
    {
      id: 'R',
      name: "Rue",
    },
    {
      id: 'CIT',
      name: "Cité",
    },
    {
      id: 'AV',
      name: "Avenue",
    },
    {
      id: 'CHE',
      name: "Chemin",
    },
    {
      id: 'BD',
      name: "Boulevard",
    },
    {
      id: 'IMP',
      name: "Impasse",
    },
    {
      id: 'ALL',
      name: "Allée",
    },
    {
      id: 'QUA',
      name: "Quartier",
    },
    {
      id: 'LOT',
      name: "Lot",
    },
    {
      id: 'PL',
      name: "Place",
    },
    {
      id: 'PAS',
      name: "Passage",
    },
    {
      id: 'RTE',
      name: "Route",
    },
    {
      id: 'DOM',
      name: "Domaine",
    },
    {
      id: 'RES',
      name: "Résidence",
    },
    {
      id: 'HAM',
      name: "Hameau",
    },
    {
      id: 'QU',
      name: "Quai",
    },
    {
      id: 'SQ',
      name: "Square",
    },
  ];
  
  const numberAddressesArray = [];
  for(let i = 1; i <= data.length; i++) {
    numberAddressesArray.push(i);
  }
  if (data.length === 0) {
    numberAddressesArray.push(1);
  }

  const [addressesNumber, setAddressesNumber] = useState(numberAddressesArray);

  
  return (
    <div className='addresses'>
      {addressesNumber.map((step) => (
        <Address
        key={step}
        data={data[step -1]}
        disabled={disabled}
        addressType="de la mission"
        register={register}
        errors={errors}
        errorMessages={errorMessages}
        bisArray={bisArray}
        streetType={streetType}
        stepNumber={step}
      />
      ))}
    </div>
  );
};

Address2.propTypes = {

};

Address2.defaultProps = {
  suffixe: '',
  disabled: false,
  errors: {},
  errorMessages: {
    streetName: null,
    streetNumber: null,
    streetType: null,
    postCode: null,
    city: null,
    bis: null,
  },
};

export default Address2;
