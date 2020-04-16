//import * as functions from "firebase-functions";
import {ObjectMetadata} from "firebase-functions/lib/providers/storage";

import {decryptTempID} from './getTempIDs';

import getEncryptionKey from "./utils/getEncryptionKey";

const processUploadedData = async (object: ObjectMetadata) => {

  const encryptionKey = await getEncryptionKey();

  const json = decryptTempID("uIsv3cRJpHe6IjT3KCbb+uawbECDWsrPSgvGprJXHQo25Kic3u/AP1DHYD8ielhjx+ZdyQObAOAd9ydoZA\u003d\u003d",encryptionKey);


  console.log('Object:  ', json);
  //throw new functions.https.HttpsError('unimplemented', 'Not implemented yet');
};

export default processUploadedData;
