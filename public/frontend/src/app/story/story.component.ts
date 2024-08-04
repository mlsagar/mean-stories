import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoriesDataService } from '../stories-data.service';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent implements OnInit{
  story: any;
  storyId!: string;
  constructor(
    private _route: ActivatedRoute,
    private _storiesDataService: StoriesDataService,
    private _location: Location
  ) {

    this.storyId = this._route.snapshot.params["storyId"];
  }
  ngOnInit(): void {
    this._storiesDataService.oneStory(this.storyId).subscribe(response => {
      this.story = response;
    })
  }

  toggleStatus(status: string) {
    
    if (status === "popular") {
      this.story.status = "un-popular"
    } else {
      this.story.status = "popular"
    }
    this._storiesDataService.updateStatus(this.storyId, this.story.status).subscribe(response => {
      console.log(response);
    })
  }

  back() {
    this._location.back();
  }
}
