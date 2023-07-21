import React from 'react';
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

  const { omManager: { pendingDocs, loader }, agent: { user, agent }} = useSelector((state) => state);
    
  const tabs = [
    {
      id: 'om',
      name: 'Ordres de Missions',
    },
    {
      id: 'ef',
      name: 'États de frais',
    }
  ]

  /**
   * Toggles the section according to the clicked tab
   * @param object event 
   */
  const displayWantedSection = (event) => {

    const wantedSection = document.querySelector(`#${event.currentTarget.id}-section`);
    const allSections = document.querySelectorAll('.my-documents__files');

    allSections.forEach((currentSection) => {
      if (currentSection === wantedSection) {
        wantedSection.classList.add('my-documents__files--open');
      }
      else {
        currentSection.classList.remove('my-documents__files--open');
      }
    })
  };
  
  const refreshList = () => {
    dispatch(fetchPendingOms({type: agent.channel[0], status: 2}));
  }

  /**
   * When a manager has many roles, they need to fetch different om lists
   * @param {*} event 
   */
  const fetchNewPendingOms = (event) => {
    dispatch(fetchPendingOms({type: event.target.textContent, status: 2}));
  }
  
  return (
    <main className="my-documents">
      <PageTitle>Documents à valider</PageTitle>
      <Tabs tabs={tabs} handler={displayWantedSection} />
        <div className='my-documents__files'>
        {!loader && (
          <div className='my-documents__files-buttons my-documents__files-buttons--links-menu'>
          {pendingDocs.map((doc) => (
            <Link key={doc.id} to={`/gestionnaire/${user}/valider-un-document/ordre-de-mission?etape=1&id=${doc.id}`}>{doc.name}</Link>
          ))}
          {pendingDocs.length === 0 && (
            <p className='my-documents__files-message'>Aucun Ordre de Mission en attente</p>
          )}
          </div>
        )}
        <div className={classNames('my-documents__files-buttons', {'my-documents__files-buttons--buttons-menu': agent.channel.length > 1})}>
          {agent.channel.length === 1 && (
            <button style={{width: 'fit-content'}} onClick={refreshList}>
              <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? 'Rafraîchir la liste' : ''}
            </button>
          )}
          {agent.channel.length > 1 && (
            <>
              {agent.channel.map((button) => (
                <button style={{width: 'fit-content'}} onClick={fetchNewPendingOms}>
                  <MdRefresh className={classNames('my-documents__files-buttons-icon', {'my-documents__files-buttons-icon--animated': loader})} />  {!loader ? button : ''}
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </main>
);}

export default Gestionnaires;
