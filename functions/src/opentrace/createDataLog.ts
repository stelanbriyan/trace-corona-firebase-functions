import * as admin from "firebase-admin";

import {decryptTempID} from './getTempIDs';

import Record from "./types/Record";
import RecordSet from "./types/RecordSet";
import getEncryptionKey from "./utils/getEncryptionKey";
//import * as functions from "firebase-functions";

const createDataLog =  async  (tempId: string,recordsets: RecordSet[]) => {

    console.log('init=>',tempId,recordsets);


    const encryptionKey = await getEncryptionKey();

    const json1 = decryptTempID('uIsv3cRJpHe6IjT3KCbb+uawbECDWsrPSgvGprJXHQo25Kic3u/AP1DHYD8ielhjx+ZdyQObAOAd9ydoZA\u003d\u003d',encryptionKey);

    console.log('temp=>',json1);


    const phoneNum:string  = (await admin.auth().getUser(json1.uid)).phoneNumber|| '';

    console.log('phone=>',phoneNum);

    Array.from(recordsets).forEach(async function (recordSet) {
        console.log('records=>',recordSet);
    
        const record = {} as Record;

        record.id=recordSet.id;

        record.phone=phoneNum ;

        const json = decryptTempID(recordSet.msg,encryptionKey);

        console.log('other pn=>',json);

        const conPhoneNum:string  = (await admin.auth().getUser(json.uid)).phoneNumber|| '';

        record.connectingPhone=conPhoneNum;

        record.rssi=recordSet.rssi;

        record.timestampString=Number(recordSet.timestamp);

        console.log('connect pn=>',recordSet);

        const writeResult =  await admin.firestore().collection('records').doc().set(record);

        console.log(writeResult.writeTime)
    
    }); 


}

export default createDataLog;