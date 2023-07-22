import { ApprovalTable, ApprovalScreen } from '@features';

export const ApprovalPage = () => {
  return (
    <section className='admin section container'>
      <ApprovalScreen />
      <ApprovalTable />
    </section>
  );
};
