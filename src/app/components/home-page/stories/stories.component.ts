import { Observable } from 'rxjs';
import { LogicService } from './../../../services/logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  public ids$: Observable<number[]>;
  constructor(private logic: LogicService) {
    this.ids$ = logic.storyIds$;
  }

  ngOnInit(): void {
  }

  public onStoryRowClick(id: number) {
    this.logic.targetStoryId(id);
  }
}
