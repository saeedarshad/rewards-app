import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrcodeScanPage } from './qrcode-scan.page';

describe('QrcodeScanPage', () => {
  let component: QrcodeScanPage;
  let fixture: ComponentFixture<QrcodeScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeScanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrcodeScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
