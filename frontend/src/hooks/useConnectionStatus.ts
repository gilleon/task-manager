import { useState, useEffect } from 'react';
import { checkBackendStatus } from '../services/api';

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  const checkStatus = async () => {
    setIsChecking(true);
    try {
      const status = await checkBackendStatus();
      setIsOnline(status);
    } catch {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
    
    const interval = setInterval(checkStatus, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    isOnline,
    isChecking,
    refreshStatus: checkStatus
  };
};