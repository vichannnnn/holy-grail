import './approval.css';

export const ApprovalScreen = () => {
  return (
    <section id='upload'>
      <div>
        <div className='approval__title'>Administrator Panel</div>
        <div className='section__subtitle'>
          This is a list of unapproved notes for your review, you can approve or delete them
          accordingly.
        </div>
      </div>
    </section>
  );
};
