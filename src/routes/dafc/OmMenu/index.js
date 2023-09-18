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
import { fetchPendingOms, displayWantedDocs } from "src/reducer/omManager";


const OmMenu = () => {

  return (
    <main className="my-documents" style={{position: 'relative'}}>
      <PageTitle>Documents à valider</PageTitle>
      {/* <Tabs tabs={tabsToShow} handler={displayWantedSection} /> */}
      <div className='my-documents__files'>

        <div className={classNames('my-documents__files-buttons', {'my-documents__files-buttons--buttons-menu': true})}>
          <button style={{width: 'fit-content'}} onClick={() => {}}>
            <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': true})} />  {false ? 'Rafraîchir la liste' : ''}
          </button>
        </div>
      </div>
    </main>
  );
}

OmMenu.propTypes = {
};

export default OmMenu;
