import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { RecentMixesRoutingModule } from "./recentmixes-routing.module";
import { RecentMixesComponent } from "./components/recentmixes.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        RecentMixesRoutingModule
    ],
    declarations: [
        RecentMixesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RecentMixesModule { }
