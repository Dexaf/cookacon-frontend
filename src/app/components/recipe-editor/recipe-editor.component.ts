import { Component, Input, OnInit, inject } from '@angular/core';
import { Recipe } from '../../models/interfaces/recipe.interface';
import { IconsModule } from '../../icons.module';
import { TranslocoModule } from '@ngneat/transloco';
import { RecipeType } from '../../models/enums/recipeTypes.enum';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-recipe-editor',
  standalone: true,
  imports: [IconsModule, TranslocoModule, CommonModule, ReactiveFormsModule, ImageUploadComponent],
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss', '../../../styles.scss']
})
export class RecipeEditorComponent implements OnInit {
  formGroup = inject(FormBuilder);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  @Input() editMode = false;
  @Input() recipeData?: Recipe;

  recipeTypes = RecipeType;

  recipeForm = this.formGroup.group({
    mainPicture: [null, [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    minQta: [1, [Validators.required, Validators.min(1)]],
    cookingTime: [0, [Validators.required, Validators.min(0)]],
    cookingTimeMinute: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
    type: ["ND", [Validators.required]],
  })
  isEditing: boolean = false;

  ngOnInit(): void {
    
    if (this.editMode && this.recipeData) {
      this.loadRecipeData(this.recipeData)
    }
  }

  submitRecipeEditForm() {
    if (!this.isFormValid())
      return
    else {
      console.log("go on");
    }
  }

  isFormValid() {
    if (!Object.keys(this.recipeTypes).some(v => v === this.recipeForm.controls.type.value)) {
      this.recipeForm.controls.type.setErrors({ typeWrong: "RECIPE_TYPE_WRONG" })
      return false;
    }
    if (this.recipeForm.controls.cookingTime.value === 0)
      if (this.recipeForm.controls.cookingTimeMinute.value === 0) {
        this.recipeForm.controls.type.setErrors({ cookitngTimeWrong: "COOKING_TIME_NON_POSITIVIE" })
        return false;
      }

    return true;
  }

  loadRecipeData(recipeData: Recipe) {
    //this.recipeForm.controls.mainPicture.setValue(this.recipeData?.mainPictureUrl ?? null);
    this.recipeForm.controls.title.setValue(recipeData?.title ?? null);
    this.recipeForm.controls.description.setValue(recipeData?.description ?? null);
    this.recipeForm.controls.minQta.setValue(recipeData?.minQta ?? 1);

    const times = recipeData?.cookingTime.split(":");

    if (times && times.length > 0) {
      this.recipeForm.controls.cookingTime.setValue(parseInt(times[0]) ?? 0);
      this.recipeForm.controls.cookingTimeMinute.setValue(parseInt(times[1]) ?? 0);
    }
    const type = Object.keys(this.recipeTypes).find(v => v === recipeData.type)
    this.recipeForm.controls.type.setValue(type ?? "ND");
  }
}
