function unixToTime(unixTime) {
  // Create a new Date object with the Unix time (in milliseconds)
  const normalTime = new Date(unixTime); // Unix time is in seconds, so multiply by 1000 to convert to milliseconds

  // Define arrays for months and days
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Extract the different components of the date and time
  const day = ('0' + normalTime.getDate()).slice(-2);
  const month = months[normalTime.getMonth()];
  const year = normalTime.getFullYear();
  
  const normalTimeString = `${day} - ${month} - ${year}`;

  return normalTimeString;
}

export default unixToTime;
