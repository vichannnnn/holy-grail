import ApprovalTable from './ApprovalTable';
import ApprovalScreen from './ApprovalScreen';

const ApprovalPage = () => {
  return (
    <section className='admin section container'>
      <ApprovalScreen />
      <ApprovalTable />
    </section>
  );
};

export default ApprovalPage;
