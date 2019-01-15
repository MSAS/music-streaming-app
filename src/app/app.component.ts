import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, Input, EventEmitter, OnChanges, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import * as app from "application";
import { registerElement } from 'nativescript-angular/element-registry';
import { Carousel, CarouselItem } from 'nativescript-carousel';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as application from "tns-core-modules/application";
import { Values } from "~/app/values/values";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { LoginComponent } from "~/app/login/components/login.component";
import { RegisterComponent } from "~/app/register/components/register.component";
import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { UserService } from "./services/user.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { ITnsOAuthTokenResult } from "nativescript-oauth2";
import { Page } from "tns-core-modules/ui/page/page";
import { isIOS } from 'platform';
import { topmost } from 'ui/frame';

// import { HttpEvent, HttpResponse } ;

// registerElement('AnimatedCircle', () => require('nativescript-animated-circle').AnimatedCircle);
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
registerElement("Ripple", () => require("nativescript-ripple").Ripple);


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
    @ViewChild('rad') radDrawer: ElementRef;

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
    picUrl: string = "res://inspius_logo";
    showActionBar: boolean;
    actionBarText: string
    // defaultPic: string = "res://inspius_logo";
    source;


    constructor(private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient, private authService: AuthService, private page: Page) {
        // this.source = Observable.(observer => {
        //     Yield a single value and complete
        //     observer.onNext(65) 

        //     observer.onNext(42);
        //     observer.onCompleted();
        // });

        // if(isIOS)
        // {
        //     topmost().ios.controller.
        // }
        // this.picUrl = this.defaultPic;
        this.page.actionBarHidden = true;
        this.showActionBar = false

        this.userService.actionBarChanges.subscribe((state: boolean) => {
            if (state != undefined) {
                this.showActionBar = state;
            }
        })

        this.userService.actionBarTextChanges.subscribe((text: string) => {
            if (text != undefined) {
                this.actionBarText = text;
            }
        })


        // alert("initA");
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
            args.cancel = true;
            this.routerExtensions.back();
            // let extendedNavigationExtras: ExtendedNavigationExtras = {
            //     queryParams: {
            //         "user": this.user
            //     },
            //     clearHistory: true
            // };
            // this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
        });

        // var far = frame.getViewById(frame.topmost(), "rad")
        // console.log(far)
        if (Values.readString(Values.X_ROLE_KEY, "") != "" && Values.readString(Values.X_ROLE_KEY, "") != null && Values.readString(Values.X_ROLE_KEY, "") != undefined) {
            // this.userService.setUser( Values.readString(Values.X_ROLE_KEY, ""))
            this.getUser(Values.readString(Values.X_ROLE_KEY, ""));
            // this.userService.setUser(this.user, Values.readString(Values.X_ROLE_KEY, ""))
        }
        else {
            this.user = null;
            this.isLogged = false;
            this.name = "";

            let extendedNavigationExtras: ExtendedNavigationExtras = {
                queryParams: {
                    "user": this.user
                },
                clearHistory: true,
            };
            this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
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

                    if (user.profile.pic != null && user.profile.pic != undefined) {
                        if (user.profile.pic.url != null && user.profile.pic.url != undefined) {
                            // this.picUrl = user.profile.pic;

                        }
                    }
                    else {
                        // this.picUrl = this.defaultPic;
                    }
                }
                else {
                    this.name = user.code;
                }

                let extendedNavigationExtras: ExtendedNavigationExtras = {
                    queryParams: {
                        "user": this.user
                    },
                    clearHistory: true
                };
                this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
            }
            else {
                this.user = null;
                this.isLogged = false;
                this.name = "";

                let extendedNavigationExtras: ExtendedNavigationExtras = {
                    queryParams: {
                        "user": this.user
                    },
                    clearHistory: true
                };
                this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
            }
        });


        this.userService.homeChanges.subscribe(state => {
            if (state) {
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
            }
            else {
                this.homeRedLine = false;
                this.categoriesRedLine = false;
                this.favouritesRedLine = false;
                this.recentMixesRedLine = false;
                this.aboutUsRedLine = false;

                this.homeBackgroundColor = "transparent";
                this.categoriesBackgroundColor = "transparent";
                this.favouritesBackgroundColor = "transparent";
                this.recentMixesBackgroundColor = "transparent";
                this.aboutUsBackgroundColor = "transparent";
            }
        });

        // this.authService.tnsOauthLogout();

    }



    ngOnInit(): void {
        this._rad = this.radDrawer.nativeElement as RadSideDrawer;
        this.userService._radRef = this._rad;
        // state = this.isLogged;
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // this.loggedIn = state;
        Values.writeString(Values.SELECTED_OPTION, "home");
        this.homeRedLine = true;
        this.homeBackgroundColor = "#2b343d";
        // alert("initI");

    }


    ngAfterViewInit(): void {
        // state = this.isLogged;
        this.gridNon = this.gridNonRef.nativeElement as GridLayout;
        this.gridLo = this.gridLoRef.nativeElement as GridLayout;

        // this._rad = this.rad.nativeElement as RadSideDrawer;

        // var source = rx.Observable.

        // var subscription = source.subscribe(
        //     x => console.log('onNext: %s', x),
        //     e => console.log('onError: %s', e),
        //     () => console.log('onCompleted'));

        // subscription.dispose();

    }

    onOpenDrawer(args) {
        console.log(args);
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
                this.user = result;
                // this.routerExtensions.navigate(["/favourites"]);
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

    onDrawerButtonTap() {
        this._rad.showDrawer();
    }

    onSearchButtonTap() {
        this.routerExtensions.navigate(["/search"]);
    }

    onSignIn() {
        // const sideDrawer = <RadSideDrawer>application.getRootView();
        // sideDrawer.closeDrawer();

        // let sideDrawer: RadSideDrawer = <RadSideDrawer>(frame.topmost().getViewById("rad"));
        // sideDrawer.showDrawer();

        // this._rad.closeDrawer();

        this._rad.closeDrawer();
        this.routerExtensions.navigate(["/login"]);
    }

    onRegister() {
        // const sideDrawer = <RadSideDrawer>application.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

        this.routerExtensions.navigate(["/register"]);

    }

    onMyAccount() {
        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.userService.homeSelector(false)
        this.routerExtensions.navigate(["/myAccount"], extendedNavigationExtras);
    }

    onDisplayPic() {

    }


    onLogout() {
        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

        this.userService.logout();
        this.isLogged = false;
        this.routerExtensions.navigate(["/home"]);
    }


    onHomeClicked() {

        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();


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
            },
            clearHistory: true
        };

        this.routerExtensions.navigate(["/home"], extendedNavigationExtras);

    }

    onCategoriesClicked() {
        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

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
            },
            clearHistory: true
        };
        this.routerExtensions.navigate(["/categories"], extendedNavigationExtras);
    }

    onFavouritesClicked() {
        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

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
            },
            clearHistory: true
        };
        this.routerExtensions.navigate(["/favourites"], extendedNavigationExtras);
    }

    onRecentMixesClicked() {
        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

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
            },
            clearHistory: true
        };
        this.routerExtensions.navigate(["/recentMixes"], extendedNavigationExtras);
    }

    onAboutUsClicked() {
        // const sideDrawer = <RadSideDrawer>app.getRootView();
        // sideDrawer.closeDrawer();
        this._rad.closeDrawer();

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

        this.routerExtensions.navigate(["/aboutUs"]);
    }

}

