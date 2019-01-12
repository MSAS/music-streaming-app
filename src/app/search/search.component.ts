import { Component, OnInit, Output, EventEmitter, ViewChild, OnChanges, Input, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router"
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from "../services/user.service";
import { HttpClient } from "@angular/common/http";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";


const countries = ["Albania", "Andorra", "Australia", "Belgium", "Bulgaria", "Cyprus", "Denmark", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Japan", "Latvia", "Luxembourg", "Macedonia", "Moldova", "Monaco", "Netherlands", "Norway", "Poland", "Romania", "Russia", "Slovakia", "Slovenia", "Sweden", "Turkey", "Ukraine", "USA"];


@Component({
    selector: "search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    autocompleteCountries: ObservableArray<TokenModel>;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private routerExtensions: RouterExtensions, private userService: UserService, private http: HttpClient) {
        this.autocompleteCountries = new ObservableArray<TokenModel>();
        countries.forEach((country) => {
            this.autocompleteCountries.push(new TokenModel(country, undefined));
        });

        this.userService.actionBarState(true)
        this.userService.actionBarText("Search")
        // this.userService.actionBarText('About Us')

    }
    ngOnInit(): void {

    }
    nativegateBack(): void {
        this.routerExtensions.back();
    }

    getImageName(value) {
        return "~/images/" + value.toLowerCase() + ".png";
    }


    loading(args) {
        console.log(args)
    }
}
     // ngOnDestroy(): void {

    // }
