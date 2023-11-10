// TextEditor.js

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = ({ clearErrors, error }) => {
  const editorRef = useRef(null);

  const handleTextChange = () => {
    const htmlContent = getHTMLContent();
    const errorMessageElement = document.getElementById('tickets-message');

    if ((htmlContent !== '<p><br></p>' || htmlContent !== '<p><br></p>') && errorMessageElement) {
      clearErrors('tickets');
    }
  };

  const getHTMLContent = () => {
    return editorRef.current.querySelector('.ql-editor').innerHTML;
  };


  useEffect(() => {
    const quill = new Quill(editorRef.current, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'color': [] }],        
        ]
      },
      placeholder: "Veuillez renseigner votre demande de billets à destination de l'Agence. Veuillez effacer les informations inutiles sur le modèle de billets.",
      theme: 'snow'  // or 'bubble'
    });

    quill.on('text-change', handleTextChange);
    // Si vous souhaitez récupérer le contenu de l'éditeur, vous pouvez utiliser quill.getContents() ou quill.getText()

    return () => {
      quill.off('text-change');
      // quill.remove();
    };
  }, []);

  return (
    <div className='editor-container'>
      <div ref={editorRef} />
    </div>
  );
};

export default TextEditor;
