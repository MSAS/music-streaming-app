import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FavouritesComponent } from "./components/favourites.component";

const routes: Routes = [
    { path: "", component: FavouritesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FavouritesRoutingModule { }
