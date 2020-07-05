import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerReportesPage } from './ver-reportes.page';

describe('VerReportesPage', () => {
  let component: VerReportesPage;
  let fixture: ComponentFixture<VerReportesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerReportesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
