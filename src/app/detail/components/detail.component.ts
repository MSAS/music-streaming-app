import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as app from "application";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "~/app/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { ObservableArray } from "tns-core-modules/data/observable-array/observable-array";
import { Comments } from "~/app/models/comments";
import { Observable, EventData } from "tns-core-modules/data/observable/observable";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from "~/app/values/values";

class item {
    constructor(name: string) {

    }
}

@Component({
    selector: "Detail",
    moduleId: module.id,
    templateUrl: "./detail.component.html",
    styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
    page;
    items = [];
    songName;
    songId;
    songThumbnail;
    songUrl;
    songViews;
    songIsFavourite;

    favouriteIcon = "res://favourite_white";

    commentsExist: boolean = false;
    comments = new ObservableArray();
    viewModel;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));
        this.items.push(new item("nvjnvn"));

        this.userService.homeSelector(false);
        this.favouriteIcon = "res://favourite_white";

        this.activatedRoute.queryParams.subscribe(params => {
            this.songName = params.name;
            this.songId = params.id;
            this.songThumbnail = params.thumbnail;
            this.songUrl = params.url;
            this.songViews = params.views;

            this.songIsFavourite = <boolean>params.isFavourite;
            // console.log("folder: ",this.folder)
            // console.log("name: ", params.folder)
            // this.id = <string>params["id"],
            //     this.folder = <string>params["name"]
            if (this.songIsFavourite) {
                this.favouriteIcon = "res://favourite_red";

            }
            if (this.songName != null && this.songName != undefined && this.songName != "") {
                this.userService.actionBarState(true);
                this.userService.actionBarText("Details")
                // this.loggedIn = true;
                // this.data = this.rows;
            }
            if (this.songId != null && this.songId != undefined && this.songId != "") {
                // this.data = this.rows;
                // this.getCategoryFilesComments(this.songId);

            }
            // else {
            //     if (Values.readString(Values.X_ROLE_KEY, "") != "") {
            //         this.getUser(Values.readString(Values.X_ROLE_KEY, ""));
            //     }
            //     else {
            //         this.loggedIn = false;
            //     }
            // }


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
    }

    ngOnInit(): void {

    }



    pageLoaded(args: EventData) {
        this.page = args.object as Page;
        this.getComments(Values.readString(Values.X_ROLE_KEY, ""));
        // this.loggedIn = true;
        // const items = new ObservableArray();

        // for (let loop = 0; loop < 200; loop++) {
        //     items.push({ value: "test " + loop.toString() });
        // }

        // this.getCategoryFolders("jjjjj");
        if (this.comments == undefined || this.comments == null || this.comments.length == 0) {
            this.commentsExist = false;
        }
        else {
            this.commentsExist = true;
        }
        console.log("Page Loaded called")
    }


    pageUnloaded() {
        // alert("dying")
        this.comments = new ObservableArray();
    }



    setFavouriteSong(xRoleKey: string, songId: string, state: boolean) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });

        var body = { "isFavourite": state }

        this.http.put("http://docs-api-dev.m-sas.com/api/files/" + songId, body, { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {

                if (<boolean>res.data.isFavourite) {
                    this.favouriteIcon = "res://favourite_red";
                    alert("Added to Favourites")
                }
                else {
                    this.favouriteIcon = "res://favourite_white";
                    alert("Removed from Favourites")
                }

                this.songIsFavourite = <boolean>res.data.isFavourite;



                // this.favouriteIcon = "res://icon_wishlist_video"
                // if (res.items != undefined && res.items != null) {
                //     for (var i = 0; i < res.items.length; i++) {
                //         if (res.items[i].mimeType == "audio/mp3")
                //             this.songs.push(new Song(<Song>res.items[i]))
                //     }
                // }
                // this.items.push(new Folder(res.items));

                // this.items.push(new Item("Bulbasaur", "Bulbasaur"));
                // this.items.push(new Item("Ivysaur", "soon."));
                // this.items.push(new Item("Venusaur", "people."));
                // this.viewModel = new Observable();
                // this.viewModel.set("items", this.songs);

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



    getComments(xRoleKey: string) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });


        this.http.get("http://rating-api-dev.m-sas.com/api/files/" + this.songId + "/ratingLogs", { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {
                // alert(res)
                let result: any
                result = res.items
                // this.res = result;
                for (var i = 0; i < result.length; i++) {
                    this.comments.push(new Comments(result[i].comments[0]))
                }

                this.viewModel = new Observable();
                this.viewModel.set("items", this.comments);

                this.page.bindingContext = this.viewModel;
                // return result;
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




    onTitleClick() {
        // this.routerExt.navigate(['/player']);

        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "id": this.songId,
                "name": this.songName,
                "thumbnail": this.songThumbnail,
                "url": this.songUrl,
                "isFavourite": this.songIsFavourite
            },
        };
        this.routerExtensions.navigate(["/player"], extendedNavigationExtras)



        // this.routerExtensions.navigate(["/player"]);
    }



    onFavouriteClick() {
        if (this.songIsFavourite) {
            this.setFavouriteSong("nbnvnvnv", this.songId, false)
            // this.favouriteIcon = "res://favourite_white"
        }
        else {
            this.setFavouriteSong("nbnvnvnv", this.songId, true)
            // this.favouriteIcon = "res://favourite_red"

        }
    }

    onCommentClick() {
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "id": this.songId
            },
        };
        this.routerExtensions.navigate(["/comments"], extendedNavigationExtras)


        // this.routerExtensions.navigate(["comments"]);
    }
}


































