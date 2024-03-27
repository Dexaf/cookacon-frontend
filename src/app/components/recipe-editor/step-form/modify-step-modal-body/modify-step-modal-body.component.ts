import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { IconsModule } from '../../../../icons.module';
import { customFile, ImageUploadComponent } from '../../../image-upload/image-upload.component';
import { environment } from '../../../../../environments/environment';
import { stepDtoOut } from '../../../../models/dtos/out/recipe.dto.out.interface';

@Component({
  selector: 'app-modify-step-modal-body',
  standalone: true,
  imports: [ImageUploadComponent, ReactiveFormsModule, TranslocoModule, IconsModule],
  templateUrl: './modify-step-modal-body.component.html',
  styleUrls: ['./modify-step-modal-body.component.scss', '../../../../../styles.scss']
})
export class ModifyStepModalBodyComponent implements OnChanges {
  formGroup = inject(FormBuilder);

  providerUrl = environment.providerUrl

  @Input() stepToUpdate: stepDtoOut | null = null;
  @Input() workedIndex: number | null = null;
  @Output() modifyStep: EventEmitter<{ index: number, step: stepDtoOut }> = new EventEmitter<{ index: number, step: stepDtoOut }>()
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>()

  //steps form
  stepForm = this.formGroup.group({
    stepTitle: ["", [Validators.required]],
    stepDescription: ["", [Validators.required]],
    stepPicture: [false, [Validators.requiredTrue]],
  })
  stepPicture: customFile | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.stepToUpdate) {
      this.stepForm.controls.stepTitle.setValue(this.stepToUpdate.title)
      this.stepForm.controls.stepDescription.setValue(this.stepToUpdate.description)
      this.stepForm.controls.stepPicture.setValue(true)

      this.stepPicture = {
        name: this.stepToUpdate.title,
        value: this.stepToUpdate.imageBase64 ?? this.stepToUpdate.pictureUrl!
      };
    }
  }

  uploadNewPicture(uploadedPictures: customFile[]) {
    console.log("MODIFY")
    if (uploadedPictures[0]) {
      this.stepPicture = uploadedPictures[0];
      this.stepForm.controls.stepPicture.setValue(true)
    } else {
      this.stepForm.controls.stepPicture.setValue(false)
    }
  }

  modifyIngredientSubmit() {
    let step = {
      title: this.stepForm.controls.stepTitle.value!,
      description: this.stepForm.controls.stepDescription.value!,
      _id: this.stepToUpdate?._id,
    } as any

    if (this.stepPicture?.value! === this.stepToUpdate?.pictureUrl)
      step = {
        ...step,
        pictureUrl: this.stepPicture?.value!
      }
    else
      step = {
        ...step,
        imageBase64: this.stepPicture?.value!
      }

    this.modifyStep.emit(
      {
        index: this.workedIndex!,
        step
      }
    );
    this.closeModal.emit();
  }
}
