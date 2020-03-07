import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.page.html',
    styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

    constructor(private router: Router, public alertCtrl: AlertController) {
    }

    ngOnInit() {
    }

    async generateQRCode() {
        const prompt = await this.alertCtrl.create({
            message: 'Please Enter Amount to generate QR Code',
            inputs: [
                {
                    name: 'amount',
                    placeholder: 'Amount'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked', data);
                    }
                },
                {
                    text: 'Generate',
                    handler: data => {
                        console.log('data', data);
                        this.router.navigate(['folder/pages/generate-qrcode'], {queryParams: data});
                    }
                }
            ]
        });
        await prompt.present();
    }

}
