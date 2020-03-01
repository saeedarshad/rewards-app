import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user-home',
    templateUrl: './user-home.page.html',
    styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
    rewardPoints = 0;

    constructor(private router: Router) {
    }

    ngOnInit() {
        // Api call to get Score
        this.rewardPoints = 25;
    }

    openScanPage() {
        this.router.navigate(['folder/pages/qrcode-scan']);
    }

}
