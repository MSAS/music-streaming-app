import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Animation } from "ui/animation";
import { Image } from "ui/image";
import { Button } from "ui/button";

import { StackLayout } from "ui/layouts/stack-layout/stack-layout";
import { TNSPlayer } from 'nativescript-audio-ssi';
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { Label } from "tns-core-modules/ui/label/label";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "~/app/services/user.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { Comments } from "~/app/models/comments";
import { Observable } from "tns-core-modules/data/observable/observable";

@Component({
    selector: "Player",
    moduleId: module.id,
    templateUrl: "./player.component.html",
    styleUrls: ['./player.component.css']
})


export class PlayerComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('stack') stackRef: ElementRef;
    @ViewChild('button') buttonRef: ElementRef;
    @ViewChild('labelRem') labelRemRef: ElementRef;
    @ViewChild('labelPas') labelPasRef: ElementRef;


    tnsPlayer: TNSPlayer;
    stack: StackLayout;
    image: Image
    animationSet: Animation;
    duration: number;
    currentSec: number;
    currentMin: number;
    currentHour: number;

    remainingSec: number;
    remainingMin: number;
    remainingHour: number;


    player: TNSPlayer;
    _checkInterval;
    progress = 0;
    isPlaying = false;
    isBusy = true;
    buttonStyle: string;
    buttonStylePlay = 'buttonPlay';
    buttonStylePause = 'buttonPause';

    passedTime: string;
    remainingTime: string;

    // "https://cdn10.upload.solutions/7ff371083a2420071f700de75072d046/ctyov/Thug Life-(Mr-Jatt.com).mp3"

    // this.progress = Math.ceil(current / duration * 100);
    // this.currentSec = this.getSeconds(duration / 1000);
    // this.currentMin = this.getMinutes(duration / 1000);
    // this.currentHour = this.getHours(duration / 1000);
    songName
    songId
    songThumbnail
    songUrl
    songIsFavourite;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
        this.player = new TNSPlayer();
        this.passedTime = "00"
        this.remainingTime = "00"



        this.userService.homeSelector(false);


        this.activatedRoute.queryParams.subscribe(params => {
            this.songName = params.name;
            this.songId = params.id;
            this.songThumbnail = params.thumbnail;
            this.songUrl = params.url;
            this.songIsFavourite = params.isFavourite;
            // console.log("folder: ",this.folder)
            // console.log("name: ", params.folder)
            // this.id = <string>params["id"],
            //     this.folder = <string>params["name"]
            if (this.songName != null && this.songName != undefined && this.songName != "") {
                this.userService.actionBarState(true);
                this.userService.actionBarText(this.songName)
                // this.loggedIn = true;
                // this.data = this.rows;
            }
            if (this.songId != null && this.songId != undefined && this.songId != "") {
                // this.data = this.rows;
                this.getFileById(this.songId);

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



        // this.buttonStylePlay = "{background-image:url('res://ic_refresh'); background-position: center; background-repeat: no-repeat; background-size: cover;}"
        // this.buttonStylePause = "{background-image:url('res://frame31'); background-position: center; background-repeat: no-repeat; background-size: cover;}"

        // this.buttonStyle = this.buttonStylePlay;
        const playerOptions = {
            audioFile: this.songUrl,
            loop: false,
            autoplay: true,
        };

        this.player
            .playFromUrl(playerOptions)
            .then((res) => {
                console.log(res);
                var button = this.buttonRef.nativeElement as Button;
                button.backgroundImage = 'res://pause'
            })
            .catch((err) => {
                console.log("something went wrong...", err);
            });

        this.getPlayerCurrentDetails();

    }

    getSeconds(duration: number) {
        return Math.floor((duration / 1000) % 60);
    }

    getMinutes(duration: number) {
        return Math.floor((duration / 1000) / 60);
    }

    getHours(duration: number) {
        return Math.floor((duration / 1000) / 3600);
    }

    durationConverter(duration: number) {
        let seconds: number;
        let minutes: number;
        let hours: number;
        let durationRaw: number
        durationRaw = duration / 1000;

        if (Math.floor(durationRaw / 60) > 0) {
            minutes = Math.floor(durationRaw / 60);
            seconds = durationRaw % 60;
            if (minutes / 60 > 0) {
                hours = Math.floor(minutes / 60);
                minutes = minutes % 60;
            }
        }
    }

    ngOnInit(): void {
    }





    getFileById(xRoleKey: string) {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": "b1d9c479-f107-3ac3-e829-dada454e2d5f"
        });


        this.http.get("http://docs-api-dev.m-sas.com/api/files/" + this.songId, { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {
                // alert(res)
                let result: any
                result = res.data
                this.songUrl = result.url;
                // this.res = result;
                // for (var i = 0; i < result.length; i++) {
                //     this.comments.push(new Comments(result[i].comments[0]))
                // }

                // this.viewModel = new Observable();
                // this.viewModel.set("items", this.comments);

                // this.page.bindingContext = this.viewModel;
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






    ngAfterViewInit(): void {

        var button = this.buttonRef.nativeElement as Button;
        var labelRem = this.buttonRef.nativeElement as Label;
        var labelPas = this.buttonRef.nativeElement as Label;

        // this.tnsPlayer
        //     .playFromFile({
        //         audioFile: '~/app/player/components/file.mp3', 
        //         loop: false,
        //         autoPlay: false,
        //         completeCallback: this._trackComplete.bind(this),
        //         errorCallback: this._trackError.bind(this)
        //     })
        //     .then(() => {
        //         this.tnsPlayer.getAudioTrackDuration().then(duration => {

        //             console.log(`song duration:`, duration);
        //         });
        //     });
        // this.stack = this.stackRef.nativeElement as StackLayout;

        // this.animationSet = new Animation([{
        //     target: this.stack,
        //     rotate: 360,
        //     duration: 6000,
        //     iterations: Number.POSITIVE_INFINITY,
        //     curve: AnimationCurve.linear,
        // }]);
        button.backgroundImage = 'res://play'

    }

    getPlayerCurrentDetails() {

        setInterval(() => {
            this.player.getAudioTrackDuration().then((duration: any) => {
                // iOS: duration is in seconds
                // Android: duration is in milliseconds
                let current = this.player.currentTime
                this.duration = current;
                let remaining;
                if (isIOS) {
                    duration *= 1000
                    current *= 1000
                }

                remaining = duration - current


                this.progress = Math.ceil(current / duration * 100);
                this.currentSec = this.getSeconds(current);
                this.currentMin = this.getMinutes(current);
                this.currentHour = this.getHours(current);

                this.remainingSec = this.getSeconds(remaining)
                this.remainingMin = this.getMinutes(remaining)
                this.remainingHour = this.getHours(remaining)

                if (this.currentHour == 0 && this.currentMin == 0 && this.currentSec == 0) {
                    this.passedTime = "00:00"
                }
                else if (this.currentHour == 0 && this.currentMin == 0 && this.currentSec != 0) {
                    this.passedTime = "" + this.currentSec;
                }
                else if (this.currentHour == 0 && this.currentMin != 0 && this.currentSec == 0) {
                    this.passedTime = this.currentMin + ":00";
                }
                else if (this.currentHour == 0 && this.currentMin != 0 && this.currentSec != 0) {
                    this.passedTime = this.currentMin + ":" + this.currentSec;
                }
                else if (this.currentHour != 0 && this.currentMin == 0 && this.currentSec == 0) {
                    this.passedTime = this.currentHour + ":" + "00:00";
                }
                else if (this.currentHour != 0 && this.currentMin == 0 && this.currentSec != 0) {
                    this.passedTime = this.currentHour + ":00:" + this.currentSec;
                }
                else if (this.currentHour != 0 && this.currentMin != 0 && this.currentSec == 0) {
                    this.passedTime = this.currentHour + ":" + this.currentMin + ":00"
                }
                else if (this.currentHour != 0 && this.currentMin != 0 && this.currentSec != 0) {
                    this.passedTime = this.currentHour + ":" + this.currentMin + ":" + this.currentSec;
                }



                if (this.remainingHour == 0 && this.remainingMin == 0 && this.remainingSec == 0) {
                    this.remainingTime = "00:00"
                }
                else if (this.remainingHour == 0 && this.remainingMin == 0 && this.remainingSec != 0) {
                    this.remainingTime = "" + this.remainingSec;
                }
                else if (this.remainingHour == 0 && this.remainingMin != 0 && this.remainingSec == 0) {
                    this.remainingTime = this.remainingMin + ":00";
                }
                else if (this.remainingHour == 0 && this.remainingMin != 0 && this.remainingSec != 0) {
                    this.remainingTime = this.remainingMin + ":" + this.remainingSec;
                }
                else if (this.remainingHour != 0 && this.remainingMin == 0 && this.remainingSec == 0) {
                    this.remainingTime = this.remainingHour + ":" + "00:00";
                }
                else if (this.remainingHour != 0 && this.remainingMin == 0 && this.remainingSec != 0) {
                    this.remainingTime = this.remainingHour + ":00:" + this.remainingSec;
                }
                else if (this.remainingHour != 0 && this.remainingMin != 0 && this.remainingSec == 0) {
                    this.remainingTime = this.remainingHour + ":" + this.remainingMin + ":00"
                }
                else if (this.remainingHour != 0 && this.remainingMin != 0 && this.remainingSec != 0) {
                    this.remainingTime = this.remainingHour + ":" + this.remainingMin + ":" + this.remainingSec;
                }



                //     this.passedTime = this.currentHour + ":"
                //     if (this.currentMin != 0) {
                //         this.passedTime = this.currentMin + ":";
                //     }
                //     else {
                //         if (this.currentSec != 0) {
                //             this.passedTime = "00" + this.currentSec + "";
                //         }
                //         else {
                //             this.passedTime = "00" +;
                //         }
                //     }
                // }
                // else {
                //     if (this.currentMin != 0) {
                //         this.passedTime = this.currentMin + ":";
                //     }
                //     else {
                //         if (this.currentSec != 0) {
                //             this.passedTime = this.currentSec + "";
                //         }
                //         else {
                //             this.passedTime = "00";
                //         }
                //     }
                // }

                // this.passedTime = this.currentHour==0?"":this.currentHour+":"+this.currentMin==0?"":this.currentMin+":"+this.currentSec==0?"":this.currentSec;

                // labelRem.text = this.remainingTime;
                // labelPas.text = this.passedTime;

                this.isPlaying = this.player.isAudioPlaying()
            });
        }, 1000);
    }

    playPause() {
        if (this.player.isAudioPlaying()) {
            this.player.pause();
            var button = this.buttonRef.nativeElement as Button;
            button.backgroundImage = 'res://play'
            // this.buttonStyle = 'buttonPlay';

        } else {
            this.player.play();
            var button = this.buttonRef.nativeElement as Button;
            button.backgroundImage = 'res://pause'

            // this.buttonStyle = 'buttonPause';

        }
    }

    Seek() {
        this.player.seekTo(20000);
    }


    forward() {
        this.player.seekTo(this.duration + 10000);
    }

    rewind() {
        this.player.seekTo(this.duration - 10000);
    }



    ngOnDestroy() {
        this.player.dispose()
        clearInterval(this._checkInterval);
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

