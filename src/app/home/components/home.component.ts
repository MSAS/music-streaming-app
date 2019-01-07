import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnChanges, Input, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { Constants } from "../../models/constants";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from 'nativescript-cardview';
import { Values } from "~/app/values/values";
import { Observable, EventData } from "tns-core-modules/data/observable";
import { UserService } from "~/app/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as app from "application";
import { switchMap } from "rxjs/operators";
import { RadListView } from "nativescript-ui-listview";
import { User } from "~/app/models/user";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Song } from "~/app/models/song";
import { Folder } from "tns-core-modules/file-system/file-system";
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

registerElement("CardView", () => CardView);

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    page: Page

    path: string;
    name: string = "Login";
    size: number;
    data = [];
    source: Observable;
    songs = new ObservableArray();
    mostViewedSongs = new ObservableArray();

    viewModel;
    user;

    imagePlayer: string;
    imagePlayerFocussed: string;
    list: RadListView
    rows;
    public tabSelectedIndex: number;
    public tabSelectedIndexResult: string;

    loggedIn: boolean;

    public constant = new Constants();

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
        // alert("con")
        this.tabSelectedIndex = 0;
        this.data = [];
        // this.rows = [];

        // this.rows.push(new Item("Traffic Jamz", "Bulbasaur"));
        // this.rows.push(new Item("Dj Rick", "soon."));
        // this.rows.push(new Item("Pk Rick Gd", "people."));
        // this.rows.push(new Item("Charmander", "fiercely."));
        // this.rows.push(new Item("Charmeleon", "Charmeleon"));
        // this.rows.push(new Item("Charizard", "Charizard"));
        // this.rows.push(new Item("Squirtle", "Squirtle"));
        // this.rows.push(new Item("Wartortle", "Wartortle"));
        // this.rows.push(new Item("Blastoise", "Blastoise"));

        this.userService.homeSelector(true)
        this.userService.actionBarState(true)
        this.userService.actionBarText('DJ Rick Geez')

        this.activatedRoute.queryParams.subscribe(params => {
            this.user = params["user"]
            if (this.user != null) {
                this.loggedIn = true;
                // this.data = this.rows;
            }
            else {
                if (Values.readString(Values.X_ROLE_KEY, "") != "") {
                    this.loggedIn = true;

                    // this.getAllSongs(Values.readString(Values.X_ROLE_KEY, ""));
                }
                else {
                    this.loggedIn = false;
                }
            }



        })

        this.userService.userChanges.subscribe(user => {
            if (user == null || user == undefined) {
                this.loggedIn = false;
            }
            else {
                this.loggedIn = true;
                // this.data = this.rows;
                // this.rows = this.converter(this.data);
            }
        })

        this.userService.homeUpdation.subscribe(data => {
            if (data == null || data == undefined) {
                this.loggedIn = false;
            }
            else {
                this.loggedIn = true;
                this.rows = this.converter(data);
            }
        })

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

    pageLoaded(args: EventData) {
        this.page = args.object as Page;
        this.getAllSongs(Values.readString(Values.X_ROLE_KEY, ""));
        this.getMostViewdSongs(Values.readString(Values.X_ROLE_KEY, ""));
        // this.loggedIn = true;
        // const items = new ObservableArray();

        // for (let loop = 0; loop < 200; loop++) {
        //     items.push({ value: "test " + loop.toString() });
        // }

        // this.getCategoryFolders("jjjjj");

        console.log("Page Loaded called")
    }


    pageUnloaded() {
        // alert("dying")
        this.songs = new ObservableArray();
    }


    ngOnInit(): void {
        // alert("init")
        // console.log("initHome")
        // if (this.rows == undefined || this.rows == null) {
        //     this.data = [];
        //     this.data.push(new Item("Bulbasaur", "Bulbasaur"));
        //     this.data.push(new Item("Ivysaur", "soon."));
        //     this.data.push(new Item("Venusaur", "people."));
        //     this.data.push(new Item("Charmander", "fiercely."));
        //     this.data.push(new Item("Charmeleon", "Charmeleon"));
        //     this.data.push(new Item("Charizard", "Charizard"));
        //     this.data.push(new Item("Squirtle", "Squirtle"));
        //     this.data.push(new Item("Wartortle", "Wartortle"));
        //     this.data.push(new Item("Blastoise", "Blastoise"));
        // }
        // this.rows = this.converter(this.data)
    }

    ngAfterViewInit(): void {
        // if (this.rows == undefined || this.rows == null) {
        //     this.data = [];
        //     this.data.push(new Item("Bulbasaur", "Bulbasaur"));
        //     this.data.push(new Item("Ivysaur", "soon."));
        //     this.data.push(new Item("Venusaur", "people."));
        //     this.data.push(new Item("Charmander", "fiercely."));
        //     this.data.push(new Item("Charmeleon", "Charmeleon"));
        //     this.data.push(new Item("Charizard", "Charizard"));
        //     this.data.push(new Item("Squirtle", "Squirtle"));
        //     this.data.push(new Item("Wartortle", "Wartortle"));
        //     this.data.push(new Item("Blastoise", "Blastoise"));
        // }
        // this.rows = this.converter(this.data)
        // throw new Error("Method not implemented.Home");
    }

    ngOnChanges(): void {
        alert("changes");
    }


    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        if (args.oldIndex !== -1) {
            const newIndex = args.newIndex;
            if (newIndex === 0) {
                this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
                this.tabSelectedIndex = 0;
            } else if (newIndex === 1) {
                this.tabSelectedIndexResult = "Stats Tab (tabSelectedIndex = 1 )";
            } else if (newIndex === 2) {
                this.tabSelectedIndexResult = "Settings Tab (tabSelectedIndex = 2 )";
            }
        }
    }

    getAllSongs(xRoleKey: string) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });

        this.http.get("http://docs-api-dev.m-sas.com/api/123/123/files", { headers: headers }).subscribe((res: any) => {

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




    getMostViewdSongs(xRoleKey: string) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });

        this.http.get("http://docs-api-dev.m-sas.com/api/123/123/files?isMostViewed=true", { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {

                if (res.items != undefined && res.items != null) {
                    for (var i = 0; i < res.items.length; i++) {
                        if (res.items[i].mimeType == "audio/mp3")
                            this.mostViewedSongs.push(new Song(<Song>res.items[i]))
                    }
                }
                // this.items.push(new Folder(res.items));

                // this.items.push(new Item("Bulbasaur", "Bulbasaur"));
                // this.items.push(new Item("Ivysaur", "soon."));
                // this.items.push(new Item("Venusaur", "people."));
                // this.viewModel = new Observable();
                // this.viewModel.set("items", this.mostViewedSongs);

                // this.page.bindingContext = this.viewModel;



                // let result: Folder[];
                // result = <Folder[]>res.items;
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

    // userCheck() {

    //     let headers = new HttpHeaders({
    //         "Content-Type": "application/json",
    //         "x-tenant-code": "music",
    //         "x-role-key": Values.readString(Values.X_ROLE_KEY, "")
    //     });


    //     this.http.get("http://ems-api-dev.m-sas.com/api/users/my", { headers: headers }).subscribe((res: any) => {

    //         if (res.isSuccess) {
    //             let result: any
    //             result = res.data
    //             this.user = result;
    //             // this.res = result;
    //             this.userService.setUser(result, Values.readString(Values.X_ROLE_KEY, ""));
    //             return result;
    //         }
    //         else {
    //             alert(res.error)
    //             this.user = null
    //             return null;
    //         }
    //     },
    //         error => {
    //             alert(error)
    //             this.user = null
    //             return null;
    //         })
    // }

    changeTab() {
        // this.routerExtensions.navigate(["/login"]);
    }



    onDrawerButtonTap(): void {
        this.userService.openDrawer();
    }

    cardClicked(song: Song) {
        // alert(item.heading+item.content+index);

        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "id": song.id,
                "name": song.name,
                "thumbnail": song.thumbnail,
                "url": song.url,
                "isFavourite":song.isFavourite,
                "views":song.views
            },
        };
        this.routerExtensions.navigate(["/detail"], extendedNavigationExtras)



        // this.routerExtensions.navigate(["/detail"]);
    }

    ngOnDestroy(): void {

        // alert("dead")
    }
}



