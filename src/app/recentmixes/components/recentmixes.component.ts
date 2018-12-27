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

class Item {
    heading: string;
    content: string;

    constructor(heading: string, content: string) {
        this.heading = heading;
        this.content = content;
    }
}

class RowItem {
    item1: Item;
    item2: Item;
    odd: boolean = false;
    constructor(item1: Item, item2: Item, odd: boolean) {
        this.item1 = item1;
        this.item2 = item2;
        this.odd = odd;
    }
}

@Component({
    selector: "RecentMixes",
    moduleId: module.id,
    templateUrl: "./recentmixes.component.html",
    styleUrls: ['./recentmixes.component.css']
})

export class RecentMixesComponent implements OnInit, OnChanges, OnDestroy {

    path: string;
    name: string = "Login";
    public status: boolean = false;
    size: number;
    data = [];
    source: Observable;

    user;

    imagePlayer: string;
    imagePlayerFocussed: string;

    rows: RowItem[];

    loggedIn: boolean = false;

    public constant = new Constants();

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {


        if (Values.readString(Values.X_ROLE_KEY, "") != "" && Values.readString(Values.X_ROLE_KEY, "") != null && Values.readString(Values.X_ROLE_KEY, "") != undefined) {
            this.getUser(Values.readString(Values.X_ROLE_KEY, ""));
        }


        this.userService.userChanges.subscribe(user => {
            if (user != null) {
                this.loggedIn = true;
                this.data.push(new Item("Bulbasaur", "Bulbasaur"));
                this.data.push(new Item("Ivysaur", "soon."));
                this.data.push(new Item("Venusaur", "people."));
                this.data.push(new Item("Charmander", "fiercely."));
                this.data.push(new Item("Charmeleon", "Charmeleon"));
                this.data.push(new Item("Charizard", "Charizard"));
                this.data.push(new Item("Squirtle", "Squirtle"));
            }
            else {
                this.loggedIn = false;
                this.name = "";
            }
        });

        this.rows = this.converter(this.data);

        this.imagePlayer = 'res://icon_video_play';
        this.imagePlayerFocussed = 'res://icon_video_play_hover';
    }

    converter(items: Item[]): RowItem[] {
        var length: number = Math.trunc(items.length / 2);
        var odd = false;
        var item1: Item;
        var item2: Item;
        if (items.length % 2 == 0) {
            odd = false;
        }
        else {
            odd = true;
            length = length + 1;
        }
        var rows = [];
        for (var i = 0; i < items.length; i++) {

            if (i % 2 == 0 && items[i] != undefined) {
                item1 = items[i];
                if (i == items.length - 1) {
                    rows.push(new RowItem(item1, undefined, true))
                }
            }
            else if (i % 2 != 0 && items[i] != undefined) {
                item2 = items[i];
                rows.push(new RowItem(item1, item2, false));
            }
        }
        return rows;
    }

    ngOnInit(): void {

    }

    ngOnChanges(): void {
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
                // this.routerExtensions.navigate(["/home"]);
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    cardClicked(item: Item, index: number) {
        // alert(item.heading+item.content+index);
        this.routerExtensions.navigate(["/detail"]);
    }

    ngOnDestroy(): void {
    }
}



