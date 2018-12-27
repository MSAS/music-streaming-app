import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from "./components/register.component";
import { UserService } from "../services/user.service";


@NgModule({
    bootstrap: [
        RegisterComponent
    ],
    imports: [
        NativeScriptModule,
        HttpModule,
        RegisterRoutingModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
    ],
    declarations: [
        RegisterComponent
    ],
    providers: [UserService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RegisterModule { }
