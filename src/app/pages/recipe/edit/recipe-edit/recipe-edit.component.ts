import { Component } from '@angular/core';
import { RecipeEditorComponent } from '../../../../components/recipe-editor/recipe-editor.component';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [RecipeEditorComponent],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent {

}
