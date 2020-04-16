import * as admin from "firebase-admin";

admin.initializeApp({
});

import config from "./config";
import * as firebaseFunctions from "./firebaseFunctions";

import getHandshakePin from "./opentrace/getHandshakePin";
import getTempIDs from "./opentrace/getTempIDs";
import getUploadToken from './opentrace/getUploadToken';
import processUploadedData from "./opentrace/processUploadedData";
import createDataLog from "./opentrace/createDataLog";

exports.getHandshakePin = firebaseFunctions.https(getHandshakePin);
exports.getTempIDs = firebaseFunctions.https(getTempIDs);
exports.getUploadToken = firebaseFunctions.https(getUploadToken);
exports.createDataLog = firebaseFunctions.https(createDataLog);
exports.processUploadedData = firebaseFunctions.storage(config.upload.bucket, processUploadedData);
