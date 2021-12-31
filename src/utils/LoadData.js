import axios from 'axios';

/**
 * LoadData - asynchronous retrieval of API - uses callback (ideally) to set the converted data to something useful
 * @param {string} api API endpoint to retrieve data from
 * @param {function} callback this is usually a "setter" to set the JSON converted object to a system object
 * @return {object} returns the JSON converted data package
 * @throws {error} if there is a problem this will throw an error.
 */
export default async function LoadData(api, callback) {
  let result;
  try {
    result = await axios(
      `${api}`
    );
    result = JSON.parse(result.request.responseText);
    console.log(result);
    callback(result);

  } catch(err) {
    console.error(`Data: ${result}
    API: ${api}
    CALLBACK: ${callback}`)
    throw new Error('Unable to retrieve data from endpoint.');
  }

}