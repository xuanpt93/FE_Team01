import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPDFComponent } from './export-pdf.component';

describe('ExportPDFComponent', () => {
  let component: ExportPDFComponent;
  let fixture: ComponentFixture<ExportPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
