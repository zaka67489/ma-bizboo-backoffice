export const getCurrentTimeInUTC7 = (date, timezone = 7) => {
  // คำนวณเวลาปัจจุบันใน UTC
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  // คำนวณเวลาตาม TimeZone ที่ต้องการ (UTC+7)
  const timeZoneOffset = timezone * 60 * 60000; // 7 ชั่วโมงใน milliseconds
  const timeInUTC7 = new Date(utcTime + timeZoneOffset);

  // จัดรูปแบบเวลา
  const year = timeInUTC7.getFullYear();
  const month = String(timeInUTC7.getMonth() + 1).padStart(2, '0');
  const day = String(timeInUTC7.getDate()).padStart(2, '0');
  const hours = String(timeInUTC7.getHours()).padStart(2, '0');
  const minutes = String(timeInUTC7.getMinutes()).padStart(2, '0');
  const seconds = String(timeInUTC7.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function formatTimeDifference(targetDateTime, timezone = 7) {
  // คำนวณวันที่และเวลาปัจจุบันใน UTC+7
  const currentDateTime = new Date();
  // const currentMillisecondsUTC7 = currentDateTime.getTime() + (currentDateTime.getTimezoneOffset() * 60000) + (7 * 60 * 60000);

  const currentMillisecondsUTC7 = currentDateTime.getTime();
  // แปลง targetDateTime ไปเป็น UTC+7
  const targetDate = new Date(targetDateTime);
  const targetMillisecondsUTC7 = targetDate.getTime() + (targetDate.getTimezoneOffset() * 60000) + (timezone * 60 * 60000);

  // คำนวณระยะเวลาที่ผ่านไป
  const totalMilliseconds = currentMillisecondsUTC7 - targetMillisecondsUTC7;
  const totalSeconds = totalMilliseconds / 1000;

  // คำนวณวัน ชั่วโมง และนาที
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  // สร้างข้อความผลลัพธ์
  let resultText = '';
  if (days >= 1) {
    resultText = `(${days} วัน ${hours} ชั่วโมง ที่แล้ว)`;
  } else if (hours >= 1) {
    resultText = `(${hours} ชั่วโมง ${minutes} นาที ที่แล้ว)`;
  } else if (minutes >= 1) {
    resultText = `(${minutes} นาที ที่แล้ว)`;
  } else {
    resultText = `(${Math.floor(totalSeconds)} วินาที ที่แล้ว)`;
  }

  return resultText;
}

export function formatDateTime(date, UTC = 7) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  // คำนวณเวลาตาม TimeZone ที่ต้องการ (UTC+7)
  const timeZoneOffset = UTC * 60 * 60000; // 7 ชั่วโมงใน milliseconds
  const timeInUTC7 = new Date(utcTime + timeZoneOffset);

  // จัดรูปแบบเวลา
  const year = timeInUTC7.getFullYear();
  const month = String(timeInUTC7.getMonth() + 1).padStart(2, '0');
  const day = String(timeInUTC7.getDate()).padStart(2, '0');
  const hours = String(timeInUTC7.getHours()).padStart(2, '0');
  const minutes = String(timeInUTC7.getMinutes()).padStart(2, '0');
  const seconds = String(timeInUTC7.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

