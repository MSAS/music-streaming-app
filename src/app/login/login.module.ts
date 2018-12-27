import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./components/login.component";
import { UserService } from "../services/user.service";


@NgModule({
    bootstrap: [
        LoginComponent
    ],
    imports: [
        NativeScriptModule,
        HttpModule,
        LoginRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [UserService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
