

/**
 * 
 * @param array path 
 * @returns string
 */
export const setDafcTitle = (path) => {

  const filteredPath = path.filter((e) => e !== '');

  let title = "";
  if (filteredPath[1] === 'états-de-frais' || filteredPath[1] === "%C3%A9tats-de-frais") {

    if (filteredPath.length > 2) {
      console.log(filteredPath.length);

      if (filteredPath[2] === 'contrôler' || filteredPath[2] === "contr%C3%B4ler") {
        title = 'Contrôler un état de frais';
      }
      else if (filteredPath[2] === 'valider') {
        title = 'Valider un état de frais';
      }
    }
    else {
      title = 'États de frais à valider';
    }
  }
  else if (filteredPath[1] === 'ordres-de-mission') {
    
    if (filteredPath.length > 2) {
      title = 'Saisir un ordre de mission';
    }
    else {
      title = 'Ordres de mission';
    }
  }
  return title;
}
