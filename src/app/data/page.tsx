import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic.js';

const NoSSR = dynamic(() => import('../../components/DataTables'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center">
      <Loader2 size={150} className="animate-spin text-background" />
    </div>
  ),
});

const Datas = () => {
  return <NoSSR />;
};

export default Datas;
