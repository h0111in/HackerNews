
export class NewsItem {
  public by: string;
  public id: number;
  public kids: number[];
  public time: number;
  public type: NewsItemType;
  public descendants: number;
  public score: number;
  public title: string;
  public url: string; // https://github.com/mikelxc/Workarounds-for-ARM-mac
  public parent: number; // parentId
  public text: string;


  public fromJSON(json: any): NewsItem  {
    const jsonObj: any = json; // JSON.parse(json);
    // tslint:disable-next-line: forin
    for (const propName in jsonObj) {
      this[propName] = jsonObj[propName];
    }
    return this;
  }
}

export enum NewsItemType {
  Story = 'story',
  Comment = 'comment'
}
