import { ApprovalTable } from './ApprovalTable';
import { ApprovalScreen } from './ApprovalScreen';

export const ApprovalPage = () => {
  return (
    <section className='admin section container'>
      <ApprovalScreen />
      <ApprovalTable />
    </section>
  );
};
