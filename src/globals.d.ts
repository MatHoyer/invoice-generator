type TMe = {
  name?: string;
  address?: string;
  tel?: string;
  email?: string;
  iban?: string;
  tva?: string;
  bic?: string;
  bankName?: string;
  bankAddress?: string;
};

type TClient = {
  name?: string;
  address?: string;
  tva?: string;
  iban?: string;
};

type TInvoice = {
  number?: number;
};

type DataTableProps<T> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
};

type TMission = {
  title: string;
  description: string;
  quantity: number;
  price: number;
};
