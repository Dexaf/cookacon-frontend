import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Key, Mail, Repeat, User, X } from 'angular-feather/icons';

const icons = {
  X,
  Mail,
  User,
  Key,
  Repeat
}

@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
