import { Component, OnInit, Output, EventEmitter, OnChanges, Input,ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { Constants } from "../../models/constants";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import * as app from "application";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from 'nativescript-cardview';
import { User } from "~/app/models/user";
import { Values } from "~/app/values/values";
import * as Home from "~/app/app.component"
import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import { UserService } from "~/app/services/user.service";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DrawerTransitionBase, SlideInOnTopTransition, RadSideDrawer } from "nativescript-ui-sidedrawer";
 



@Component({
    selector: "AboutUs",
    moduleId: module.id,
    templateUrl: "./aboutus.component.html",
    styleUrls: ['./aboutus.component.css']
})

export class AboutUsComponent implements OnInit, OnDestroy {

    @ViewChild('rad') radDrawer: ElementRef;
    private _rad: RadSideDrawer;
    private _sideDrawerTransition: DrawerTransitionBase;


    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
      
        this.userService.actionBarState(true);
        this.userService.actionBarText('ABOUT US');
        this.userService.actionBarSearch(false);
    }

    ngOnInit(): void {

        this._rad = this.radDrawer.nativeElement as RadSideDrawer;
        this.userService._radRef = this._rad;
        // state = this.isLogged;
        this._sideDrawerTransition = new SlideInOnTopTransition();
        // this.loggedIn = state;
      
    }


    ngOnDestroy(): void {

    }

    getsideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap() {
        this._rad.showDrawer();
    }
}



