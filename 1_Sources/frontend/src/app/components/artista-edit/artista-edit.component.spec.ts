import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaEditComponent } from './artista-edit.component';

describe('ArtistaEditComponent', () => {
  let component: ArtistaEditComponent;
  let fixture: ComponentFixture<ArtistaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
