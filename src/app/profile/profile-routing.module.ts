import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthGuard} from "../shared/authGuard/auth-guard.service";
import {UserResolver} from "./profile-resolver.service";



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'profile', component: ProfileComponent,
                canActivate: [AuthGuard],
                resolve: {
                    activities: UserResolver
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}
