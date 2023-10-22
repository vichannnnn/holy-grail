import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { AnalyticsResponse, getAnalytics } from '@api/analytics';
import './Analytics.css';

const defaultAnalyticsData: AnalyticsResponse = {
  file_download_count: 0,
  unique_active_users: 0,
  user_count: 0,
};

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
    <div className='analytics-container'>
      <div className='analytics-item'>
        <span className='analytics-title'>Notes Downloaded</span>
        <span className='analytics-value'>
          <CountUp start={0} end={analyticsData.file_download_count} separator=',' />
        </span>
      </div>
      <div className='analytics-item'>
        <span className='analytics-title'>Students Visited</span>
        <span className='analytics-value'>
          <CountUp start={0} end={analyticsData.unique_active_users} separator=',' />
        </span>
      </div>
      <div className='analytics-item'>
        <span className='analytics-title'>Accounts Created</span>
        <span className='analytics-value'>
          <CountUp start={0} end={analyticsData.user_count} separator=',' />
        </span>
      </div>
    </div>
  );
};
