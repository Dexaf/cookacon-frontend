import { Component, Input, OnChanges, SimpleChanges, ViewChild, inject } from '@angular/core';
import { Recipe } from '../../models/interfaces/recipe.interface';
import { IconsModule } from '../../icons.module';
import { TranslocoModule } from '@ngneat/transloco';
import { RecipeType } from '../../models/enums/recipeTypes.enum';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { customFile, ImageUploadComponent } from '../image-upload/image-upload.component';
import { InfoCardComponent } from '../info-card/info-card.component';
import { ingredientDtoOut, stepDtoOut } from '../../models/dtos/out/recipe.dto.out.interface';
import { environment } from '../../../environments/environment';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { StepFormComponent } from './step-form/step-form.component';

@Component({
  selector: 'app-recipe-editor',
  standalone: true,
  imports: [IconsModule, TranslocoModule, CommonModule, ReactiveFormsModule, IngredientFormComponent, StepFormComponent, ImageUploadComponent, InfoCardComponent, FormsModule],
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss', '../../../styles.scss']
})
export class RecipeEditorComponent implements OnChanges {
  formGroup = inject(FormBuilder);
  activedRoute = inject(ActivatedRoute);
  router = inject(Router);

  @Input() editMode = false;
  @Input() recipeData?: Recipe;
  @ViewChild("mainPictureUploadRef") mainPictureUploadRef!: ImageUploadComponent;

  providerUrl = environment.providerUrl

  recipeTypes = RecipeType;

  //Recipe form
  recipeForm = this.formGroup.group({
    mainPicture: [false, [Validators.requiredTrue]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    minQta: [1, [Validators.required, Validators.min(1)]],
    cookingTime: [0, [Validators.required, Validators.min(0)]],
    cookingTimeMinute: [0, [Validators.required, Validators.min(0), Validators.max(59)]],
    type: ["ND", [Validators.required]],
  })
  ingredients: ingredientDtoOut[] = [];
  steps: stepDtoOut[] = [];
  recipeMainPicture: customFile | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (this.editMode && this.recipeData)
      this.loadRecipeData(this.recipeData)
  }

  loadRecipeData(recipeData: Recipe) {
    //TODO - pass data to app-image-upload
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
    this.ingredients = recipeData.ingredients;
    this.steps = recipeData.steps;
  }

  updateIngredients(ingredients: ingredientDtoOut[]) {
    this.ingredients = ingredients;
  }

  updateSteps(steps: stepDtoOut[]) {
    this.steps = steps;
  }

  submitRecipeEditForm() {
    if (!this.isFormValid())
      return
    else {
      console.log("go on");
    }
  }

  getMainPicture(uploadedPictures: customFile[]) {
    if (uploadedPictures[0]) {
      this.recipeMainPicture = uploadedPictures[0];
      this.recipeForm.controls.mainPicture.setValue(true)
      this.mainPictureUploadRef.resetPictures(false);
    } else {
      this.recipeMainPicture = null;
      this.recipeForm.controls.mainPicture.setValue(false)
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
}
