import { Component, OnInit } from '@angular/core';
import { StoriesDataService } from '../stories-data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent implements OnInit {
  stories: any;

  constructor(private storiesDataService: StoriesDataService) {}

  ngOnInit(): void {
    this.storiesDataService.allStories.subscribe(response => {
      this.stories = response
    })
  }

}
