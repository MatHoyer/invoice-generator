'use client';
import { useLocalstorage } from '@/hooks/useLocalstorage';
import { capitalize, DateString, getDateAsString } from '@/lib/utils';
import { PDFViewer } from '@react-pdf/renderer';
import { X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import Pdf from './Pdf';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const InputMission: React.FC<{
  mission: TMission;
  setMission: (e: ChangeEvent<HTMLInputElement>) => void;
  name: keyof TMission;
}> = ({ mission, setMission, name }) => {
  return (
    <TableCell>
      <Input
        type={name === 'quantity' || name === 'price' ? 'number' : 'text'}
        placeholder={name}
        value={mission[name]}
        onChange={setMission}
      />
    </TableCell>
  );
};

const CreateInvoice = () => {
  const [missions, setMissions] = useState<TMission[]>([]);
  const [pdfValues, setPdfValues] = useState<TMission[]>([]);
  const [prevMonth, setPrevMonth] = useState<string>(() => {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    return getDateAsString(today, 'yyyy-MM' as DateString);
  });
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

  const setMission = (index: number, key: keyof TMission) => (e: ChangeEvent<HTMLInputElement>) => {
    const newMissions = [...missions];
    if (key === 'quantity' || key === 'price') {
      newMissions[index][key] = e.target.valueAsNumber;
    } else {
      newMissions[index][key] = e.target.value;
    }
    setMissions(newMissions);
  };

  console.log(prevMonth);

  return (
    <div className="flex flex-col items-center gap-5 my-10">
      <h1 className="text-4xl">Nouvelle facture</h1>
      {missions.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missions.map((mission, index) => (
              <TableRow key={index}>
                <InputMission mission={mission} setMission={setMission(index, 'title')} name="title" />
                <InputMission mission={mission} setMission={setMission(index, 'description')} name="description" />
                <InputMission mission={mission} setMission={setMission(index, 'quantity')} name="quantity" />
                <InputMission mission={mission} setMission={setMission(index, 'price')} name="price" />
                <TableCell>
                  <X
                    className="cursor-pointer"
                    size={24}
                    color="red"
                    onClick={() => {
                      const newMissions = [...missions];
                      newMissions.splice(index, 1);
                      setMissions(newMissions);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button
        onClick={() => {
          setMissions((prev) => [...prev, { title: '', description: '', quantity: 0, price: 0 }]);
        }}
      >
        Nouvelle mission
      </Button>
      <input
        type={'month'}
        className="text-background text-sm p-2 rounded-md"
        value={prevMonth}
        onChange={(e) => {
          setPrevMonth(e.target.value);
        }}
      />
      {missions.length > 0 && (
        <Button
          disabled={missions.some(
            (mission) =>
              mission.title === '' || mission.description === '' || isNaN(mission.price) || isNaN(mission.quantity)
          )}
          onClick={() => {
            setPdfValues(structuredClone(missions));
            setLocalInvoice({ number: (localInvoice?.number || 0) + 1 });
          }}
        >
          Generer
        </Button>
      )}
      {pdfValues.length !== 0 && (
        <PDFViewer width="850px" height="600px">
          <Pdf
            missions={pdfValues}
            localMe={localMe}
            localClient={localClient}
            localInvoice={localInvoice}
            prevMonth={capitalize(getDateAsString(new Date(prevMonth + '-01'), DateString.monthNyear))}
          />
        </PDFViewer>
      )}
    </div>
  );
};

export default CreateInvoice;
