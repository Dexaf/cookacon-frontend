import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Recipe } from '../../models/interfaces/feed.interface';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';
import { IconsModule } from '../../icons.module';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    IconsModule,
    CommonModule,
    TranslocoModule
  ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss', '../../../styles.scss']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  feedService = inject(FeedService)
  recipes: Recipe[] = [];
  providerUrl: string = "";
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.providerUrl = environment.providerUrl;

    this.subscriptions.push(
      this.feedService.getOwnRecipes(0)
        .subscribe(recipes => {
          this.recipes = recipes
        })
    )

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
