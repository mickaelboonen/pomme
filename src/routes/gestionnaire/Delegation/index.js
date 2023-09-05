import React from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

import './style.scss';

// Components
import PageTitle from 'src/components/PageTitle';
import OmVisa from './OmVisa';

const Delegation = () => {  

  const id = Number(useLoaderData().searchParams.get('id'));
  
  const { agent: { user }, omManager: { pendingDocs } } = useSelector((state) => state);
  const currentOM = pendingDocs.find((om) => om.id === id);
  
  return (
    <div className='form-container'>
      <div className="form-page__title">
        <PageTitle>{currentOM.name}</PageTitle>
      </div>
      <OmVisa user={user} data={currentOM} />
    </div>
  );
};

export default Delegation;
