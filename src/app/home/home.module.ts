import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {SharedModule} from '../shared/shared.module';
import {HomeRoutingModule} from "./home-routing.module";
import {ActivityService} from "../shared/activity-service/activity.service";
import {HomeResolver} from "./home-resolver.service";
import {FormsModule} from "@angular/forms";
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
    imports: [CommonModule, HomeRoutingModule, SharedModule, FormsModule, FileUploadModule],
    declarations: [HomeComponent],
    exports: [HomeComponent],
    providers: [ActivityService, HomeResolver]
})
export class HomeModule {
}
