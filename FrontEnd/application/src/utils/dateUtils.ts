import moment from 'moment';

// 格式化日期时间
export const formatDateTime = (dateTimeString: string, format: string = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(dateTimeString).format(format);
};

export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${days}天${hours}小时${minutes}分钟${remainingSeconds}秒`;
}