// import { Component, OnInit, OnDestroy } from "@angular/core";
// import { Router, NavigationExtras, ActivatedRoute } from "@angular/router"
// import { RouterExtensions } from "nativescript-angular/router";
// import { Constants } from "../../models/constants";
// import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
// import * as app from "application";
// import { RadSideDrawer } from "nativescript-ui-sidedrawer";
// import { Page } from "tns-core-modules/ui/page/page";
// import { TNSPlayer } from "nativescript-audio";
// import { isIOS } from "tns-core-modules/platform";

// @Component({
//     selector: "detail",
//     moduleId: module.id,
//     templateUrl: "./detail.component.html",
//     styleUrls: ['./detail.component.css']
// })

// export class DetailComponent implements OnInit{

//     size = [this.random(), this.random(), this.random()];
//     progress = [this.random(0, 100), this.random(0, 100), this.random(0, 100)];

//     constructor() {
//     }

//     ngOnInit(): void {
//     }

//     onButtonTap(): void {
//         this.size = [this.random(), this.random(), this.random()];
//         this.progress = [this.random(0, 100), this.random(0, 100), this.random(0, 100)];
//     }

//     random(min = 50, max = 150) {
//         return Math.floor(Math.random() * (max - min + 1)) + min;
//     }

    // path: string;
    // name: string = "Login";
    // public status: boolean = false;
    // data = [];
    // public tabSelectedIndex: number;
    // public tabSelectedIndexResult: string;

    // public constant = new Constants();

    // constructor(private _page: Page, private activityRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions) {
    //     this.tabSelectedIndex = 0;
    // }

    // ngOnInit(): void {
    //     this.data.push({ heading: "Bulbasaur", content: "Bulbasaur" });
    //     this.data.push({ heading: "Ivysaur", content: "soon." });
    //     this.data.push({ heading: "Venusaur", content: "people." });
    //     this.data.push({ heading: "Charmander", content: "fiercely." });
    //     this.data.push({ heading: "Charmeleon", content: "Charmeleon" });
    //     this.data.push({ heading: "Charizard", content: "Charizard" });
    //     this.data.push({ heading: "Squirtle", content: "Squirtle" });
    //     this.data.push({ heading: "Wartortle", content: "Wartortle" });
    //     this.data.push({ heading: "Blastoise", content: "Blastoise" });
    // }


    // onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
    //     if (args.oldIndex !== -1) {
    //         const newIndex = args.newIndex;
    //         if (newIndex === 0) {
    //             this.tabSelectedIndexResult = "Profile Tab (tabSelectedIndex = 0 )";
    //         } else if (newIndex === 1) {
    //             this.tabSelectedIndexResult = "Stats Tab (tabSelectedIndex = 1 )";
    //         } else if (newIndex === 2) {
    //             this.tabSelectedIndexResult = "Settings Tab (tabSelectedIndex = 2 )";
    //         }
    //     }
    // }

    // onNavBtnTap() {
    //     this.routerExtensions.back();
    // }

    // onDrawerButtonTap(): void {
    //     const sideDrawer = <RadSideDrawer>app.getRootView();
    //     sideDrawer.showDrawer();
    // }

    // clicked(item: string, index: number) {
    //     alert(item + index);
    // }

    // player: TNSPlayer;
    // _checkInterval;
    // progress = 0;
    // isPlaying = false;

    // constructor() {
    //     this.player = new TNSPlayer();

    //     const playerOptions = {
    //         audioFile: "http://jatt.fukra.jatt.in.net/128/38465/Jind%20Mahi%20-%20Diljit%20Dosanjh%20(Mr-Punjab.Com).mp3",
    //         loop: false,
    //         autoplay: false,
    //     };

    //     this.player
    //         .initFromUrl(playerOptions)
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((err) => {
    //             console.log("something went wrong...", err);
    //         });
    // }

    // ngOnInit(): void {
    //     this._checkInterval = setInterval(() => {
    //         this.player.getAudioTrackDuration().then((duration: any) => {
    //             // iOS: duration is in seconds
    //             // Android: duration is in milliseconds
    //             let current = this.player.currentTime
    //             if (isIOS) {
    //                 duration *= 1000
    //                 current *= 1000
    //             }

    //             this.progress = Math.ceil(current / duration * 100);

    //             this.isPlaying = this.player.isAudioPlaying()
    //         });
    //     }, 200);
    // }

    // playPause() {
    //     if (this.player.isAudioPlaying()) {
    //         this.player.pause();
    //     } else {
    //         this.player.play();
    //     }
    // }

    // ngOnDestroy() {
    //     clearInterval(this._checkInterval);
    // }



    // size = [this.random(), this.random(), this.random()];
    // progress = [this.random(0, 100), this.random(0, 100), this.random(0, 100)];

    // constructor() {
    // }

    // ngOnInit(): void {
    // }

    // onButtonTap(): void {
    //     this.size = [this.random(), this.random(), this.random()];
    //     this.progress = [this.random(0, 100), this.random(0, 100), this.random(0, 100)];
    // }

    // random(min = 50, max = 150) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

// }

