import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthGuard} from "../shared/authGuard/auth-guard.service";
import {HomeResolver} from "./home-resolver.service";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home', component: HomeComponent,
                canActivate: [AuthGuard],
                resolve: {
                    details: HomeResolver
                }
            }
        ])
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}