import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CategoryFilesComponent } from "./components/category-files.component";

const routes: Routes = [
    { path: "", component: CategoryFilesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CategoryFilesRoutingModule { }
