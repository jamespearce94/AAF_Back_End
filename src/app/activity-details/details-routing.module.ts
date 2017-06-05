import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DetailsComponent} from './details.component';
import {AuthGuard} from "../shared/authGuard/auth-guard.service";
import {DetailsResolver} from "./details-resolver.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'details/:id', component: DetailsComponent,
                canActivate: [AuthGuard],
                resolve: {
                    details: DetailsResolver
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class DetailsRoutingModule {
}