import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-generate-qrcode',
    templateUrl: './generate-qrcode.page.html',
    styleUrls: ['./generate-qrcode.page.scss'],
})
export class GenerateQrcodePage implements OnInit {
    qrCodeValue: any;
    showQrCode = false;

    constructor(public alertCtrl: AlertController, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe(params => {
            this.qrCodeValue = params.amount;
            this.showQrCode = true;
        });
    }

}
