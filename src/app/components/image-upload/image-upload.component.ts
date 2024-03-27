import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconsModule } from '../../icons.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [
    IconsModule,
    TranslocoModule,
    ReactiveFormsModule,
    CommonModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss', '../../../styles.scss']
})
export class ImageUploadComponent {
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() multiple: boolean = false;
  @Output() photoUploaded: EventEmitter<customFile[]> = new EventEmitter();
  disabled = false;
  loadingPictures = false;
  currentFiles: customFile[] = [];

  async onChange(event: Event) {
    this.loadingPictures = true;
    this.currentFiles = [];
    const fileList = (event.target as HTMLInputElement).files as FileList;
    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        const value = await this.convertFileToBase64(file);
        if (value) {
          this.currentFiles.push({ value, name: file.name });
          if (!this.multiple)
            this.disabled = true;
          this.photoUploaded.emit(this.currentFiles)
        }

      }
    } catch (error) {
      //TOAST ERROR
    } finally {
      this.loadingPictures = false;
    }
  }

  convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        let result = reader.result;
        if (result instanceof ArrayBuffer) {
          reject("result should be string")
        }

        resolve(reader.result);
      };
      reader.onerror = (error: any) => {
        reject(error)
      };
      reader.readAsDataURL(file);
    })
  }

  deletePicture(index: number) {
    this.currentFiles.splice(index, 1);
    if (!this.multiple)
      this.disabled = false;
    this.photoUploaded.emit(this.currentFiles)
  }

  resetPictures(emit: boolean = true) {
    this.currentFiles = [];
    this.disabled = false;
    if (emit)
      this.photoUploaded.emit(this.currentFiles)
  }
}

export interface customFile {
  value: string | ArrayBuffer,
  name: string
}