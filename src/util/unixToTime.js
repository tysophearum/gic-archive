function unixToTime(unixTime) {
  // Create a new Date object with the Unix time (in milliseconds)
  const normalTime = new Date(unixTime); // Unix time is in seconds, so multiply by 1000 to convert to milliseconds

  // Extract the different components of the date and time
  const year = normalTime.getFullYear();
  const month = ('0' + (normalTime.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns a zero-based index
  const day = ('0' + normalTime.getDate()).slice(-2);
  // const hours = ('0' + normalTime.getHours()).slice(-2);
  // const minutes = ('0' + normalTime.getMinutes()).slice(-2);
  // const seconds = ('0' + normalTime.getSeconds()).slice(-2);

  // Construct the normal time string
  const normalTimeString = `${year} - ${month} - ${day}`;

  return normalTimeString;
}

export default unixToTime;