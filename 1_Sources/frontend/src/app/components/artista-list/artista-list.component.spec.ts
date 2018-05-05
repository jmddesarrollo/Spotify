import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaListComponent } from './artista-list.component';

describe('ArtistaListComponent', () => {
  let component: ArtistaListComponent;
  let fixture: ComponentFixture<ArtistaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
