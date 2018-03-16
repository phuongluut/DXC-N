import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import 'firebase/firestore';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {
  private _DB: any;
  constructor(public http: HttpClient) {
    this._DB = firebase.firestore();
    console.log('Hello DatabaseProvider Provider');
  }

  createAndPopulateDocument(collectionObj: string, docID: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .then((data: any) => {
          resolve(data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  getDocuments(collectionObj: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj)
        .get()
        .then((querySnapshot) => {
          let obj: any = [];
          querySnapshot
            .forEach((doc: any) => {
              obj.push({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                userUid:doc.data().userUid,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                timeStart: doc.data().timeStart, 
                timeEnd: doc.data().timeEnd,
                answers: doc.data().answers,
                answer: doc.data().answer,
                count: doc.data().count
              });
            });
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  addDocument(collectionObj: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB.collection(collectionObj).add(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  deleteDocument(collectionObj: string,
    docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .delete()
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  updateDocument(collectionObj: string,
    docID: string,
    dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._DB
        .collection(collectionObj)
        .doc(docID)
        .update(dataObj)
        .then((obj: any) => {
          resolve(obj);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }
}
