import React, { useEffect, useState } from 'react';

import TextField from 'src/components/Fields/TextField';
import Address from 'src/components/Fields/Address';
import ButtonElement from 'src/components/Fields/ButtonElement';
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

  const [addressNumberArray, setAddressesNumber] = useState(numberAddressesArray);

  

  const addNewAddress = () => {
    // const addressesElement = document.getElementById('addresses');
    const newArray = [...addressNumberArray];
    newArray.push(addressNumberArray.length + 1);
    setAddressesNumber(newArray)
    console.log(newArray);
  }

  const handleDeleteAddress = (id) => {
    let newArray = [...addressNumberArray];

    newArray = addressNumberArray.filter((number) => number !== id);

    setAddressesNumber(newArray);
  }

  return (
    <>
      <div className='addresses'>
        {addressNumberArray.map((step) => (
          <Address
          key={step}
          disabled={disabled}
          addressType="de la mission"
          register={register}
          errors={errors}
          errorMessages={errorMessages}
          bisArray={bisArray}
          streetType={streetType}
          stepNumber={step}
          deleteAddress={handleDeleteAddress}
        />
        ))}
      </div>
      <div className="form__section-field-buttons" style={{marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <label className="form__section-field-label">Plusieurs missions dans un seul OM ?</label>
        <ButtonElement
          type="button"
          label="Ajouter une mission"
          handler={addNewAddress}
        />
      </div>
    </>
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
