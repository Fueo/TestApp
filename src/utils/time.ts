export interface RemainingTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
}

export const getRemainingTime = (
  endTime?: string | number | Date | null
): RemainingTime => {
  if (!endTime) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
    };
  }

  const endTimestamp =
    typeof endTime === 'string' || typeof endTime === 'number'
      ? new Date(endTime).getTime()
      : endTime.getTime();

  if (isNaN(endTimestamp)) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
    };
  }

  const diffMs = endTimestamp - Date.now();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    isExpired: totalSeconds <= 0,
  };
};
