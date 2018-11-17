import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home/components/home.component";
import { IntroComponent } from "./intro/components/intro.component";

const routes: Routes = [
    { path: "", redirectTo: "/intro", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "intro", component: IntroComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
