import { Component, OnInit } from "@angular/core";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions, ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { Values } from "~/app/values/values";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { UserService } from "~/app/services/user.service";
import { User } from "~/app/models/user";
import { Profile } from "~/app/models/profile";
import { Address } from "~/app/models/address";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "AccountInfo",
    moduleId: module.id,
    templateUrl: "./accountinfo.component.html",
    styleUrls: ['./accountinfo.component.css']
})
export class AccountInfoComponent implements OnInit {
    user;
    firstName = '';
    lastName = '';
    email = '';
    address = '';
    city = '';
    country = '';
    pinCode = '';
    phone = '';
    line1 = '';
    line2;
    postUser = new User();

    constructor(private page: Page, private routerExtensions: RouterExtensions, private http: HttpClient, private userService: UserService, private activatedRoute: ActivatedRoute) {
        // this.page.actionBarHidden = true;
        // this.postUser = new User();

        this.userService.actionBarState(false)
        // this.userService.actionBarText('DJ Rick Geez')

        this.activatedRoute.queryParams.subscribe(params => {
            this.user = params["user"];
        })
        if (Values.readString(Values.X_ROLE_KEY, "") != "" && Values.readString(Values.X_ROLE_KEY, "") != null && Values.readString(Values.X_ROLE_KEY, "") != undefined) {
            this.user = this.userCheck();

            if (this.user != null) {
                if (this.user.profile != null && this.user.profile != undefined) {
                    if (this.user.profile.firstName != null && this.user.profile.firstName != undefined) {
                        this.firstName = this.user.profile.firstName;
                    }
                    if (this.user.profile.lastName != null && this.user.profile.lastName != undefined) {
                        this.lastName = this.user.profile.lastName;
                    }
                }
                if (this.user.phone != null && this.user.phone != undefined) {
                    this.phone = this.user.phone;
                }
                if (this.user.email != null && this.user.email != undefined) {
                    this.email = this.user.email;
                }
                if (this.user.address != null && this.user.address != undefined) {
                    if (this.user.address.line1 != null && this.user.address.line1 != undefined) {
                        this.line1 = this.user.address.line1;
                    }
                    if (this.user.address.line2 != null && this.user.address.line2 != undefined) {
                        this.line2 = this.user.address.line2;
                    }
                    if (this.user.address.city != null && this.user.address.city != undefined) {
                        this.city = this.user.address.city;
                    }
                    if (this.user.address.country != null && this.user.address.country != undefined) {
                        this.country = this.user.address.country;
                    }
                    if (this.user.address.pinCode != null && this.user.address.pinCode != undefined) {
                        this.pinCode = this.user.address.pinCode;
                    }
                }
                // this.userService.setUser(this.user, Values.readString(Values.X_ROLE_KEY, ""));
                // this.name = this.user.name;

            }
        }
        else {

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

    }

    ngOnInit(): void {
    }

    // onTextChange(args) {
    //     var textField = <TextField>args;
    //     var text = textField.text;
    //     alert(text);
    // }


    public firstNameTextField(args) {
        var textField = <TextField>args.object;
        this.firstName = textField.text;
        // this.postUser.profile.firstName = this.firstName;
    }

    public lastNameTextField(args) {
        var textField = <TextField>args.object;
        this.lastName = textField.text;
        // this.postUser.profile.lastName = this.lastName;
    }

    public emailTextField(args) {
        var textField = <TextField>args.object;
        this.email = textField.text;
        // this.postUser.email = this.email;
    }
    public phoneTextField(args) {
        var textField = <TextField>args.object;
        this.phone = textField.text;
        // this.postUser.phone = this.phone;
    }

    public addressTextField(args) {
        var textField = <TextField>args.object;
        this.address = textField.text;
        // this.postUser.address.line1 = this.address;
    }
    public cityTextField(args) {
        var textField = <TextField>args.object;
        this.city = textField.text;
        // this.postUser.address.city = this.city;
    }
    public pinTextField(args) {
        var textField = <TextField>args.object;
        this.pinCode = textField.text;
        // this.postUser.address.pinCode = this.pinCode;
    }


    userCheck() {
        console.log(Values.readString(Values.X_ROLE_KEY, ""));
        return this.userService.currentUser;

        // let headers = new HttpHeaders({
        //     "Content-Type": "application/json",
        //     "x-tenant-code": "music",
        //     "x-role-key": Values.readString(Values.X_ROLE_KEY, "")
        // });


        // this.http.get("http://ems-api-dev.m-sas.com/api/users/my", { headers: headers }).subscribe((res: any) => {

        //     if (res.isSuccess) {
        //         let result: any
        //         result = res.data
        //         // this.res = result;
        //         for (var i = 0; i < result.roles.length; i++) {
        //             if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
        //                 Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
        //                 let extendedNavigationExtras: ExtendedNavigationExtras = {
        //                     queryParams: {
        //                         "user": result
        //                     }
        //                 };
        //                 this.userService.setUser(result, result.roles[i].key);
        //                 this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
        //             }
        //             else {
        //                 alert("Authentication Problem (Could not get role key)");
        //             }
        //         }
        //         return result;
        //     }
        //     else {
        //         alert(res.error)
        //         return null;
        //     }
        // },
        //     error => {
        //         alert(error)
        //         return null;
        //     })
    }

    onSubmit() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music",
            "x-role-key": Values.readString(Values.X_ROLE_KEY, "")
        });

        var profile = new Profile();
        profile.firstName = this.firstName;
        profile.lastName = this.lastName;


        var address = new Address();
        address.line1 = this.address;
        address.city = this.city;
        address.pinCode = this.pinCode;

        // this.postUser.
        // this.postUser.
        this.postUser.email = this.email;
        this.postUser.phone = this.phone;
        this.postUser.profile = profile;
        this.postUser.address = address;
        // this.postUser.
        // this.postUser.
        // this.postUser.

        this.http.put("http://ems-api-dev.m-sas.com/api/users/my", this.postUser, { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {
                let result: any
                result = res.data
                this.userService.setUser(result, Values.readString(Values.X_ROLE_KEY, ""));
                this.routerExtensions.navigate(["/home"]);

                // this.res = result;
                // for (var i = 0; i < result.roles.length; i++) {
                //     if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                //         Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                //         let extendedNavigationExtras: ExtendedNavigationExtras = {
                //             queryParams: {
                //                 "user": result
                //             }
                //         };
                //         this.userService.setUser(result, result.roles[i].key);
                //         this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
                //     }
                //     else {
                //         alert("Authentication Problem (Could not get role key)");
                //     }
                // }
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

    nativegateBack(): void {
        this.routerExtensions.back();
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

