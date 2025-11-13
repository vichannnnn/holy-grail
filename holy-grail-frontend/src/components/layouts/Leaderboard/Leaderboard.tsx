'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';

import {
  AuthenticatedScoreboardUser,
  ScoreboardUser,
  getScoreboardUsers,
  getUserScore,
} from '@api/scoreboard';

// import { AdBanner } from '@components/AdBanner';

export const Leaderboard = () => {
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
            <h4 className='font-bold'>No.</h4>
          </TableCell>
          <TableCell>
            <h4 className='font-bold'>Username</h4>
          </TableCell>
          <TableCell>
            <h4 className='font-bold'>Number of resources uploaded</h4>
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
    <div className='flex flex-col mx-auto md:w-1/2 w-4/5'>
      {/* <AdBanner
        imageUrl='https://image.himaa.me/PALLO_1.png'
        linkUrl='https://pallo.ai/?utm_source=grail&utm_content=b1'
        altText='Pallo.ai'
      /> */}
      <h2 className='font-bold text-center'>Top Contributors</h2>
      <h3 className='text-center'>
        These are the top contributors that has contributed resource materials such as practice
        papers or notes to the Holy Grail.
      </h3>
      <div className='flex flex-col gap-6 mt-6'>
        <div>
          <TableContainer component={Paper}>
            <Table>
              {renderTableHeader()}
              <TableBody>
                {scoreboard &&
                  scoreboard.map((user, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <p>{idx + 1}</p>
                      </TableCell>
                      <TableCell>
                        <p>{user.user.username}</p>
                      </TableCell>
                      <TableCell>
                        <p>{user.upload_count}</p>
                      </TableCell>
                    </TableRow>
                  ))}
                {renderGap()}
                <TableRow>
                  <TableCell colSpan={3}>
                    <h3 className='font-bold'>Your statistics</h3>
                  </TableCell>
                </TableRow>
                {userScore && (
                  <TableRow>
                    <TableCell>
                      <p>{userScore.rank}</p>
                    </TableCell>
                    <TableCell>
                      <p>{userScore.user.username}</p>
                    </TableCell>
                    <TableCell>
                      <p>{userScore.upload_count}</p>
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
