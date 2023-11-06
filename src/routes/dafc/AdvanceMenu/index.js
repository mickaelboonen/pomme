import React  from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MdRefresh } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

// Components
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

// Action
import { fetchPendingsAdvances } from 'src/reducer/dafc';


const OmMenu = () => {

  const dispatch = useDispatch();
  const { dafc: { pendingDocs, loader } } = useSelector((state) => state)
  // const target = isOm ? 'ordre-de-mission' : encodeURIComponent('état-de-frais')
  const tab = [
    {
      id: 'daf',
      name : "Demandes d'avance"
    }
  ];

  const handleRefresh = () => {
    dispatch(fetchPendingsAdvances())
  }

  return (
    <main className="my-documents">
      <PageTitle>Demandes d'Avance à signer</PageTitle>
      <Tabs tabs={tab} handler={() => {}} />
      <div className='my-documents__files'>

      <div className={classNames('my-documents__files-buttons', {'my-documents__files-buttons--buttons-menu': loader})}>
          {pendingDocs.map((doc) => (
            <Link key={doc.id} to={`/dafc/demandes-d-avance/${encodeURIComponent('demande-à-signer')}?id=${doc.id}`}>Avance n°{doc.id}</Link>
          ))}
        </div>
        <div className='my-documents__files-buttons'>
          <button style={{width: 'fit-content'}} onClick={handleRefresh}>
            <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? 'Rafraîchir la liste' : ''}
          </button>
        </div>
      </div>
    </main>
  );
}

OmMenu.propTypes = {
};

export default OmMenu;
