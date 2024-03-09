import { Component, OnInit, inject } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Recipe } from '../../models/interfaces/feed.interface';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  feedService = inject(FeedService)
  recipes: Recipe[] = [];
  providerUrl: string = "";

  ngOnInit() {
    this.providerUrl = environment.providerUrl;
    this.feedService.getOwnRecipes(0)
      .subscribe(recipes => {
        this.recipes = recipes
      })
  }
}
