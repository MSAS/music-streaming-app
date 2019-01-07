import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { IntroComponent } from "~/app/intro/components/intro.component";

const routes: Routes = [
    { path: "", component: IntroComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class IntroRoutingModule { }
