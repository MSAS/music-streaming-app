import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { MyAccountComponent } from "~/app/myaccount/components/myaccount.component";
import { UserService } from "../services/user.service";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        MyAccountComponent
    ],
    providers: [UserService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MyAccountModule { }
