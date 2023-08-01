import { ApprovalTable, Hero } from '@features';

export const ApprovalPage = () => {
  return (
    <>
      <Hero />
      <section className='library section container'>
        <div>
          <div className='sub-section__title'>Administrator Panel</div>
          <div className='section__subtitle'>
            This is a list of unapproved notes for your review, you can approve or delete them
            accordingly.
          </div>
        </div>
        <ApprovalTable />
      </section>
    </>
  );
};
