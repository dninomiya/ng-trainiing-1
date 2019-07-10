import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MyComment } from '../interfaces/my-comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private db: AngularFirestore
  ) { }

  addComment(comment: {
    body: string;
    createdAt: Date;
    authorId: string;
    authorPhotoURL: string;
    authorName: string;
  }): Promise<void> {
    const id = this.db.createId();
    let newComment: MyComment;
    newComment = {
      id,
      ...comment,
    };
    return this.db.doc(`comments/${id}`).set(newComment);
  }

  getComments(): Observable<MyComment[]> {
    return this.db.collection<MyComment>('comments', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }

  deleteComment(id: string): Promise<void> {
    return this.db.doc(`comments/${id}`).delete();
  }

  editComment(id: string, body: string): Promise<void> {
    return this.db.doc(`comments/${id}`).update({
      body
    });
  }

  getMyComments(uid: string): Observable<MyComment[]> {
    return this.db.collection<MyComment>(
      'comments',
      ref => ref.where('authorId', '==', uid)
    ).valueChanges();
  }
}
