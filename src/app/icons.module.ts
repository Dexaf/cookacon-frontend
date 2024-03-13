import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Calendar, ChevronDown, ChevronUp, Clock, Coffee, Edit, Key, Mail, Repeat, User, Users, X,  } from 'angular-feather/icons';

const icons = {
  X,
  Mail,
  User,
  Key,
  Repeat,
  Calendar,
  Clock,
  Coffee,
  Users,
  ChevronDown,
  ChevronUp, 
  Edit
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
