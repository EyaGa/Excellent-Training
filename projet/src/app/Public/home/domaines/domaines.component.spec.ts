import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainesComponent} from './domaines.component';

describe('DomainesComponent', () => {
  let component: DomainesComponent;
  let fixture: ComponentFixture<DomainesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomainesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
