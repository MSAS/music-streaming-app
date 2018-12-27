import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { HttpModule } from '@angular/http';
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

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
        NativeScriptUISideDrawerModule,
        NativeScriptUIGaugeModule
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
        FavouritesComponent,
        RecentMixesComponent,
        AboutUsComponent,
        CircularProgressBarComponent
    ],
    providers: [UserService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
