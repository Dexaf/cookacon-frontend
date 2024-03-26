import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyIngredientModalBodyComponent } from './modify-ingredient-modal-body.component';

describe('ModifyIngredientModalBodyComponent', () => {
  let component: ModifyIngredientModalBodyComponent;
  let fixture: ComponentFixture<ModifyIngredientModalBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyIngredientModalBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyIngredientModalBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
