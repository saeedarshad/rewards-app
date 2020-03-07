import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateQrcodePage } from './generate-qrcode.page';

describe('GenerateQrcodePage', () => {
  let component: GenerateQrcodePage;
  let fixture: ComponentFixture<GenerateQrcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateQrcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
