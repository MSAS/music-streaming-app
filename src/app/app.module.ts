import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/components/home.component";
import { IntroComponent } from "./intro/components/intro.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialog, MatDialogModule } from "@angular/material";
import { Overlay } from "@angular/cdk/overlay";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        MatDialogModule
    ],
    // entryComponents: [
    //     DialogComponent
    // ],
    declarations: [
        AppComponent,
        HomeComponent,
        IntroComponent
    ],
    providers: [MatDialog, Overlay],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
