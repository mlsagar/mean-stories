import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoriesDataService {
  baseUrl = "http://localhost:3000/api/stories"
  constructor(
    private _http: HttpClient
  ) { }

  get allStories() {
    return this._http.get<any>(this.baseUrl);
  }

  oneStory(storyId: string) {
    return this._http.get<any>(this.baseUrl +"/" + storyId)
  }

  updateStatus(storyId: string, status: string) {
    return this._http.patch<any>(this.baseUrl + "/" + storyId, {status})
  }
}
