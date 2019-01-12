import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { GridViewModule } from "nativescript-grid-view/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { MatDialog, MatDialogModule } from "@angular/material";
import { IntroModule } from "./intro/intro.module";
import { HomeModule } from "./home/home.module";
import { RegisterModule } from "./register/register.module";
import { LoginModule } from "./login/login.module";
import { PlayerModule } from "./player/player.module";
import { LoginComponent } from "~/app/login/components/login.component";
import { RegisterComponent } from "~/app/register/components/register.component";
import { IntroComponent } from "~/app/intro/components/intro.component";
import { HomeComponent } from "~/app/home/components/home.component";
import { PlayerComponent } from "~/app/player/components/player.component";
import { DetailComponent } from "~/app/detail/components/detail.component";
import { MyAccountComponent } from "~/app/myaccount/components/myaccount.component";
import { ChangePasswordComponent } from "~/app/changepassword/components/changepassword.component";
import { AccountInfoComponent } from "~/app/accountinfo/components/accountinfo.component";
import { CircularProgressBarComponent } from "~/app/player/components/circular-progress-bar.component";
import { NativeScriptUIGaugeModule } from "nativescript-ui-gauge/angular/gauges-directives";
import { UserService } from "./services/user.service";
import { FavouritesComponent } from "./favourites/components/favourites.component";
import { RecentMixesComponent } from "./recentmixes/components/recentmixes.component";
import { AboutUsComponent } from "./aboutus/components/aboutus.component";
import { ModalComponent } from "./modal/modal.component";
// import { NativeScriptFacebookModule } from "nativescript-facebook/angular";
// import * as application from 'application';
// import { init, LoginBehavior } from "nativescript-facebook";
// import { AuthService } from "./services/auth.service";
 
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
 
import { AuthService } from "./services/auth.service";
import { CategoriesComponent } from "./categories/components/categories.component";
import { CategoryFilesComponent } from "./category-files/components/category-files.component";
import { CommentsComponent } from "./comments/components/comments.component";
import { SearchComponent } from "./search/search.component";
 
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";

import { registerElement } from 'nativescript-angular/element-registry';
// import { Ripple } from 'nativescript-material-ripple';
// registerElement('MDRipple', () => Ripple);
 // 
// let nsFacebook = require('nativescript-facebook');

// application.on(application.launchEvent, function (args) {
//     init("349645965835098",  LoginBehavior.LoginBehaviorWeb);
// });

@NgModule({
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        RegisterComponent,
        LoginComponent,
        IntroComponent,
        HomeComponent,
        PlayerComponent,
        DetailComponent,
        MyAccountComponent,
        AccountInfoComponent,
        CategoriesComponent,
        CategoryFilesComponent,
        FavouritesComponent,
        RecentMixesComponent,
        AboutUsComponent,
        SearchComponent,
        ChangePasswordComponent,
        CircularProgressBarComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpModule,
        HttpClientModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        MatDialogModule,
        
        NativeScriptUIAutoCompleteTextViewModule,
       
       NativeScriptUISideDrawerModule,  
        
        GridViewModule,
        // NativeScriptFacebookModule,
     
       
        // IntroModule,
        // HomeModule,
        // RegisterModule,
        // LoginModule
    ],
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        IntroComponent,
        HomeComponent,
        PlayerComponent,
        DetailComponent,
        MyAccountComponent,
        AccountInfoComponent,
        ChangePasswordComponent,
        CategoriesComponent,
        CategoryFilesComponent,
        FavouritesComponent,
        RecentMixesComponent,
        AboutUsComponent,
        CommentsComponent,
        CircularProgressBarComponent,
        ModalComponent,
        SearchComponent
    ],
    providers: [UserService, AuthService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
