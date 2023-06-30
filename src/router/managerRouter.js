import React from "react";

import Gestionnaires from "src/routes/gestionnaire";
import DocRefusalForm from "src/routes/gestionnaire/DocRefusal";
import DocValidationForm from "src/routes/gestionnaire/DocValidationForm";

export default {
  path: 'gestionnaire/:slug/',
  children: [
    {
      path: 'documents-a-signer',
      element: <Gestionnaires />,
    },
    {
      path: 'valider-un-document/:slug/:id',
      element: <DocValidationForm />,
    },
    {
      path: 'refuser-un-ordre-de-mission/:id',
      element: <DocRefusalForm />,
    },
  ]
};
