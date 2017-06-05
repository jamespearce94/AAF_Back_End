import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ActivityService} from "../shared/activity-service/activity.service";
import {FormsModule} from "@angular/forms";
import {UserResolver} from "./profile-resolver.service";


@NgModule({
    imports: [CommonModule, ProfileRoutingModule, FormsModule],
    declarations: [ProfileComponent],
    exports: [ProfileComponent],
    providers: [ActivityService, UserResolver]
})
export class ProfileModule {
}
