import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { UserService } from "../services/user.service";
import { CommentsComponent } from "./components/comments.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
    ],
    declarations: [
        CommentsComponent
    ],
    providers: [UserService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CommentsModule { }
