import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

import { AnalyticsResponse, getAnalytics } from '@api/analytics';

const defaultAnalyticsData: AnalyticsResponse = {
  file_download_count: 0,
  unique_active_users: 0,
  user_count: 0,
};

type StatCardProps = {
  title: string;
  value: number;
};

const StatCard = ({ title, value }: StatCardProps) => (
  <div className='flex flex-col'>
    <div className='h-20 flex items-end justify-center'>
      <h2 className='text-2xl font-bold text-center'>{title}</h2>
    </div>
    <div className='h-20 flex items-center justify-center'>
      <h3 className='text-3xl'>
        <CountUp start={0} end={value} separator=',' />
      </h3>
    </div>
  </div>
);

export const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse>(defaultAnalyticsData);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await getAnalytics();
      setAnalyticsData(data);
    };
    fetchAnalytics().then((r) => null);
  }, []);

  return (
    <div className='w-4/5 md:w-3/5 mx-auto mt-8'>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <StatCard title='Notes Downloaded' value={analyticsData.file_download_count} />
        <StatCard title='Students Visited' value={analyticsData.unique_active_users} />
        <StatCard title='Accounts Created' value={analyticsData.user_count} />
      </div>
    </div>
  );
};
