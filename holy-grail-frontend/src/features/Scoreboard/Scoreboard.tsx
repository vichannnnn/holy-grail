import { useEffect, useState } from 'react';
import {
  getScoreboardUsers,
  getUserScore,
  ScoreboardUser,
  AuthenticatedScoreboardUser,
} from '@api/scoreboard';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import './Scoreboard.css';

export const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<ScoreboardUser[]>([]);
  const [userScore, setUserScore] = useState<AuthenticatedScoreboardUser>();

  useEffect(() => {
    getScoreboardUsers().then(setScoreboard);
    getUserScore().then(setUserScore);
  }, []);

  const renderTableHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell>
            <h3>No.</h3>
          </TableCell>
          <TableCell>
            <h3>Username</h3>
          </TableCell>
          <TableCell>
            <h3>Number of resources uploaded</h3>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const renderGap = () => {
    return (
      <TableRow style={{ height: '24px' }}>
        <TableCell style={{ border: 'none', padding: 0 }} colSpan={3} />
      </TableRow>
    );
  };

  return (
    <div className='scoreboard-container'>
      <div className='scoreboard-title'>Top Contributors</div>
      <div className='scoreboard-subtitle'>
        These are the top contributors that has contributed resource materials such as practice
        papers or notes to the Holy Grail.
      </div>
      <div className='scoreboard-table'>
        <div>
          <TableContainer component={Paper}>
            <Table>
              {renderTableHeader()}
              <TableBody>
                {scoreboard &&
                  scoreboard.map((user, idx) => (
                    <>
                      <TableRow key={idx}>
                        <TableCell>
                          <a>{idx + 1}</a>
                        </TableCell>
                        <TableCell>
                          <a>{user.user.username}</a>
                        </TableCell>
                        <TableCell>
                          <a>{user.upload_count}</a>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                {renderGap()}
                <TableCell colSpan={3}>
                  <h2>Your statistics</h2>
                </TableCell>
                {userScore && (
                  <TableRow>
                    <TableCell>
                      <a>{userScore.rank}</a>
                    </TableCell>
                    <TableCell>
                      <a>{userScore.user.username}</a>
                    </TableCell>
                    <TableCell>
                      <a>{userScore.upload_count}</a>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};
