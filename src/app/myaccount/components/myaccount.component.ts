import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "application";
import { ActivatedRoute } from "@angular/router";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { UserService } from "~/app/services/user.service";

@Component({
    selector: "MyAccount",
    moduleId: module.id,
    templateUrl: "./myaccount.component.html",
    styleUrls: ['./myaccount.component.css']
})
export class MyAccountComponent implements OnInit {

    user;

    constructor(private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute,private userService:UserService) {

        this.userService.actionBarState(true)
        this.userService.actionBarText('MY ACCOUNT')
       
        this.activatedRoute.queryParams.subscribe(params => {
            this.user = params["user"];
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


    onAccountInfo() {
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.userService.homeSelector(false)
        this.routerExtensions.navigate(["/accountInfo"], extendedNavigationExtras);
    }

    onChangePassword() {
        let extendedNavigationExtras: ExtendedNavigationExtras = {
            queryParams: {
                "user": this.user
            }
        };
        this.routerExtensions.navigate(["/changePassword"], extendedNavigationExtras);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
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

