import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionAddComponent } from './cancion-add.component';

describe('CancionAddComponent', () => {
  let component: CancionAddComponent;
  let fixture: ComponentFixture<CancionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
