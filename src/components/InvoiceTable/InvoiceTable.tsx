import { StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    fontSize: '12px',
    display: 'flex',
    position: 'absolute',
    top: 400,
    left: 50,
    width: '595px',
    flexDirection: 'column',
    gap: -1,
  },
});

const InvoiceTable: React.FC<{ missions: TMission[] }> = ({ missions }) => (
  <View style={styles.tableContainer}>
    <InvoiceTableHeader />
    {missions.map((mission, index) => (
      <InvoiceTableRow key={index} rowData={mission} />
    ))}
    {Array.from({ length: 8 - missions.length }).map((_, index) => (
      <InvoiceTableRow key={index} rowData={{ title: '', description: '', quantity: 0, price: 0 }} />
    ))}
  </View>
);

export default InvoiceTable;
