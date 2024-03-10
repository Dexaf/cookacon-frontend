import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Calendar, Clock, Coffee, Key, Mail, Repeat, User, Users, X } from 'angular-feather/icons';

const icons = {
  X,
  Mail,
  User,
  Key,
  Repeat,
  Calendar,
  Clock,
  Coffee,
  Users
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
