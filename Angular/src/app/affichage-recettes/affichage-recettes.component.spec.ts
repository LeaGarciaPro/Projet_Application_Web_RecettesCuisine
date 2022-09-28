import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageRecettesComponent } from './affichage-recettes.component';

describe('AffichageRecettesComponent', () => {
  let component: AffichageRecettesComponent;
  let fixture: ComponentFixture<AffichageRecettesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffichageRecettesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichageRecettesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
