import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/interfaces/recipe.interface';
import { IconsModule } from '../../icons.module';
import { TranslocoModule } from '@ngneat/transloco';
import { RecipeType } from '../../models/enums/recipeTypes.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-editor',
  standalone: true,
  imports: [IconsModule, TranslocoModule, CommonModule],
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss', '../../../styles.scss']
})
export class RecipeEditorComponent implements OnInit {
  @Input() editMode = false;
  @Input() recipeData?: Recipe;
  recipeTypes = RecipeType;

  ngOnInit(): void {
    this.recipeData
  }
}
