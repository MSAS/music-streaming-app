import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input, EventEmitter, OnChanges, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import * as app from "application";
import { registerElement } from 'nativescript-angular/element-registry';
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as application from "tns-core-modules/application";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from "~/app/values/values";
import { User } from "~/app/models/user";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginComponent } from "~/app/login/components/login.component";
import { RegisterComponent } from "~/app/register/components/register.component";
import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import * as HomeComponent from "~/app/home/components/home.component";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { UserService } from "./services/user.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";

// import { HttpEvent, HttpResponse } ;

// registerElement('AnimatedCircle', () => require('nativescript-animated-circle').AnimatedCircle);
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

// var state: boolean = false;

// export function loginCheck(state: boolean, model: User) {
//     state = state;
// }

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements OnInit, AfterViewInit, OnChanges {

    @ViewChild(LoginComponent) loginComponent;
    @ViewChild(RegisterComponent) registerComponent;
    @ViewChild('gridNon') gridNonRef: ElementRef;
    @ViewChild('gridLo') gridLoRef: ElementRef;

    gridNon: GridLayout;
    gridLo: GridLayout;

    private _rad: RadSideDrawer;
    private _page: Page;
    private _sideDrawerTransition: DrawerTransitionBase;

    homeBackgroundColor: string;
    categoriesBackgroundColor: string;
    favouritesBackgroundColor: string;
    recentMixesBackgroundColor: string;
    aboutUsBackgroundColor: string;

    homeRedLine: boolean = false;
    categoriesRedLine: boolean = false;
    favouritesRedLine: boolean = false;
    recentMixesRedLine: boolean = false;
    aboutUsRedLine: boolean = false;

    log: boolean;

    user;
    isLogged: boolean = false;

    end: boolean = false;
    name: string;
    source;


    constructor(private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
        // this.source = Observable.(observer => {
        //     Yield a single value and complete
        //     observer.onNext(65) 

        //     observer.onNext(42);
        //     observer.onCompleted();
        // });
        // alert("initA");



        if (Values.readString(Values.X_ROLE_KEY, "") != "" && Values.readString(Values.X_ROLE_KEY, "") != null && Values.readString(Values.X_ROLE_KEY, "") != undefined) {
            // this.userService.setUser( Values.readString(Values.X_ROLE_KEY, ""))
            this.getUser(Values.readString(Values.X_ROLE_KEY, ""));
        }


        this.userService.userChanges.subscribe(user => {
            if (user != null) {
                this.isLogged = true;
                this.user = user;
                if (user.profile != null && user.profile != undefined) {
                    if (user.profile.firstName != null && user.profile.firstName != undefined) {
                        this.name = user.profile.firstName;
                    }
                    else {
                        this.name = user.code;
                    }
                }
                else {
                    this.name = user.code;
                }
            }
            else {
                this.isLogged = false;
                this.name = "";
            }
        });
    }

    ngOnInit(): void {
        // state = this.isLogged;
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // this.loggedIn = state;
        Values.writeString(Values.SELECTED_OPTION, "home");
        this.homeRedLine = true;
        this.homeBackgroundColor = "#2b343d";


        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            if (this.routerExtensions.canGoBack()) {
                args.cancel = true;
                this.routerExtensions.back();
                // if (this.user != null) {
                //     this.userService.setUser(this.user, Values.readString(Values.X_ROLE_KEY, ""));
                //     this.isLogged = true;
                //     // this.name = this.user.name;
                // }
                // else {
                //     this.isLogged = false;
                // }
            } else {
                if (!this.end) {
                    dialogs.alert("Press back again to quit")
                    this.end = true;

                    setTimeout(() => {
                        this.end = false;
                    }, 3000);
                }
                else {
                    args.cancel = false;
                }
            }
        });

        // alert("initA");

    }


    ngAfterViewInit(): void {
        // state = this.isLogged;
        this.gridNon = this.gridNonRef.nativeElement as GridLayout;
        this.gridLo = this.gridLoRef.nativeElement as GridLayout;



        // var source = rx.Observable.

        // var subscription = source.subscribe(
        //     x => console.log('onNext: %s', x),
        //     e => console.log('onError: %s', e),
        //     () => console.log('onCompleted'));

        // subscription.dispose();

    }

    public static isLoggedState(state: boolean) {
        // this.X_ROLE_KEY = state;
        // this.aboutUsRedLine = true;
        // this.loggedIn = state;
    }

    ngOnChanges() {
        alert("changeA")
        // state = this.isLogged;
        // this.loggedIn = state;
        // this.user = this.loginComponent.user;
        // this.isLogged = this.loginComponent.loggedIn;

        // this.user = this.registerComponent.user;
        // this.isLogged = this.registerComponent.loggedIn;

        // if (this.loggedIn) {
        //     if (this.user != undefined) {
        //         alert("Logged In")
        //     }
        // }
        // else {
        //     alert("Logged Out")
        // }
    }

    getsideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    getUser(xRoleKey: string) {

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": xRoleKey
        });

        this.http.get("http://ems-api-dev.m-sas.com/api/users/my", { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {
                let result: any
                result = res.data

                this.userService.setUser(result, xRoleKey);
                this.routerExtensions.navigate(["/home"]);
            }
            else {
                alert(res.error)
                return null;
            }
        },
            error => {
                alert(error)
                return null;
            })
    }

    onSignIn() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.routerExtensions.navigate(["/login"]);
    }

    onRegister() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.routerExtensions.navigate(["/register"]);

    }

    onMyAccount() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.routerExtensions.navigate(["/myAccount"], extendedNavigationExtras);
    }

    onDisplayPic() {

    }


    onLogout() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.userService.logout();
        this.isLogged = false;
        this.routerExtensions.navigate(["/home"]);
    }


    onHomeClicked() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();

        this.homeRedLine = true;
        this.categoriesRedLine = false;
        this.favouritesRedLine = false;
        this.recentMixesRedLine = false;
        this.aboutUsRedLine = false;

        this.homeBackgroundColor = "#2b343d";
        this.categoriesBackgroundColor = "transparent";
        this.favouritesBackgroundColor = "transparent";
        this.recentMixesBackgroundColor = "transparent";
        this.aboutUsBackgroundColor = "transparent";


        // HomeComponent.changeUI();
        // if (this.isLogged) {
        //     this.isLogged = false;
        // }
        // else {
        //     this.isLogged = true;
        // }


        // let extendedNavigationExtras: ExtendedNavigationExtras = {
        //     queryParams: {
        //         "source": this.source
        //     }
        // };
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.routerExtensions.navigate(["/home"], extendedNavigationExtras);

    }

    onCategoriesClicked() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();

        this.homeRedLine = false;
        this.categoriesRedLine = true;
        this.favouritesRedLine = false;
        this.recentMixesRedLine = false;
        this.aboutUsRedLine = false;

        this.homeBackgroundColor = "transparent";
        this.categoriesBackgroundColor = "#2b343d";
        this.favouritesBackgroundColor = "transparent";
        this.recentMixesBackgroundColor = "transparent";
        this.aboutUsBackgroundColor = "transparent";
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
    }

    onFavouritesClicked() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();

        this.homeRedLine = false;
        this.categoriesRedLine = false;
        this.favouritesRedLine = true;
        this.recentMixesRedLine = false;
        this.aboutUsRedLine = false;

        this.homeBackgroundColor = "transparent";
        this.categoriesBackgroundColor = "transparent";
        this.favouritesBackgroundColor = "#2b343d";
        this.recentMixesBackgroundColor = "transparent";
        this.aboutUsBackgroundColor = "transparent";
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.routerExtensions.navigate(["/favourites"], extendedNavigationExtras);
    }

    onRecentMixesClicked() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();

        this.homeRedLine = false;
        this.categoriesRedLine = false;
        this.favouritesRedLine = false;
        this.recentMixesRedLine = true;
        this.aboutUsRedLine = false;

        this.homeBackgroundColor = "transparent";
        this.categoriesBackgroundColor = "transparent";
        this.favouritesBackgroundColor = "transparent";
        this.recentMixesBackgroundColor = "#2b343d";
        this.aboutUsBackgroundColor = "transparent";
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.routerExtensions.navigate(["/recentmixes"], extendedNavigationExtras);
    }

    onAboutUsClicked() {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();

        this.homeRedLine = false;
        this.categoriesRedLine = false;
        this.favouritesRedLine = false;
        this.recentMixesRedLine = false;
        this.aboutUsRedLine = true;

        this.homeBackgroundColor = "transparent";
        this.categoriesBackgroundColor = "transparent";
        this.favouritesBackgroundColor = "transparent";
        this.recentMixesBackgroundColor = "transparent";
        this.aboutUsBackgroundColor = "#2b343d";

        this.routerExtensions.navigate(["/aboutus"]);
    }

}

