import { StyleSheet, View } from '@react-pdf/renderer';
import InfoTableHeader from './InfoTableHeader';
import InfoTableRow from './InfoTableRow';

const styles = StyleSheet.create({
  tableContainer: {
    fontSize: '10px',
    display: 'flex',
    position: 'absolute',
    top: 425,
    left: 50,
    width: '595px',
    flexDirection: 'column',
    gap: -1,
  },
});

const InfoTable: React.FC<{ id: string; invoiceDate: string; prevMonth: string; name: string }> = ({
  id,
  invoiceDate,
  prevMonth,
  name,
}) => {
  return (
    <View style={styles.tableContainer}>
      <InfoTableHeader />
      <InfoTableRow id={id} invoiceDate={invoiceDate} prevMonth={prevMonth} name={name} />
    </View>
  );
};

export default InfoTable;
