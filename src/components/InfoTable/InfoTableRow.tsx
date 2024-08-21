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

const InfoTableRow: React.FC<{ rowData: TMission }> = ({ rowData }) => (
  <View style={styles.row}>
    <Text style={styles.title}>{rowData.title}</Text>
    <Text style={styles.description}>{rowData.description}</Text>
    <Text style={styles.quantity}>{rowData.quantity !== 0 ? rowData.quantity : ''}</Text>
    <Text style={styles.price}>{rowData.price !== 0 ? `${rowData.price}€` : ''}</Text>
    <Text style={styles.total}>
      {rowData.quantity * rowData.price !== 0 ? `${(rowData.quantity * rowData.price).toFixed(2)}€` : ''}
    </Text>
  </View>
);

export default InfoTableRow;
