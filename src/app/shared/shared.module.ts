import {NgModule, ModuleWithProviders} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ChartModule} from "angular2-highcharts";
import {ActivityService} from "./activity-service/activity.service";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        HttpModule,
        NgbModule,
        ChartModule,

    ],
    declarations: [],
    exports: []
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ActivityService]
        };
    }
}