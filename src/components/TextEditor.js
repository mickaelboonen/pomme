// TextEditor.js

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const TextEditor = ({ clearErrors, placeholder, formField }) => {
  const editorRef = useRef(null);

  const handleTextChange = () => {
    const htmlContent = getHTMLContent();
    const errorMessageElement = document.getElementById(formField + '-message');

    if ((htmlContent !== '<p><br></p>' || htmlContent !== '<p><br></p>') && errorMessageElement) {
      clearErrors(formField);
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
      placeholder: placeholder,
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
