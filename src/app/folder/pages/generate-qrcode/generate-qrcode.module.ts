import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { IonicModule } from '@ionic/angular';

import { GenerateQrcodePageRoutingModule } from './generate-qrcode-routing.module';

import { GenerateQrcodePage } from './generate-qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateQrcodePageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [GenerateQrcodePage]
})
export class GenerateQrcodePageModule {}
