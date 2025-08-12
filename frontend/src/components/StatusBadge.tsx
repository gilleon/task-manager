import { useConnectionStatus } from '../hooks/useConnectionStatus';

const StatusBadge = () => {
  const { isOnline, isChecking } = useConnectionStatus();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-medium shadow-lg transition-all duration-300 hover:scale-105 ${
        isChecking 
          ? 'bg-gray-100 text-gray-600 border border-gray-300'
          : isOnline 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-orange-100 text-orange-800 border border-orange-200'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          isChecking ? 'bg-gray-400 animate-pulse' :
          isOnline ? 'bg-green-500' : 'bg-orange-500 animate-pulse'
        }`}></div>
        
        {isChecking ? (
          <span>Checking...</span>
        ) : isOnline ? (
          <>
            <span className="hidden sm:inline">🌐 Server Connected</span>
            <span className="sm:hidden">🌐</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">📱 Offline Mode</span>
            <span className="sm:hidden">📱</span>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusBadge;