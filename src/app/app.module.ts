import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';


import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';
import {LoginModule} from './login/login.module';
import {FormsModule} from "@angular/forms";
import {DetailsModule} from './activity-details/details.module';
import {AuthGuard} from "./shared/authGuard/auth-guard.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SimpleNotificationsModule} from "angular2-notifications";
import {FileUploadModule} from "ng2-file-upload";
import {AgmCoreModule} from "angular2-google-maps/core";
import {ProfileModule} from "./profile/profile.module";
import {MaterialModule} from "@angular/material";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        LoginModule,
        HomeModule,
        DetailsModule,
        ProfileModule,
        AppRoutingModule,
        MaterialModule.forRoot(),
        NgbModule.forRoot(),
        SharedModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBMEbDV_fuaoXQ3JVLZF_PqxP7wIc2IQEk ',
            libraries: ['geometry']
        }),
        SimpleNotificationsModule,
        FileUploadModule

    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
