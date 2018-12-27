import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AccountInfoComponent } from "~/app/accountinfo/components/accountinfo.component";
import { UserService } from "../services/user.service";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        AccountInfoComponent
    ],
    providers: [UserService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountInfoModule { }
