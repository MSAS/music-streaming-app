import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { FavouritesRoutingModule } from "./favourites-routing.module";
import { FavouritesComponent } from "./components/favourites.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        FavouritesRoutingModule
    ],
    declarations: [
        FavouritesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FavouritesModule { }
