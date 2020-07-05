import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearReportesPage } from './crear-reportes.page';

describe('CrearReportesPage', () => {
  let component: CrearReportesPage;
  let fixture: ComponentFixture<CrearReportesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearReportesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
