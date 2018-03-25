import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaDetailComponent } from './artista-detail.component';

describe('ArtistaDetailComponent', () => {
  let component: ArtistaDetailComponent;
  let fixture: ComponentFixture<ArtistaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
