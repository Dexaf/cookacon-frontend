import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/interfaces/feed.interface';
import { environment } from '../../../../environments/environment';
import { IconsModule } from '../../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    IconsModule,
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss', '../../../../styles.scss']
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Input() canModify: boolean = false;

  providerUrl = environment.providerUrl;

  viewRecipe() {
    alert("view");
  }

  modifyRecipe() {
    alert("modify");
  }
}
