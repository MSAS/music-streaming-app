import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home/components/home.component";
import { IntroComponent } from "./intro/components/intro.component";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "~/app/register/components/register.component";
import { LoginComponent } from "~/app/login/components/login.component";
import { PlayerComponent } from "~/app/player/components/player.component";
import { DetailComponent } from "~/app/detail/components/detail.component";
import { MyAccountComponent } from "~/app/myaccount/components/myaccount.component";
import { AccountInfoComponent } from "~/app/accountinfo/components/accountinfo.component";
import { ChangePasswordComponent } from "~/app/changepassword/components/changepassword.component";
import { Values } from "./values/values";
import { FavouritesComponent } from "./favourites/components/favourites.component";
import { RecentMixesComponent } from "./recentmixes/components/recentmixes.component";
import { AboutUsComponent } from "./aboutus/components/aboutus.component";
import { CategoriesComponent } from "./categories/components/categories.component";
import { CategoryFilesComponent } from "./category-files/components/category-files.component";
import { CommentsComponent } from "./comments/components/comments.component";
import { SearchComponent } from "./search/search.component";

var entry: string

if (!Values.doesExist(Values.isNotNewUser)) {
    Values.writeBoolean(Values.isNotNewUser, true);
    entry = "/intro";
}
else {
    entry = "/app"
}
const routes: Routes = [
    { path: "", redirectTo: entry, pathMatch: "full" },
    { path: "login", component: LoginComponent },
    // { path: "intro", loadChildren: "~/app/intro/intro.module#IntroModule" },
    // { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "home", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "intro", component: IntroComponent },
    { path: "player", component: PlayerComponent },
    { path: "detail", component: DetailComponent },
    { path: "myAccount", component: MyAccountComponent },
    { path: "accountInfo", component: AccountInfoComponent },
    { path: "changePassword", component: ChangePasswordComponent },
    { path: "favourites", component: FavouritesComponent },
    { path: "recentMixes", component: RecentMixesComponent },
    { path: "aboutUs", component: AboutUsComponent },
    { path: "app", component: AppComponent },
    { path: "categories", component: CategoriesComponent },
    { path: "categoryFiles", component: CategoryFilesComponent },
    { path: "comments", component: CommentsComponent },
    { path: "search", component: SearchComponent }


    // { path: "player", loadChildren: "~app/player/player.module#PlayerModule" }

    // { path: "register", loadChildren: "./register/register.module#RegisterModule" }
    // { path: "login", loadChildren: "./login/login.module#LoginModule" }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
