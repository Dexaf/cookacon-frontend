import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { customFile, ImageUploadComponent } from '../../image-upload/image-upload.component';
import { IconsModule } from '../../../icons.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { stepDtoOut } from '../../../models/dtos/out/recipe.dto.out.interface';
import { cardAction, cardEvent, InfoCardComponent } from '../../info-card/info-card.component';
import { environment } from '../../../../environments/environment';
import { ModifyStepModalBodyComponent } from './modify-step-modal-body/modify-step-modal-body.component';
import { ModalWrapperComponent } from '../../modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-step-form',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    ImageUploadComponent,
    IconsModule,
    InfoCardComponent,
    ReactiveFormsModule,
    ModifyStepModalBodyComponent,
    ModalWrapperComponent
  ],
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.scss', '../../../../styles.scss']
})
export class StepFormComponent {
  formGroup = inject(FormBuilder);

  @Input() steps: stepDtoOut[] = [];
  @Output() updateSteps: EventEmitter<stepDtoOut[]> = new EventEmitter<stepDtoOut[]>()
  @ViewChild("stepPictureUpload") stepPictureUploadRef!: ImageUploadComponent;

  providerUrl = environment.providerUrl

  //steps form
  stepsForm = this.formGroup.group({
    stepTitle: [null, [Validators.required]],
    stepDescription: [null, [Validators.required]],
    stepPicture: [false, [Validators.requiredTrue]],
  })
  stepPicture: customFile | null = null;

  infoCardActions: cardAction[] = [
    {
      eventName: stepActions.DELETE,
      hasPayload: true,
      iconName: "X"
    },
    {
      eventName: stepActions.MODIFY,
      hasPayload: true,
      iconName: "Edit"
    }
  ]
  isModifyStepModalOpen: boolean = false;
  stepToModify: stepDtoOut | null = null;
  workedIndex: number = -1;

  getStepUploadedPhoto(uploadedPictures: customFile[]) {
    if (uploadedPictures[0]) {
      this.stepPicture = uploadedPictures[0];
      this.stepsForm.controls.stepPicture.setValue(true)
    } else {
      this.stepPicture = null;
      this.stepsForm.controls.stepPicture.setValue(false)
    }
  }

  addStep() {
    this.steps.push({
      title: this.stepsForm.controls.stepTitle.value!,
      description: this.stepsForm.controls.stepDescription.value!,
      pictureBase64: this.stepPicture?.value!
    })
    this.stepsForm.reset();
    this.stepPictureUploadRef.resetPictures()

    this.updateSteps.emit(this.steps);
  }

  infoCardEventHandler(event: cardEvent) {
    let index = event.payload
    if (!index)
      return;
    if (typeof index === "string")
      index = parseInt(index);

    switch (event.eventName) {
      case stepActions.DELETE:
        this.steps.splice(index, 1);
        this.steps = [...this.steps]
        break;
      case stepActions.DRAG:

        break;
      case stepActions.MODIFY:
        this.isModifyStepModalOpen = true;
        this.workedIndex = index;
        this.stepToModify = this.steps[index];
        break;
    }
  }

  modifyStep(event: { index: number, step: stepDtoOut }) {
    this.steps[event.index] = {
      ...event.step
    }
  }
}

enum stepActions {
  DELETE = "delete",
  DRAG = "drag",
  MODIFY = "modify"
}