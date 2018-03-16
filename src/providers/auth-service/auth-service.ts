import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';


export class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = this.email;
    }


}
@Injectable()
export class AuthServiceProvider {
    currentUser: User;

    public login(credentials) {
        if (credentials.email === null || credentials.name === null) {
            return Observable.throw("Please insert credentials");
        } else {
            return Observable.create(observer => {
                let access = (credentials.password === "123" && credentials.email === "phuong");
                this.currentUser = new User("Obama", "obamab@gmail.com");
                observer.next(access);
                observer.complete();
            });
        }
    }

    public getUserInfo() {
        return this.currentUser;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    }
    // constructor(public http: HttpClient) {
    //   console.log('Hello AuthServiceProvider Provider');
    // }

}
