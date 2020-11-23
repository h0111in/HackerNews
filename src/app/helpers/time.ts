export function timeDiff(curr, prev): string {
  const ms_Min = 60 * 1000; // milliseconds in Minute
  const ms_Hour = ms_Min * 60; // milliseconds in Hour
  const ms_Day = ms_Hour * 24; // milliseconds in day
  const ms_Mon = ms_Day * 30; // milliseconds in Month
  const ms_Yr = ms_Day * 365; // milliseconds in Year
  const diff = curr - prev; //difference between dates.
  // If the diff is less then milliseconds in a minute
  if (diff < ms_Min) {
    return Math.round(diff / 1000) + ' seconds ago';

    // If the diff is less then milliseconds in a Hour
  } else if (diff < ms_Hour) {
    return Math.round(diff / ms_Min) + ' minutes ago';

    // If the diff is less then milliseconds in a day
  } else if (diff < ms_Day) {
    return Math.round(diff / ms_Hour) + ' hours ago';

    // If the diff is less then milliseconds in a Month
  } else if (diff < ms_Mon) {
    return 'Around ' + Math.round(diff / ms_Day) + ' days ago';

    // If the diff is less then milliseconds in a year
  } else if (diff < ms_Yr) {
    return 'Around ' + Math.round(diff / ms_Mon) + ' months ago';
  } else {
    return 'Around ' + Math.round(diff / ms_Yr) + ' years ago';
  }
}

export function unixTimeToString(unix_timestamp: number): string {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

}
