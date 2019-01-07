import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CategoryFilesRoutingModule } from "./category-files-routing.module";
import { CategoryFilesComponent } from "./components/category-files.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CategoryFilesRoutingModule
    ],
    declarations: [
        CategoryFilesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CategoryFilesModule { }
