import { LogicService } from './../../../../services/logic.service';
import { Subscription } from 'rxjs';
import { NewsItem } from './../../../../APIs/news-item';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { timeDiff } from 'src/app/helpers/time';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() set commentId(value: number) {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.logic.selectComment$(value).subscribe(comment => this.fromComment(comment));
  }

  public comment: NewsItem;
  public time: string;

  private subscription = new Subscription();
  constructor(private logic: LogicService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private fromComment(comment: NewsItem): void {
    this.comment = comment;
    this.time = timeDiff(new Date(), new Date(comment.time * 1000));
  }

}
