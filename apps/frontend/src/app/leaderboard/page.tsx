import { Leaderboard } from '@layouts/Leaderboard';

import { generateLeaderboardMetadata } from '@utils/metadata';

export const generateMetadata = generateLeaderboardMetadata;

const LeaderboardPage = () => {
  return (
    <>
      <Leaderboard />
    </>
  );
};

export default LeaderboardPage;
