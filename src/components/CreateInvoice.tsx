'use client';
import { PDFViewer } from '@react-pdf/renderer';
import { X } from 'lucide-react';
import { ChangeEvent, memo, useState } from 'react';
import Pdf from './Pdf';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const InputMission: React.FC<{
  mission: TMission;
  setMission: (e: ChangeEvent<HTMLInputElement>) => void;
  name: keyof TMission;
}> = memo(({ mission, setMission, name }) => {
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
});

const CreateInvoice = () => {
  const [missions, setMissions] = useState<TMission[]>([]);
  const [pdfValues, setPdfValues] = useState<TMission[]>([]);

  const setMission = (index: number, key: keyof TMission) => (e: ChangeEvent<HTMLInputElement>) => {
    const newMissions = [...missions];
    if (key === 'quantity' || key === 'price') {
      newMissions[index][key] = e.target.valueAsNumber;
    } else {
      newMissions[index][key] = e.target.value;
    }
    setMissions(newMissions);
  };

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
      {missions.length > 0 && (
        <Button
          disabled={missions.some(
            (mission) =>
              mission.title === '' || mission.description === '' || isNaN(mission.price) || isNaN(mission.quantity)
          )}
          onClick={() => {
            console.log(missions);
            setPdfValues(structuredClone(missions));
          }}
        >
          Generer
        </Button>
      )}
      {/* {pdfValues.length !== 0 && ( */}
      <PDFViewer width="850px" height="600px">
        <Pdf missions={pdfValues} />
      </PDFViewer>
      {/* )} */}
    </div>
  );
};

export default CreateInvoice;
