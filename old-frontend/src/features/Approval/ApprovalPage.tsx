import { ApprovalTable } from '@features';
import { AlertProps, WelcomeBackHeader } from '@components';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@providers';
import { useNavigate } from 'react-router-dom';
import './ApprovalPage.css';

export const ApprovalPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        const alertContentRedirect: AlertProps = {
          title: 'You are not allowed here!',
          description: 'Please log in as an administrator or developer to access this page.',
          severity: 'error',
        };
        navigate('/login', { state: { alertContent: alertContentRedirect } });
      }
    }
  }, [isLoading, user]);

  return (
    <div className='approval-page-container'>
      <WelcomeBackHeader />
      <div>
        <div className='approval-page-title'>Administrator Panel</div>
        <div className='approval-page-subtitle'>
          This is a list of unapproved notes for your review, you can approve or delete them
          accordingly.
        </div>
      </div>
      <ApprovalTable />
    </div>
  );
};
