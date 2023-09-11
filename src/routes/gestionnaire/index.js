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

const Gestionnaires = () => {

  const dispatch = useDispatch();

  const { omManager: { pendingDocs, loader, tabs, docsToDisplay }, agent: { user, agent }} = useSelector((state) => state);

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

  /**
   * Toggles the data accordingly to the clicked tab
   * @param object event 
   */
  const displayWantedSection = (event) => {

    const { id } = event.currentTarget;

    if (types.indexOf(id) > -1) {
      dispatch(displayWantedDocs(pendingDocs.filter((docs) => docs.type === id)))
    }
    else if (id === 'all') {
      dispatch(displayWantedDocs(pendingDocs))
    }
    else {
      types.forEach((type) => {
        if (type.includes(id)) {
          dispatch(displayWantedDocs(pendingDocs.filter((docs) => docs.type === type)))
        }
      })
    }
  };
  
  const refreshList = () => {
    dispatch(fetchPendingOms({cptLogin: user, roles: agent.roles, channel: agent.channel}));

  }
  
  return (
    <main className="my-documents" style={{position: 'relative'}}>
      <PageTitle>Documents à valider</PageTitle>
      <Tabs tabs={tabsToShow} handler={displayWantedSection} />
      <div className='my-documents__files'>
        {!loader && (
          <div className='my-documents__files-buttons my-documents__files-buttons--links-menu'>
            {docsToDisplay.map((doc) => {
              let link = '';
              if (doc.status === 2 ) {
                link = `/gestionnaire/${user}/valider-un-document/ordre-de-mission?etape=1&id=${doc.id}`;
              }
              else {
                link = `/gestionnaire/${user}/viser-un-document/ordre-de-mission?id=${doc.id}`;
              }
              return (
                <Link key={doc.id} to={link}>{doc.name}</Link>
              )
            })}
          {pendingDocs.length === 0 && (
            <p className='my-documents__files-message'>Aucun Ordre de Mission en attente</p>
          )}
          </div>
        )}
        {loader && (
          <p>Chargement des données</p>
        )}
        <div className={classNames('my-documents__files-buttons', {'my-documents__files-buttons--buttons-menu': agent.channel.length > 1})}>
          <button style={{width: 'fit-content'}} onClick={refreshList}>
            <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? 'Rafraîchir la liste' : ''}
          </button>
        </div>
      </div>
    </main>
);}

export default Gestionnaires;
