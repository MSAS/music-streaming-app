import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Values } from '../values/values';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

    private _userSubject = new Subject<any>();

    userChanges = this._userSubject.asObservable();
    currentUser;

    constructor(private http: HttpClient) {
    }

    newUser(user: any) {
        this._userSubject.next(user);
    }


    setUser(user: any, xRoleKey: string) {
        if (xRoleKey != undefined && xRoleKey != "" && xRoleKey != null) {
            Values.writeString(Values.X_ROLE_KEY, xRoleKey);
            this.currentUser = user;
            // this.checkUser(xRoleKey);
            this._userSubject.next(this.currentUser);
        }
    }


    logout() {
        // localStorage.clear();
        Values.writeString(Values.X_ROLE_KEY, "");
        this.currentUser = null;
        this._userSubject.next(null);
    }


    // checkUser(xRoleKey: string) {
    //     let headers = new HttpHeaders({
    //         "Content-Type": "application/json",
    //         "x-tenant-code": "music",
    //         "x-role-key": xRoleKey
    //     });

    //     this.http.get("http://ems-api-dev.m-sas.com/api/users/my", { headers: headers }).subscribe((res: any) => {

    //         if (res.isSuccess) {
    //             let result: any
    //             result = res.data
    //             this.currentUser = result;
    //         }
    //         else {
    //             alert(res.error)
    //             this.currentUser = null;
    //             // return null;
    //         }
    //     },
    //         error => {
    //             alert(error)
    //             this.currentUser = null;
    //             // return null;
    //         })
    // }

}