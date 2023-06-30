import React from "react";

import DAFC from "src/routes/dafc";
import OmToGFC from "src/routes/dafc/OmToGFC";
import EfControl from "src/routes/dafc/EfControl";
import EfValidation from "src/routes/dafc/EfValidation";
import MyDocuments from "src/routes/utilisateur/MyDocuments";

export default {
  path: 'dafc/',
  children: [
    {
      path: 'ordres-de-mission/',
      children: [
        {
          index: true,
          element: <DAFC title="Ordres de mission à contrôler" />
        },
        {
          path: 'saisir-un-ordre/:id',
          element: <OmToGFC />
        }
      ],
    },
    {
      path: 'états-de-frais/',
      children: [
        {
          index: true,
          element: <DAFC title="États de frais à valider" />
        },
        {
          path: 'valider/:id',
          element: <EfValidation />
        },
        {
          path: 'contrôler/:id',
          element: <EfControl />
        }
      ],
    },
    {
      path: '%C3%A9tats-de-frais/',
      children: [
        {
          index: true,
          element: <DAFC title="États de frais à valider" />
        },
        {
          path: 'valider/:id',
          element: <EfValidation />
        },
        {
          path: 'contr%C3%B4ler/:id',
          element: <EfControl />
        }
      ],
    },
    {
      path: '%C3%A9tats-de-frais',
      element: <MyDocuments />
    },
    {
      path: 'états-de-frais',
      element: <MyDocuments />
    },
  ]
};
