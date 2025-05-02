import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeursComponent } from './employeurs.component';

describe('EmployeursComponent', () => {
  let component: EmployeursComponent;
  let fixture: ComponentFixture<EmployeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
