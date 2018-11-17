import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { HttpModule } from "@angular/http";

import { IntroComponent } from "./components/intro.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
// import { MyHttpGetService } from "./getService";


@NgModule({
    bootstrap: [
        IntroComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        HttpModule,
        NativeScriptHttpModule
    ],
    providers: [],
    declarations: [
        IntroComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
    // providers:[MyHttpGetService],
})
export class IntroModule { }