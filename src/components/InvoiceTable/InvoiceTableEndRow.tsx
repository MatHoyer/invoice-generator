import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    gap: -1,
    minHeight: '15px',
  },
  title: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  description: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  quantity: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  price: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingRight: '5px',
    textAlign: 'right',
  },
  total: {
    width: '100px',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '1px solid black',
  },
});

const InvoiceTableEndRow: React.FC<{ line: string; data: number }> = ({ line, data }) => (
  <View style={styles.row}>
    <Text style={styles.title}></Text>
    <Text style={styles.description}></Text>
    <Text style={styles.quantity}></Text>
    <Text style={{ ...styles.price, fontFamily: 'Inter', fontWeight: line !== 'TOTAL HT' ? 400 : 700 }}>{line}</Text>
    <Text style={styles.total}>{data.toFixed(2)}€</Text>
  </View>
);

export default InvoiceTableEndRow;
