import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Archive, Book, BookOpen, Calendar, ChevronDown, ChevronRight, ChevronUp, Clock, Coffee, Copy, Edit, Facebook, Image, Key, Mail, Plus, Repeat, Save, Share2, Twitter, Upload, User, Users, X,  } from 'angular-feather/icons';

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
  Share2,
  Facebook,
  Twitter,
  Copy,
  Image,
  Upload,
  Book,
  BookOpen,
  Archive,
  Plus,
  Save
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
