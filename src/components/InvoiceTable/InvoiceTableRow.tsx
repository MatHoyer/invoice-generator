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
    paddingVertical: '5px',
    paddingHorizontal: '2px',
    border: '1px solid black',
  },
  description: {
    width: '100px',
    paddingVertical: '5px',
    paddingHorizontal: '2px',
    border: '1px solid black',
  },
  quantity: {
    width: '100px',
    paddingVertical: '5px',
    paddingHorizontal: '2px',
    border: '1px solid black',
  },
  price: {
    width: '100px',
    paddingVertical: '5px',
    paddingHorizontal: '2px',
    border: '1px solid black',
  },
  total: {
    width: '100px',
    paddingVertical: '5px',
    paddingHorizontal: '2px',
    border: '1px solid black',
  },
});

const InvoiceTableRow: React.FC<{ rowData: TMission }> = ({ rowData }) => {
  const title = rowData.title.split('');
  const description = rowData.description.split('');

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.quantity}>{rowData.quantity !== 0 ? rowData.quantity : ''}</Text>
      <Text style={styles.price}>{rowData.price !== 0 ? `${rowData.price}€` : ''}</Text>
      <Text style={styles.total}>
        {rowData.quantity * rowData.price !== 0 ? `${(rowData.quantity * rowData.price).toFixed(2)}€` : ''}
      </Text>
    </View>
  );
};

export default InvoiceTableRow;
