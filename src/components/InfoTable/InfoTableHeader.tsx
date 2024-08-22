import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    gap: -1,
  },
  num: {
    width: '125px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  date: {
    width: '125px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  period: {
    width: '125px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  name: {
    width: '125px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
});

const InfoTableHeader = () => (
  <View style={{ ...styles.row, fontFamily: 'Inter', fontWeight: 700 }}>
    <Text style={{ ...styles.num }}>NUMERO DE FACTURE</Text>
    <Text style={styles.date}>DATE DE FACTURE</Text>
    <Text style={styles.period}>PERIODE</Text>
    <Text style={styles.name}>DEMANDEUR</Text>
  </View>
);

export default InfoTableHeader;
