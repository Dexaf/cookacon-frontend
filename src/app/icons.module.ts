import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Coffee, Edit, Key, Mail, Repeat, Share2, User, Users, X,  } from 'angular-feather/icons';

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
  ChevronRight, 
  ChevronUp, 
  Edit,
  Share2
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
