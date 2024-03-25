import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { customFile, ImageUploadComponent } from '../../image-upload/image-upload.component';
import { IconsModule } from '../../../icons.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ingredientDtoOut } from '../../../models/dtos/out/recipe.dto.out.interface';
import { cardAction, cardEvent, InfoCardComponent } from '../../info-card/info-card.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ingredient-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    ImageUploadComponent,
    IconsModule,
    InfoCardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss', '../../../../styles.scss']
})
export class IngredientFormComponent {
  formGroup = inject(FormBuilder);

  @Input() ingredients: ingredientDtoOut[] = [];
  @Output() updateIngredients: EventEmitter<ingredientDtoOut[]> = new EventEmitter<ingredientDtoOut[]>()
  @ViewChild("ingredientPictureUpload") ingredientPictureUploadRef!: ImageUploadComponent;

  providerUrl = environment.providerUrl

  //ingredient form
  ingredientForm = this.formGroup.group({
    ingredientName: [null, [Validators.required]],
    ingredientQta: [null, [Validators.required]],
    ingredientPicture: [false, [Validators.requiredTrue]],
  })
  ingredientPicture: customFile | null = null;

  infoCardActions: cardAction[] = [
    {
      eventName: ingredientActions.DELETE,
      hasPayload: true,
      iconName: "X"
    }
  ]

  getIngredientUploadedPhoto(uploadedPictures: customFile[]) {
    if (uploadedPictures[0]) {
      this.ingredientPicture = uploadedPictures[0];
      this.ingredientForm.controls.ingredientPicture.setValue(true)
    } else {
      this.ingredientPicture = null;
      this.ingredientForm.controls.ingredientPicture.setValue(false)
    }
  }

  addIngredient() {
    this.ingredients.push({
      name: this.ingredientForm.controls.ingredientName.value!,
      qta: this.ingredientForm.controls.ingredientQta.value!,
      imageBase64: this.ingredientPicture?.value!
    })
    this.ingredientForm.reset();
    this.ingredientPictureUploadRef.resetPictures();

    this.updateIngredients.emit(this.ingredients);
  }

  infoCardEventHandler(event: cardEvent) {
    switch (event.eventName) {
      case ingredientActions.DELETE:
        let index = event.payload
        if (!index)
          return;
        if (typeof index === "string")
          index = parseInt(index);
        this.ingredients.splice(index, 1);
        this.ingredients = [...this.ingredients]
        break;
      case ingredientActions.DRAG:

        break;
      case ingredientActions.MODIFY:
        break;
    }
  }
}

enum ingredientActions {
  DELETE = "delete",
  DRAG = "drag",
  MODIFY = "modify"
}