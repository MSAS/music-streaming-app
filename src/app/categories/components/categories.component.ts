import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { Constants } from "../../models/constants";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Values } from "~/app/values/values";
import { Observable, EventData } from "tns-core-modules/data/observable";
import { UserService } from "~/app/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as app from "application";
import { Folder } from "~/app/models/folder";
import { GridViewModule } from "nativescript-grid-view/angular";
import { Page } from "tns-core-modules/ui/page/page";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";


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
    selector: "Categories",
    moduleId: module.id,
    templateUrl: "./categories.component.html",
    styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {

    page: Page
    path: string;
    name: string = "Login";
    public status: boolean = false;
    size: number;
    items = new ObservableArray();
    source: Observable;

    user;

    imagePlayer: string;
    imagePlayerFocussed: string;

    rows: RowItem[];
    categoryFolders: Folder[];
    viewModel;

    public tabSelectedIndex: number;
    public tabSelectedIndexResult: string;

    loggedIn: boolean = false;

    public constant = new Constants();

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {

        // this.data = [];

        this.userService.actionBarState(true)
        this.userService.actionBarText('Categories')
        // this.categoryFolders = this.getCategoryFolders(Values.readString(Values.X_ROLE_KEY, ""));

        // if (this.categoryFolders != undefined && this.categoryFolders != null) {
        //     for (var i = 0; i < this.categoryFolders.length; i++) {
        //         this.data.push(new Item("Squirtle", "Squirtle"));
        //     }
        // }
        this.getCategoryFolders("lllllll");

        console.log("data:", this.items, this.categoryFolders)

        // this.data.push(new Item("Squirtle", "Squirtle"));
        // this.data.pop();

        // this.data.push(new Item("Wartortle", "Wartortle"));
        // this.data.push(new Item("Blastoise", "Blastoise"));


        this.activatedRoute.queryParams.subscribe(params => {
            this.user = params["user"]

            if (this.user != null) {
                this.loggedIn = true;
                // this.getCategoryFolders(Values.readString(Values.X_ROLE_KEY, ""));
                //getUserData
            }
            else {
                if (Values.readString(Values.X_ROLE_KEY, "") != "") {
                    // this.getCategoryFolders(Values.readString(Values.X_ROLE_KEY, ""));

                    this.loggedIn = true;

                    //getUserData
                }
                else {
                    this.loggedIn = false;
                }
            }
        })



        this.userService.userChanges.subscribe(user => {
            if (user == null || user == undefined) {

                let extendedNavigationExtras: ExtendedNavigationExtras = {
                    queryParams: {
                        "user": null
                    },
                };
                this.routerExtensions.navigate(["/home"], extendedNavigationExtras)
                // this.loggedIn = false;
            }
        })

        // for (var i = 0; i < result.length; i++) {
        //     this.data.push(new Item("Squirtle", "Squirtle"));
        // }

        // console.log(this.categoryFolders)

        this.imagePlayer = 'res://icon_video_play';
        this.imagePlayerFocussed = 'res://icon_video_play_hover';

    }

    // converter(items: Item[]): RowItem[] {
    //     // var items:Item[];
    //     var length: number = Math.trunc(items.length / 2);
    //     var odd = false;
    //     var item1: Item;
    //     var item2: Item;
    //     // var counter = 0;
    //     if (items.length % 2 == 0) {
    //         odd = false;
    //     }
    //     else {
    //         odd = true;
    //         length = length + 1;
    //     }
    //     var rows = [];
    //     for (var i = 0; i < items.length; i++) {

    //         if (i % 2 == 0 && items[i] != undefined) {
    //             item1 = items[i];
    //             if (i == items.length - 1) {
    //                 rows.push(new RowItem(item1, undefined, true))
    //             }
    //         }
    //         else if (i % 2 != 0 && items[i] != undefined) {
    //             item2 = items[i];
    //             rows.push(new RowItem(item1, item2, false));
    //             // counter++;
    //         }
    //     }
    //     return rows;
    // }

    ngOnInit(): void {
        // console.log("initFav")
        // if (this.rows == undefined || this.rows == null) {
        //     this.data = [];
        //     this.data.push(new Item("Bulbasaur", "Bulbasaur"));
        //     this.data.push(new Item("Ivysaur", "soon."));
        //     this.data.push(new Item("Venusaur", "people."));
        // }
        // this.rows = this.converter(this.data)

        console.log("init", this.categoryFolders)

    }

    ngAfterViewInit(): void {
        // if (this.rows == undefined || this.rows == null) {
        //     this.data = [];
        //     this.data.push(new Item("Bulbasaur", "Bulbasaur"));
        //     this.data.push(new Item("Ivysaur", "soon."));
        //     this.data.push(new Item("Venusaur", "people."));
        // }
        // this.rows = this.converter(this.data)
    }




    pageLoaded(args: EventData) {
        this.page = args.object as Page;
        // const items = new ObservableArray();

        // for (let loop = 0; loop < 200; loop++) {
        //     items.push({ value: "test " + loop.toString() });
        // }

        // this.getCategoryFolders("jjjjj");

        console.log("Page Loaded called")
    }



    getCategoryFolders(xRoleKey: string): any {

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });

        this.http.get("http://docs-api-dev.m-sas.com/api/folders?isParent=true", { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {

                if (res.items != undefined && res.items != null) {
                    for (var i = 0; i < res.items.length; i++) {
                        this.items.push(new Folder(<Folder>res.items[i]))
                    }
                }
                // this.items.push(new Folder(res.items));

                // this.items.push(new Item("Bulbasaur", "Bulbasaur"));
                // this.items.push(new Item("Ivysaur", "soon."));
                // this.items.push(new Item("Venusaur", "people."));
                this.viewModel = new Observable();
                this.viewModel.set("items", this.items);

                this.page.bindingContext = this.viewModel;



                let result: Folder[];
                result = <Folder[]>res.items;
                // return result;
                // this.categoryFolders = result;
                // console.log("api:", this.categoryFolders)

                // for (var i = 0; i < this.categoryFolders.length; i++) {
                //     this.data.push(new Item("Squirtle", "Squirtle"));
                // }

                // console.log("data", this.data)
                // this.categoryFolders = result;
                // this.userService.setUser(result, xRoleKey);
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
        this.routerExtensions.navigate(["/detail"]);
    }

    onCardClicked(folder) {
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "id": folder.id,
                "name":folder.name,
                "thumbnail":folder.thumbnail,
            },
        };
        this.routerExtensions.navigate(["/categoryFiles"], extendedNavigationExtras)
    }

    ngOnDestroy(): void {
    }
}



