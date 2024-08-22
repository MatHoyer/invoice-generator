import { useLocalstorage } from '@/hooks/useLocalstorage';
import { capitalize, DateString, getDateAsString } from '@/lib/utils';
import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { subMonths } from 'date-fns';
import InfoTable from './InfoTable/InfoTable';
import InvoiceTable from './InvoiceTable/InvoiceTable';

const Pdf: React.FC<{ missions: TMission[] }> = ({ missions }) => {
  const [localMe, setLocalMe] = useLocalstorage<TMe>('me', {
    name: '',
    address: '',
    tel: '',
    email: '',
    iban: '',
    tva: '',
    bic: '',
    bankName: '',
    bankAddress: '',
  });
  const [localClient, setLocalClient] = useLocalstorage<TClient>('client', {
    name: '',
    address: '',
    tva: '',
    iban: '',
  });
  const [localInvoice, setLocalInvoice] = useLocalstorage<TInvoice>('invoice', {
    number: 0,
  });

  Font.register({
    family: 'Inter',
    fonts: [
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf',
        fontWeight: 100,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf',
        fontWeight: 200,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf',
        fontWeight: 300,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
        fontWeight: 400,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf',
        fontWeight: 500,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf',
        fontWeight: 600,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf',
        fontWeight: 700,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf',
        fontWeight: 800,
      },
      {
        src: 'http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf',
        fontWeight: 900,
      },
    ],
  });

  const id = new Date().getFullYear() + '/' + '0'.repeat((localInvoice.number || 0) % 10) + localInvoice.number;
  const invoiceDate = getDateAsString(new Date(), DateString.short);
  const prevMonth = capitalize(getDateAsString(subMonths(new Date(), 1), DateString.monthNyear));

  return (
    <Document
      title={
        '0'.repeat((localInvoice.number || 0) % 10) +
        localInvoice.number +
        ' - ' +
        getDateAsString(subMonths(new Date(), 1), DateString.month) +
        ' - ' +
        missions[0]?.title
      }
    >
      <Page size="A4">
        <View style={{ fontSize: '12px', position: 'absolute', top: 50, left: 50, gap: '2px' }}>
          <Text style={{ fontSize: '14px', fontFamily: 'Inter', fontWeight: 700 }}>{localMe.name}</Text>
          <Text style={{ paddingTop: '18px', flexWrap: 'wrap', maxWidth: '120px' }}>{localMe.address}</Text>
          <Text>Téléphone : {localMe.tel}</Text>
          <Text>{localMe.email}</Text>
          <Text style={{ paddingTop: '8px' }}>{'IBAN' + '   ' + localMe.iban}</Text>
          <Text>{'TVA' + '     ' + localMe.tva}</Text>
          <Text>{'BIC' + '      ' + localMe.bic}</Text>
          <Text style={{ paddingTop: '8px' }}>{localMe.bankName}</Text>
          <Text style={{ flexWrap: 'wrap', maxWidth: '150px' }}>{localMe.bankAddress}</Text>
        </View>
        <View style={{ position: 'absolute', top: 50, right: 50, fontFamily: 'Inter', fontWeight: 700 }}>
          <Text>FACTURE</Text>
        </View>
        <View style={{ fontSize: '12px', position: 'absolute', top: 250, right: 100, gap: '2px' }}>
          <Text style={{ fontFamily: 'Inter', fontWeight: 700 }}>FACTURER À</Text>
          <Text>{localClient.name}</Text>
          <Text style={{ flexWrap: 'wrap', maxWidth: '175px' }}>{localClient.address}</Text>
          <Text>{'TVA' + '     ' + localClient.tva}</Text>
          <Text>{'IBAN' + '   ' + localClient.iban}</Text>
        </View>

        <InfoTable id={id} invoiceDate={invoiceDate} prevMonth={prevMonth} name={localMe.name || ''} />
        <InvoiceTable missions={missions} />
        <View style={{ fontSize: '11px', position: 'absolute', left: 50, bottom: 50 }}>
          <Text>Merci de rappeler le numéro de facture dans la communication du paiement.</Text>
        </View>
      </Page>
    </Document>
  );
};
export default Pdf;
