import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoadingController, Platform, ToastController} from '@ionic/angular';
import jsQR from 'jsqr';
import {Router} from '@angular/router';

@Component({
    selector: 'app-qrcode-scan',
    templateUrl: './qrcode-scan.page.html',
    styleUrls: ['./qrcode-scan.page.scss'],
})
export class QrcodeScanPage implements OnInit, AfterViewInit {

    scanActive = false;
    videoElement: any;
    canvasElement: any;
    canvasContext: any;
    loading;

    @ViewChild('video', {static: false}) video: ElementRef;
    @ViewChild('canvas', {static: false}) canvas: ElementRef;

    constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController,
                private plf: Platform, private router: Router) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.videoElement = this.video.nativeElement;
        this.canvasElement = this.canvas.nativeElement;
        this.canvasContext = this.canvasElement.getContext('2d');
        this.startScan();
    }

    async startScan() {
        this.videoElement.srcObject = await navigator.mediaDevices.getUserMedia({
            video: {facingMode: 'environment'}
        });
        // this.videoElement.setAttribute('playsinline', true);
        await this.videoElement.play();
        this.loading = await this.loadingCtrl.create({});
        await this.loading.present();
        requestAnimationFrame(this.scan.bind(this));
    }

    async scan() {
        if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
            if (this.loading) {
                await this.loading.dismiss();
                this.loading = null;
                this.scanActive = true;
            }
            this.canvasStuff();
        } else {
            requestAnimationFrame(this.scan.bind(this));
        }
    }

    canvasStuff() {
        this.canvasElement.height = this.videoElement.videoHeight;
        this.canvasElement.width = this.videoElement.videoWidth;

        this.canvasContext.drawImage(this.videoElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
        const imageData = this.canvasContext.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'dontInvert'});

        if (qrCode) {
            this.scanActive = false;
            this.saveReward(qrCode.data);
        } else {
            if (this.scanActive) {
                requestAnimationFrame(this.scan.bind(this));
            }
        }
    }

    saveReward(result) {
        console.log('Data', result);
        this.videoElement.srcObject.getTracks().forEach(track => {
            track.stop();
        });
        // Do the calculation here and saver the user reward to backend
        this.router.navigate(['folder/pages/user-home']);
    }

}
