import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaAddComponent } from './artista-add.component';

describe('ArtistaAddComponent', () => {
  let component: ArtistaAddComponent;
  let fixture: ComponentFixture<ArtistaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
