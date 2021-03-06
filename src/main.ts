// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { enableProdMode } from '@angular/core';
// import { configureOAuthProviders } from "./app/services/auth-providers-helper";
import { AppModule } from "./app/app.module";
import { configureOAuthProviders } from "./app/services/auth-providers-helpers";



// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.

configureOAuthProviders();

enableProdMode();
platformNativeScriptDynamic({createFrameOnBootstrap:true}).bootstrapModule(
    AppModule
);