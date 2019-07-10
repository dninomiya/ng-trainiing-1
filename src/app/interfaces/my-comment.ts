import { MypagePageComponent } from '../mypage-page/mypage-page.component';

export interface MyComment {
  id: string;
  body: string;
  createdAt: Date;
  authorId: string;
  authorPhotoURL: string;
  authorName: string;
}
