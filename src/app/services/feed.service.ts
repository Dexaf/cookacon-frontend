import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Recipe } from '../models/interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  httpClient = inject(HttpClient);

  getSearchSuggestion() {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${environment.endpoints.feed.searchSuggestion}`;
    return this.httpClient.get<Recipe[]>(url);
  }

  searchByTitle(title: string) {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${environment.endpoints.feed.searchByTitle}?title=${title}`;
    return this.httpClient.get<Recipe[]>(url);
  }

  getMostPopular() {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${environment.endpoints.feed.mostPopular}`;
    return this.httpClient.get<Recipe[]>(url);
  }

  getGeneral() {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${environment.endpoints.feed.general}`;
    return this.httpClient.get<Recipe[]>(url);
  }

  getUserRecipes(userId: string) {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${userId}`;
    return this.httpClient.get<Recipe[]>(url);
  }

  getPersonalRecipes() {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${environment.endpoints.feed.personal}`;
    return this.httpClient.get<Recipe[]>(url);
  }

  getOwnRecipes(page: number, quantity?: number) {
    const url = `${environment.providerUrl}/${environment.endpoints.feed.controller}/${environment.endpoints.feed.own}?page=${page}`;
    return this.httpClient.get<Recipe[]>(url);
  }
}
