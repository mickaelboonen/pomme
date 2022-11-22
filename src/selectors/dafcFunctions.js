

/**
 * 
 * @param array path 
 * @returns string
 */
export const setDafcTitle = (path) => {

  const filteredPath = path.filter((e) => e !== '');
  
  let title = "";

  if (filteredPath[1] === 'états-de-frais' || filteredPath[1] === "%C3%A9tats-de-frais") {

    title = 'États de frais à valider';

  }
  else if (filteredPath[1] === 'ordres-de-mission') {

    title = 'Ordres de mission';

  }
  return title;
}
