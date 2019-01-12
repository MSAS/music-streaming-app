import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { SearchComponent } from "./search.component";
import { NO_ERRORS_SCHEMA, NgModule } from "@angular/core";

 

@NgModule({
    imports: [
       
        NativeScriptUIAutoCompleteTextViewModule,
        
    ],
    declarations: [
        SearchComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
