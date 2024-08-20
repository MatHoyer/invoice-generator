'use client';

import { useLocalstorage } from '@/hooks/useLocalstorage';
import { Input } from './ui/input';
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
                    defaultValue={value}
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

  return (
    <div className="flex flex-col gap-5 mt-10">
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
    </div>
  );
};

export default DataTables;
