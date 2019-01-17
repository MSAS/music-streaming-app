import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Values } from '../values/values';
import { HttpHeaders, HttpClient } from '@angular/common/http';
// import { logout as fbLogout } from "nativescript-facebook";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {

    private _userSubject = new Subject<any>();
    private _homeSubject = new Subject<boolean>();
    private _homeUpdationSubject = new Subject<any>();
    private _actionBarState = new Subject<boolean>();
    private _actionBarText = new Subject<string>();
    private _actionBarSearch = new Subject<boolean>();

    _radRef: RadSideDrawer;

    userChanges = this._userSubject.asObservable();
    homeChanges = this._homeSubject.asObservable();
    homeUpdation = this._homeUpdationSubject.asObservable();
    actionBarChanges = this._actionBarState.asObservable();
    actionBarTextChanges = this._actionBarText.asObservable();
    actionBarSearchChanges = this._actionBarSearch.asObservable();


    currentUser;

    constructor(private http: HttpClient, private authService: AuthService) {
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

    homeSelector(state: boolean) {
        this._homeSubject.next(state);
    }

    updateHomeData(data: any) {
        this._homeUpdationSubject.next(data);
    }

    openDrawer() {
        this._radRef.showDrawer();
    }

    actionBarState(state: boolean) {
        this._actionBarState.next(state);
    }

    actionBarText(text: string) {
        this._actionBarText.next(text);
    }

    actionBarSearch(state: boolean) {
        this._actionBarSearch.next(state);
    }

    logout() {
        // localStorage.clear();
        Values.writeString(Values.X_ROLE_KEY, "");
        this.currentUser = null;
        this._userSubject.next(null);
        this.authService.tnsOauthLogout();

        // fbLogout(() => {
        //     console.log("logged out");
        // });
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