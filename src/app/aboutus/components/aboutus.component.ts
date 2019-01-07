import { Component, OnInit, Output, EventEmitter, OnChanges, Input, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { Constants } from "../../models/constants";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from 'nativescript-cardview';
import { User } from "~/app/models/user";
import { Values } from "~/app/values/values";
import * as Home from "~/app/app.component"
import { fromObject, fromObjectRecursive, Observable, PropertyChangeData } from "tns-core-modules/data/observable";
import { UserService } from "~/app/services/user.service";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
    selector: "AboutUs",
    moduleId: module.id,
    templateUrl: "./aboutus.component.html",
    styleUrls: ['./aboutus.component.css']
})

export class AboutUsComponent implements OnInit, OnDestroy {


    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
      
        this.userService.actionBarState(true)
        this.userService.actionBarText('About Us')
    }

    ngOnInit(): void {
    }


    ngOnDestroy(): void {

    }
}



