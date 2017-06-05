import {DetailsComponent} from './details.component';
import {TestBed} from "@angular/core/testing";
import {FormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";
import {DetailsRoutingModule} from "./details-routing.module";
import {CommonModule} from "@angular/common";
import {HttpModule, Response} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {HomeModule} from "../home/home.module";
import {HomeRoutingModule} from "../home/home-routing.module";


describe('Current Activity: ', function () {
    let durationHours = 2;
    let distance = 120;
    let averageSpeed;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, DetailsRoutingModule, HomeModule, HomeRoutingModule, FormsModule, SimpleNotificationsModule, HttpModule, RouterTestingModule],
            declarations: [DetailsComponent],
        });

    });

    it('Verify Average Speed', () => {
        averageSpeed = Math.round(distance / durationHours * 100) / 100;
        expect(averageSpeed).toBe(60);


    });


});
