import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticahijoComponent } from './practicahijo.component';

describe('PracticahijoComponent', () => {
  let component: PracticahijoComponent;
  let fixture: ComponentFixture<PracticahijoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticahijoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticahijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
