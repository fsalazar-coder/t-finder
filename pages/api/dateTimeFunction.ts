

export default function dateTimeFunction(get: string) {

  let today = new Date();
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let monthToday = months[today.getMonth()];
  let dayToday = today.getDate();
  let formattedDayToday = dayToday < 10 ? `0${dayToday}` : `${dayToday}`;
  let year = today.getFullYear();
  let hours = today.getHours();
  let formattedHours = hours < 13 ? `${hours}` : `${hours - 12}`;
  let minutes = today.getMinutes();
  let formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  let date = `${monthToday} ${formattedDayToday}, ${year}`;     // Format date: MM DD, YYYY
  let time = `${formattedHours}:${formattedMinutes} ${hours < 13 ? 'am' : 'pm'}`;     // Formato de hora: HH:MM 

  if (get === 'date') {
    return date;
  }
  else if (get === 'time') {
    return time
  }
  return
}