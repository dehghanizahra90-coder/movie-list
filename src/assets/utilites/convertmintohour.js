export function convertMinutesStr(totalMinutesStr) {
  // جدا کردن عدد از رشته (حذف "min")
  const totalMinutes = parseInt(totalMinutesStr.replace(/\D/g, ""), 10);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // خروجی با دو رقم دقیقه (مثلاً 2h 05min)
  const minutesStr = minutes.toString().padStart(2, "0");

  return `${hours}h ${minutesStr}min`;
}

// مثال:
console.log(convertMinutesStr("122min")); // "2h 02min"
console.log(convertMinutesStr("75min")); // "1h 15min"
