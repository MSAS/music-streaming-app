import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { RegisterComponent } from "./components/register.component";

// const routes: Routes = [
//     { path: "", redirectTo: "/register", pathMatch: "full" },
//     { path: "register", component: RegisterComponent },
// ];

const routes: Routes = [
    { path: "", component: RegisterComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class RegisterRoutingModule { }
