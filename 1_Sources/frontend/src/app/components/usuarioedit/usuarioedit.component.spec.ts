import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioeditComponent } from './usuarioedit.component';

describe('UsuarioeditComponent', () => {
  let component: UsuarioeditComponent;
  let fixture: ComponentFixture<UsuarioeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
