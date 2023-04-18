
import { StyleSheet } from '@react-pdf/renderer';

// Create styles
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
    fontSize:10,
    fontFamily: 'Radjhani',
    marginTop: 20,
    marginBottom: 20,
  },
  signature: {
    // maxWidth: 100,
    // height: 100,
  },
  firstSection: {
    padding: 10,
  },
  flexSection: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #1a1a1a',
  },
  halfSection: {
    width: '50%',
    padding:'0 8 8',
    // border: '1px solid red'
  },
  separator: {
    border: '1px solid #1a1a1a'
  },
  section: {
    margin: '0 10',
    // marginTop: 0,
    padding: '0 10 10',
    title: {
      fontSize: 14,
      border: '1px solid #1a1a1a',
      backgroundColor: '#c1c1c1',
      fontWeight: 'bold',
      padding:'8',
      marginBottom: '8'
    },
    subsection: {
      border: '1px solid #1a1a1a',
      padding:'8'
    },
    text: {
      marginBottom: '4',
    },
    longtext: {
      width: '60%',
      color: 'red'
    },
    notabene: {
      color: '#111',
      fontSize: '8',
      marginBottom: '4',
    },
    gest: {
      // flexGrow: 1,
      borderTop: '1px solid #1a1a1a',
      borderLeft: '1px solid #1a1a1a',
      width: '17%'
    },
    efArray: {
      display: 'flex',
      borderBottom: '1px solid #1a1a1a',
      borderLeft: '1px solid #1a1a1a',
      flexDirection: 'row',
      first: {
        width: '50%',
        text: {
          paddingLeft: '10',
        }
      },
      second: {
        width: '50%',
        borderRight: '1px solid #1a1a1a',
        borderLeft: '1px solid #1a1a1a',
        text: {
          textAlign: 'center',
          paddingLeft: '10',
          width: '100%'
        }
      },
      title: {
        textTransform: 'uppercase',
        backgroundColor: '#c1c1c1',
        textAlign: 'center',
        fontWeight: 'bold',
        padding: '2',
        borderTop: '1px solid #1a1a1a',
      }
    },
    row: {
      display: 'flex',
      borderLeft: '1px solid #1a1a1a',
      flexDirection: 'row',
      cell: {
        width: '50%',
        borderTop: '1px solid #1a1a1a',
        borderRight: '1px solid #1a1a1a',
        text: {
          textAlign: 'center',
        }
      },
      headerCell: {
        width: '50%',
        borderTop: '1px solid #1a1a1a',
        borderRight: '1px solid #1a1a1a',
        backgroundColor: '#c1c1c1',
        padding: '2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        textTransorm: 'uppercase',
        text: {
          textAlign: 'center',
        }
      }
    }
    
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    image: {
      width: '40%',
    },
    title: {
      width: '50%',
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center'

    },
    subtitle: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 15,

    }
  }
});
