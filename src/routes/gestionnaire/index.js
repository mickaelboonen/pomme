import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdRefresh } from 'react-icons/md'

import './style.scss';
import Tabs from 'src/components/Tabs';
import PageTitle from 'src/components/PageTitle';

import { fetchPendingOms } from "src/reducer/omManager";
import classNames from 'classnames';

const Gestionnaires = () => {

  const dispatch = useDispatch();

  const { omManager: { pendingDocs, loader, tabs }, agent: { user, agent }} = useSelector((state) => state);

  const types = [];

  pendingDocs.forEach((doc) => {
    if (types.indexOf(doc.type) === -1) {
      types.push(doc.type);
    }
  })
  
  const tabsToShow = [];
  if (types.length > 1) {
    tabsToShow.push({id: 'all', name: 'Tous les documents'})
  }
  
  types.forEach((tab) => {
    
    const tabData = tabs.find((channel) => tab.includes(channel.id));
    const newLabel = `${tabData.name} (${pendingDocs.filter((doc) => doc.type === tab).length})`;

    tabsToShow.push({id: tabData.id, name: newLabel});
  })

  if (types.length === 0) {
    tabsToShow.push({id: 'none', name: 'Documents à valider'})
  }

  console.log();

  const [docsToShow, setDocsToShow] = useState(pendingDocs);

  /**
   * Toggles the data accordingly to the clicked tab
   * @param object event 
   */
  const displayWantedSection = (event) => {

    const { id } = event.currentTarget;

    if (types.indexOf(id) > -1) {
      
      setDocsToShow(pendingDocs.filter((docs) => docs.type === id));
    }
    else if (id === 'all') {
      setDocsToShow(pendingDocs);
    }
    else {
      types.forEach((type) => {
        if (type.includes(id)) {
          setDocsToShow(pendingDocs.filter((docs) => docs.type === type));

        }
      })
    }
  };
  
  const refreshList = () => {
    dispatch(fetchPendingOms({cptLogin: user, roles: agent.roles, channel: agent.channel}));

  }

  // /**
  //  * When a manager has many roles, they need to fetch different om lists
  //  * @param {*} event 
  //  */
  // const fetchNewPendingOms = (event) => {
  //   // dispatch(fetchPendingOms({type: event.target.textContent, status: 2}));
  // }
  
  return (
    <main className="my-documents">
      <PageTitle>Documents à valider</PageTitle>
      <Tabs tabs={tabsToShow} handler={displayWantedSection} />
        <div className='my-documents__files'>
        {!loader && (
          <div className='my-documents__files-buttons my-documents__files-buttons--links-menu'>
          {docsToShow.map((doc) => (
            <Link key={doc.id} to={`/gestionnaire/${user}/valider-un-document/ordre-de-mission?etape=1&id=${doc.id}`}>{doc.name}</Link>
          ))}
          {pendingDocs.length === 0 && (
            <p className='my-documents__files-message'>Aucun Ordre de Mission en attente</p>
          )}
          </div>
        )}
        <div className={classNames('my-documents__files-buttons', {'my-documents__files-buttons--buttons-menu': agent.channel.length > 1})}>
          {/* {agent.channel.length === 1 && ( */}
            <button style={{width: 'fit-content'}} onClick={refreshList}>
              <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? 'Rafraîchir la liste' : ''}
            </button>
          {/* )} */}
          {/* {agent.channel.length > 1 && (
            <>
              {agent.channel.map((button) => (
                <button style={{width: 'fit-content'}} onClick={fetchNewPendingOms}>
                  <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? button : ''}
                </button>
              ))}
            </>
          )} */}
        </div>
      </div>
    </main>
);}

export default Gestionnaires;
