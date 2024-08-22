import { StyleSheet, View } from '@react-pdf/renderer';
import InvoiceTableEndRow from './InvoiceTableEndRow';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    fontSize: '11px',
    display: 'flex',
    position: 'absolute',
    top: 500,
    left: 50,
    width: '595px',
    flexDirection: 'column',
    gap: -1,
  },
});

const InvoiceTable: React.FC<{ missions: TMission[] }> = ({ missions }) => {
  const totalHT = missions.reduce((acc, mission) => acc + mission.quantity * mission.price, 0);
  const totalTVA = totalHT * 0.21;
  const totalTTC = totalHT + totalTVA;

  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      {missions.map((mission, index) => (
        <InvoiceTableRow key={index} rowData={mission} />
      ))}
      {Array.from({ length: 8 - missions.length }).map((_, index) => (
        <InvoiceTableRow key={index} rowData={{ title: '', description: '', quantity: 0, price: 0 }} />
      ))}
      <InvoiceTableEndRow line="TOTAL HT" data={totalHT} />
      <InvoiceTableEndRow line="TVA 21%" data={totalTVA} />
      <InvoiceTableEndRow line="TOTAL TTC" data={totalTTC} />
    </View>
  );
};

export default InvoiceTable;
