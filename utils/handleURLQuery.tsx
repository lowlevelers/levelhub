export default function handleURLQuery(url: string) {
  // Check if the URL contains a query string
  if (url.includes('?')) {
    // Check if the URL already contains "ref=levelup"
    if (url.includes('ref=levelup')) {
      return url;
    } else {
      // Append "&ref=levelup" to the URL
      return url + '&ref=levelup';
    }
  } else {
    // If there is no query string, add "?ref=levelup" to the URL
    return url + '?ref=levelup';
  }
}
