import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./components/categories.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CategoriesRoutingModule
    ],
    declarations: [
        CategoriesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CategoriesModule { }
