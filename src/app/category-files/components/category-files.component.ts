import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { Constants } from "../../models/constants";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Values } from "~/app/values/values";
import { Observable, EventData } from "tns-core-modules/data/observable";
import { UserService } from "~/app/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as app from "application";
import { Folder } from "tns-core-modules/file-system/file-system";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Song } from "~/app/models/song";
import { Page } from "tns-core-modules/ui/page/page";
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
    selector: "CategoryFiles",
    moduleId: module.id,
    templateUrl: "./category-files.component.html",
    styleUrls: ['./category-files.component.css']
})

export class CategoryFilesComponent implements OnInit, AfterViewInit, OnDestroy {


    page: Page
    path: string;
    name: string = "Login";
    public status: boolean = false;
    size: number;
    data = [];
    source: Observable;
    songs = new ObservableArray();
    viewModel;

    user;

    imagePlayer: string;
    imagePlayerFocussed: string;

    rows: RowItem[];
    public tabSelectedIndex: number;
    public tabSelectedIndexResult: string;

    loggedIn: boolean = false;

    public constant = new Constants();

    folderName;
    folderId;
    folderThumbnail;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
        this.data = [];
        this.userService.homeSelector(false)

        this.userService.actionBarState(true)
        this.data.push(new Item("Squirtle", "Squirtle"));
        this.data.push(new Item("Wartortle", "Wartortle"));
        this.data.push(new Item("Blastoise", "Blastoise"));

        this.activatedRoute.queryParams.subscribe(params => {
            this.folderName = params.name;
            this.folderId = params.id;
            this.folderThumbnail = params.thumbnail;

            // console.log("folder: ",this.folder)
            // console.log("name: ", params.folder)
            // this.id = <string>params["id"],
            //     this.folder = <string>params["name"]
            if (this.folderName != null && this.folderName != undefined && this.folderName != "") {
                this.userService.actionBarState(true);
                this.userService.actionBarText(this.folderName)
                this.loggedIn = true;
                // this.data = this.rows;
            }
            if (this.folderId != null && this.folderId != undefined && this.folderId != "") {
                // this.data = this.rows;
                this.getCategoryFilesByFolder(this.folderId);

            }



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
            // else {
            //     if (Values.readString(Values.X_ROLE_KEY, "") != "") {
            //         this.getUser(Values.readString(Values.X_ROLE_KEY, ""));
            //     }
            //     else {
            //         this.loggedIn = false;
            //     }
            // }


        })

        // if (this.folder != null) {
        //     // this.loggedIn = true;
        //     //getUserDat
        //     if (this.folder.name != null && this.folder.name != undefined) {
        //         this.userService.actionBarText(this.folder.name);
        //     }

        // }
        // else {
        //     if (Values.readString(Values.X_ROLE_KEY, "") != "") {
        //         this.loggedIn = true;
        //         //getUserData
        //     }
        //     else {
        //         this.loggedIn = false;
        //     }
        // }

        this.imagePlayer = 'res://icon_video_play';
        this.imagePlayerFocussed = 'res://icon_video_play_hover';

    }

    converter(items: Item[]): RowItem[] {
        // var items:Item[];
        var length: number = Math.trunc(items.length / 2);
        var odd = false;
        var item1: Item;
        var item2: Item;
        // var counter = 0;
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
                // counter++;
            }
        }
        return rows;
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

    ngOnInit(): void {
        console.log("initFav")
        if (this.rows == undefined || this.rows == null) {
            this.data = [];
            this.data.push(new Item("Bulbasaur", "Bulbasaur"));
            this.data.push(new Item("Ivysaur", "soon."));
            this.data.push(new Item("Venusaur", "people."));
        }
        this.rows = this.converter(this.data)
    }

    ngAfterViewInit(): void {
        if (this.rows == undefined || this.rows == null) {
            this.data = [];
            this.data.push(new Item("Bulbasaur", "Bulbasaur"));
            this.data.push(new Item("Ivysaur", "soon."));
            this.data.push(new Item("Venusaur", "people."));
        }
        this.rows = this.converter(this.data)
    }

    getCategoryFilesByFolder(folderId: string, folderName?: string): any {

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });

        this.http.get("http://docs-api-dev.m-sas.com/api/123/123/files?folder-id=" + folderId, { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {

                if (res.items != undefined && res.items != null) {
                    for (var i = 0; i < res.items.length; i++) {
                        if (res.items[i].mimeType == "audio/mp3")
                            this.songs.push(new Song(<Song>res.items[i]))
                    }
                }
                // this.items.push(new Folder(res.items));

                // this.items.push(new Item("Bulbasaur", "Bulbasaur"));
                // this.items.push(new Item("Ivysaur", "soon."));
                // this.items.push(new Item("Venusaur", "people."));
                this.viewModel = new Observable();
                this.viewModel.set("items", this.songs);

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

    onCardClicked(song:Song) {

        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "id": song.id,
                "name":song.name,
                "thumbnail":song.thumbnail,
                "url":song.url,
                "isFavourite":song.isFavourite,
                "views":song.views
            },
        };
        this.routerExtensions.navigate(["/detail"], extendedNavigationExtras)


        // this.routerExtensions.navigate(["/detail"]);
    }

    ngOnDestroy(): void {
    }
}



