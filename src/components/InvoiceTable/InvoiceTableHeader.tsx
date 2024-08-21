import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    gap: -1,
  },
  title: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  description: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  quantity: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  price: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
  total: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.row}>
    <Text style={styles.title}>PROJET</Text>
    <Text style={styles.description}>DESCRIPTION</Text>
    <Text style={styles.quantity}>QUANTITE</Text>
    <Text style={styles.price}>PRIX UNITAIRE</Text>
    <Text style={styles.total}>TOTAL</Text>
  </View>
);

export default InvoiceTableHeader;
