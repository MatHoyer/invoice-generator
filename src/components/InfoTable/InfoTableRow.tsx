import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    gap: -1,
    minHeight: '15px',
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

const InfoTableRow: React.FC<{ id: string; invoiceDate: string; prevMonth: string; name: string }> = ({
  id,
  invoiceDate,
  prevMonth,
  name,
}) => (
  <View style={styles.row}>
    <Text style={styles.num}>{id}</Text>
    <Text style={styles.date}>{invoiceDate}</Text>
    <Text style={styles.period}>{prevMonth}</Text>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export default InfoTableRow;
