'use client';

import { useLocalstorage } from '@/hooks/useLocalstorage';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const DataTable = <T extends Record<string, string | number>>({ data, setData }: DataTableProps<T>) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead className="w-[500px]">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(data).map(([key, value]) => {
            const isNumber = typeof value === 'number';
            return (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>
                  <Input
                    type={isNumber ? 'number' : 'text'}
                    value={data[key]}
                    onChange={(e) => {
                      setData((prev: T) => ({ ...prev, [key]: isNumber ? e.target.valueAsNumber : e.target.value }));
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const DataTables = () => {
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

  const inputFileRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const data = {
      me: localMe,
      client: localClient,
      invoice: localInvoice,
    };
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetData = () => {
    setLocalMe({
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
    setLocalClient({
      name: '',
      address: '',
      tva: '',
      iban: '',
    });
    setLocalInvoice({
      number: 0,
    });
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target?.result as string);
      setLocalMe(data.me);
      setLocalClient(data.client);
      setLocalInvoice(data.invoice);
      if (inputFileRef.current) {
        inputFileRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-5 my-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">Me</h1>
        <DataTable data={localMe} setData={setLocalMe} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">Client</h1>
        <DataTable data={localClient} setData={setLocalClient} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl">Invoice</h1>
        <DataTable data={localInvoice} setData={setLocalInvoice} />
      </div>
      <div className="flex justify-center gap-3">
        <Button onClick={exportData}>Export</Button>
        <Button onClick={resetData}>Reset</Button>
        <Button asChild>
          <Label htmlFor="file-upload" className="cursor-pointer">
            Import
          </Label>
        </Button>
        <Input
          id="file-upload"
          type="file"
          className="hidden bg-foreground text-black w-fit"
          onChange={importData}
          ref={inputFileRef}
        />
      </div>
    </div>
  );
};

export default DataTables;
