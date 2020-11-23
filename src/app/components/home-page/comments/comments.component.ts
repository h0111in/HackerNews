import { Observable } from 'rxjs';
import { LogicService } from './../../../services/logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  constructor(private logic: LogicService) {
    this.ids$ = this.logic.targetStoryCommentIds$;}

  public ids$: Observable<number[]>;

  ngOnInit(): void {

  }

}
