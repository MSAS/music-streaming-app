import { Page } from "tns-core-modules/ui/page/page";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs/dialogs";
import { Constants } from "../../models/constants";
var Toast = require("nativescript-toast");

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    list: string[] = ["res://fees_icon", "res://about", "res://notice",
        "res://datesheet", "res://news", "res://sic_icon", "res://course_icon",
        "res://syllabus", "res://result", "res://calender", "res://placement"];

    path: string;
    name: string = "Login";
    public status: boolean = false;

    public constant = new Constants();

    constructor(private activityRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions) {

    }

    ngOnInit(): void {
        this.activityRoute.queryParams.subscribe(params => {
            this.status = JSON.parse(params["status"]);
            if (this.status == true) {
                this.name = "Profile";
            }
            else {
                this.name = "Login";
            }
        });
    }

    // onHomeClick() {
    //     if (this.status == false) {
    //         this.routerExtensions.navigate(["/login"]);
    //     }
    //     else {
    //         var toast = Toast.makeText("Clicked on home button");
    //         toast.show();
    //     }
    // }

    // onDiscussionClick() {
    //     if (this.status == false) {
    //         this.routerExtensions.navigate(["/login"]);
    //     }
    //     else {
    //         var toast = Toast.makeText("Clicked on discussion button");
    //         toast.show();
    //     }
    // }

    // onAttendanceClick() {
    //     if (this.status == false) {
    //         this.routerExtensions.navigate(["/login"]);
    //     }
    //     else {
    //         var toast = Toast.makeText("Clicked on attendance button");
    //         toast.show();
    //     }
    // }

    // onLeaveClick() {
    //     if (this.status == false) {
    //         this.routerExtensions.navigate(["/login"]);
    //     }
    //     else {
    //         var toast = Toast.makeText("Clicked on leave button");
    //         toast.show();
    //     }
    // }

    // onFeesClick() {
    //     this.path = this.list[0];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.FeesUrl),
    //             "actionName": JSON.stringify(this.constant.FEES.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onAboutClick() {
    //     this.path = this.list[1];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.AboutUrl),
    //             "actionName": JSON.stringify(this.constant.ABOUT.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onNoticesClick() {
    //     this.path = this.list[2];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.NoticesUrl),
    //             "actionName": JSON.stringify(this.constant.NOTICE.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onDateSheetClick() {
    //     this.path = this.list[3];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.DateSheetUrl),
    //             "actionName": JSON.stringify(this.constant.DATESHEET.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onNewsClick() {
    //     this.path = this.list[4];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.NewsUrl),
    //             "actionName": JSON.stringify(this.constant.NEWS.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onSICClick() {
    //     this.path = this.list[5];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.SicUrl),
    //             "actionName": JSON.stringify(this.constant.SIC.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onCoursesClick() {
    //     this.path = this.list[6];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.CourseUrl),
    //             "actionName": JSON.stringify(this.constant.COURSE.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onSyllabusClick() {
    //     this.path = this.list[7];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.SyllabusUrl),
    //             "actionName": JSON.stringify(this.constant.SYLLABUS.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onResultClick() {
    //     this.path = this.list[8];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.ResultUrl),
    //             "actionName": JSON.stringify(this.constant.RESULT.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onCalenderClick() {
    //     this.path = this.list[9];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.CalendarUrl),
    //             "actionName": JSON.stringify(this.constant.CALENDAR.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onPlacementsClick() {
    //     this.path = this.list[10];
    //     let navigationExtras: NavigationExtras = {
    //         queryParams: {
    //             "url": JSON.stringify(this.constant.PlacementsUrl),
    //             "actionName": JSON.stringify(this.constant.PLACEMENT.toUpperCase()),
    //             "actionLogo": JSON.stringify(this.path)
    //         }
    //     };
    //     this.routerExtensions.navigate(["/web"], navigationExtras
    //     );
    // }

    // onLoginClick() {
    //     if (this.status == false) {
    //         this.routerExtensions.navigate(["/login"]);
    //     }
    //     else {
    //         this.routerExtensions.navigate(["/profile"]);
    //     }
    // }

}

