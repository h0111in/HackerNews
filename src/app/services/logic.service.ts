import { HackerNewsApiService } from './../APIs/hacker-news-api.service';
import { NewsItem } from './../APIs/news-item';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



export interface ILogic {
  storyIds$: Observable<number[]>;
  targetStoryCommentIds$: Observable<number[]>;
  targetStoryId$: Observable<number>;
  selectStory$(storyId: number): Observable<NewsItem>;
  selectComment$(commentId: number): Observable<NewsItem>;
  targetStoryId(id: number): void;
}


@Injectable({
  providedIn: 'root'
})
export class LogicService implements ILogic {
  private storySubjectDictionary: { [id: number]: BehaviorSubject<NewsItem> };
  private commentSubjectDictionary: { [id: number]: BehaviorSubject<NewsItem> };
  private storyIdsSubject = new BehaviorSubject([]);
  private targetStoryCommentIdsSubject = new BehaviorSubject([]);
  private targetStoryIdSubject = new BehaviorSubject(-1);

  constructor(private newsApi: HackerNewsApiService) {

    this.storySubjectDictionary = {};
    this.commentSubjectDictionary = {};
    this.newsApi.getTopStoryIds().subscribe(ids => this.fromTopStoryIds(ids));

  }

  private fromTopStoryIds(ids: number[]): void {
    ids.forEach(id => {
      if (!!!this.storySubjectDictionary[id]) {
        this.storySubjectDictionary[id] = new BehaviorSubject(undefined);
      }
    });
    this.storyIdsSubject.next(ids);
  }

  public get storyIds$(): Observable<number[]> {
    return this.storyIdsSubject.asObservable();
  }

  public selectStory$(storyId: number): Observable<NewsItem> {
    if (!!!this.storySubjectDictionary[storyId].value) {
      // story is initialize to default value
      this.storySubjectDictionary[storyId].next(new NewsItem());
      // request for the real value
      this.newsApi.getNewsItem(storyId).subscribe(story => this.fromStory(story));
    }
    return this.storySubjectDictionary[storyId].asObservable();
  }

  public selectComment$(commentId: number): Observable<NewsItem> {
    if (!!!this.commentSubjectDictionary[commentId].value) {
      // comment is initialize to default value
      this.commentSubjectDictionary[commentId].next(new NewsItem());
      // request for the real value
      this.newsApi.getNewsItem(commentId).subscribe(comment => this.commentSubjectDictionary[commentId].next(comment));
    }
    return this.commentSubjectDictionary[commentId].asObservable();
  }

  private fromStory(story: NewsItem): void {
    if (story && story.kids) {
      story.kids.slice(0, 3).forEach(kid => {
        if (!!!this.commentSubjectDictionary[kid]) {
          this.commentSubjectDictionary[kid] = new BehaviorSubject(undefined);
        }
      });
    }
    this.storySubjectDictionary[story.id].next(story);
  }

  public targetStoryId(storyId: number): void {
    this.targetStoryIdSubject.next(storyId);
    const commentIds = this.storySubjectDictionary[storyId].value.kids.slice(0, 3);
    this.targetStoryCommentIdsSubject.next(!!commentIds ? commentIds : []);
  }

  public get targetStoryCommentIds$(): Observable<number[]> {
     return this.targetStoryCommentIdsSubject.asObservable();
  }
  public get targetStoryId$(): Observable<number> {
    return this.targetStoryIdSubject.asObservable();
  }
}

