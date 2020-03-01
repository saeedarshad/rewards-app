import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrcodeScanPageRoutingModule } from './qrcode-scan-routing.module';

import { QrcodeScanPage } from './qrcode-scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrcodeScanPageRoutingModule
  ],
  declarations: [QrcodeScanPage]
})
export class QrcodeScanPageModule {}
