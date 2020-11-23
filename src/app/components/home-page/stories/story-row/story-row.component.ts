import { NewsItem } from './../../../../APIs/news-item';
import { LogicService } from './../../../../services/logic.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { timeDiff } from 'src/app/helpers/time';

@Component({
  selector: 'app-story-row',
  templateUrl: './story-row.component.html',
  styleUrls: ['./story-row.component.scss']
})
export class StoryRowComponent implements OnInit, OnDestroy {

  @Input() set storyId(value: number) {

    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.logic.selectStory$(value).subscribe(story => this.fromStory(story));
  }

  public storyTime: string;
  public story: NewsItem;
  public targetId$: Observable<number>;

  private subscription = new Subscription();
  constructor(private logic: LogicService) {
    this.targetId$ = logic.targetStoryId$;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private fromStory(story: NewsItem): void {
    this.story = story;
    if (story.time) {
    this.storyTime =  timeDiff(new Date(), new Date(story.time * 1000));
    }


  }

}
