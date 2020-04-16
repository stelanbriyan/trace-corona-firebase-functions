import * as admin from "firebase-admin";

import * as functions from "firebase-functions";

import * as chai from "chai";

import * as crypto from "crypto";

import {FunctionsTestWrapper} from "../index.test";
import config from "../../src/config";
import getEncryptionKey from "../../src/opentrace/utils/getEncryptionKey";

describe('config.ts', function () {
  describe('#encryption', function () {
    it('should have a valid default algorithm', function () {
      // @ts-ignore
      const validateAlgorithm = () => crypto.createCipheriv(config.encryption.defaultAlgorithm,
        crypto.randomBytes(32), crypto.randomBytes(16), {authTagLength: 16});

      chai.expect(validateAlgorithm).to.not.throw();
    });
  });

  describe('#encryption', function () {
    it('should succeed in getting encryption key', async function () {
      const getEncryptionKeyTest = FunctionsTestWrapper.wrap(functions.https.onCall(getEncryptionKey));

      return getEncryptionKeyTest().catch((error: any) => {
        console.error("getEncryptionKeyTest", error);
        chai.assert(false, `Failed to get encryption key. Error: ${error.message}`);
      });
    });
  });

  describe('#upload', function () {
    it('should have valid buckets', async function () {
      return Promise.all(
        [config.upload.bucket].map(bucketName => {
          
         admin.firestore().collection('codes').doc('uploadCode').set({uploadCode: "tet466546546546ssdfdsf"});
         
          return admin.storage().bucket(bucketName).exists()
            .then(data => {
              const exists = data[0];
              chai.assert(exists, `Bucket '${bucketName}' does not exist`);
            });
        })
      )
    });
  });

  describe('#upload', function () {
    it('should use a good pin generator', async function () {
      const uid = crypto.randomBytes(28).toString("utf-8");

      return config.upload.pinGenerator.generatePin(uid)
        .catch(error => {
          chai.assert(false, `generatePin throws error: ${error.message}`);
        })
        .then(async pin => {
          chai.assert(pin == await config.upload.pinGenerator.generatePin(uid),
            "Pin is not consistent between different calls");
        });
    });
  });
});
