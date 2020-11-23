import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoriesComponent } from './components/home-page/stories/stories.component';
import { CommentsComponent } from './components/home-page/comments/comments.component';
import { CommentComponent } from './components/home-page/comments/comment/comment.component';
import { StoryRowComponent } from './components/home-page/stories/story-row/story-row.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StoriesComponent,
    CommentsComponent,
    CommentComponent,
    StoryRowComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
