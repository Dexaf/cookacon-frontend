import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { customFile, ImageUploadComponent } from '../../../image-upload/image-upload.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { environment } from '../../../../../environments/environment';
import { IconsModule } from '../../../../icons.module';
import { ingredientDtoOut } from '../../../../models/dtos/out/recipe.dto.out.interface';

@Component({
  selector: 'app-modify-ingredient-modal-body',
  standalone: true,
  imports: [ImageUploadComponent, ReactiveFormsModule, TranslocoModule, IconsModule],
  templateUrl: './modify-ingredient-modal-body.component.html',
  styleUrls: ['./modify-ingredient-modal-body.component.scss', '../../../../../styles.scss']
})
export class ModifyIngredientModalBodyComponent implements OnChanges {
  formGroup = inject(FormBuilder);

  providerUrl = environment.providerUrl

  @Input() ingredientToUpdate: ingredientDtoOut | null = null;
  @Input() workedIndex: number | null = null;
  @Output() modifyIngredient: EventEmitter<{ index: number, ingredient: ingredientDtoOut }> = new EventEmitter<{ index: number, ingredient: ingredientDtoOut }>()
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>()


  //ingredient form
  ingredientForm = this.formGroup.group({
    ingredientName: ["", [Validators.required]],
    ingredientQta: ["", [Validators.required]],
    ingredientPicture: [false, [Validators.requiredTrue]],
  })

  ingredientPicture: customFile | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.ingredientToUpdate) {
      this.ingredientForm.controls.ingredientName.setValue(this.ingredientToUpdate.name)
      this.ingredientForm.controls.ingredientQta.setValue(this.ingredientToUpdate.qta)
      this.ingredientForm.controls.ingredientPicture.setValue(true)

      this.ingredientPicture = {
        name: this.ingredientToUpdate.name,
        value: this.ingredientToUpdate.imageBase64 ?? this.ingredientToUpdate.pictureUrl!
      };
    }
  }

  getIngredientUploadedPhoto(uploadedPictures: customFile[]) {
    //TODO - why not called?
    debugger
    if (uploadedPictures[0]) {
      this.ingredientPicture = uploadedPictures[0];
      this.ingredientForm.controls.ingredientPicture.setValue(true)
    } else {
      this.ingredientForm.controls.ingredientPicture.setValue(false)
    }
  }

  modifyIngredientSubmit() {
    let ingredient = {
      name: this.ingredientForm.controls.ingredientName.value!,
      qta: this.ingredientForm.controls.ingredientQta.value!,
      _id: this.ingredientToUpdate?._id,
    } as any

    if (this.ingredientPicture?.value! === this.ingredientToUpdate?.pictureUrl)
      ingredient = {
        ...ingredient,
        pictureUrl: this.ingredientPicture?.value!
      }
    else
      ingredient = {
        ...ingredient,
        imageBase64: this.ingredientPicture?.value!
      }

    this.modifyIngredient.emit(
      {
        index: this.workedIndex!,
        ingredient
      }
    );
    this.closeModal.emit();
  }
}
