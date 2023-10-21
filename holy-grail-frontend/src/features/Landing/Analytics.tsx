import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import { AnalyticsResponse, getAnalytics } from '@api/analytics';
import './Analytics.css';

export const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null);

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
          {analyticsData ? (
            <CountUp
              start={0}
              end={analyticsData.file_download_count}
              separator=','
              enableScrollSpy={true}
            />
          ) : null}
        </span>
      </div>
      <div className='analytics-item'>
        <span className='analytics-title'>Students</span>
        <span className='analytics-value'>
          {analyticsData ? (
            <CountUp
              start={0}
              end={analyticsData.unique_active_users}
              separator=','
              enableScrollSpy={true}
            />
          ) : null}
        </span>
      </div>
      <div className='analytics-item'>
        <span className='analytics-title'>Accounts Created</span>
        <span className='analytics-value'>
          {analyticsData ? (
            <CountUp
              start={0}
              end={analyticsData.user_count}
              separator=','
              enableScrollSpy={true}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
};
