import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CategoriesComponent } from "./components/categories.component";

const routes: Routes = [
    { path: "", component: CategoriesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CategoriesRoutingModule { }
