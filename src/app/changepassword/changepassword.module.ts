import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ChangePasswordComponent } from "~/app/changepassword/components/changepassword.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        ChangePasswordComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChangePasswordModule { }
