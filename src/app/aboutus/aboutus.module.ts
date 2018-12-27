import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AboutUsRoutingModule } from "./aboutus-routing.module";
import { AboutUsComponent } from "./components/aboutus.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        AboutUsRoutingModule
    ],
    declarations: [
        AboutUsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AboutUsModule { }
