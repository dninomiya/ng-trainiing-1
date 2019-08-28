import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { CommentService } from '../services/comment.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @ViewChild(FormGroupDirective) myForm;

  form = this.fb.group({
    body: ['', [Validators.required, Validators.maxLength(400)]]
  });

  get body() {
    return this.form.get('body');
  }

  user;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.authService.afAuth.user.subscribe(user => this.user = user);
  }

  ngOnInit() { }

  submit() {
    if (this.form.valid && this.user) {
      this.commentService
        .addComment({
          body: this.form.value.body,
          createdAt: new Date(),
          authorId: this.user.uid,
          authorPhotoURL: this.user.photoURL,
          authorName: this.user.displayName
        })
        .then(() => {
          this.myForm.resetForm();
        })
        .then(() => {
          this.snackBar.open('投稿が完了しました', null, {
            duration: 2000
          });
        })
        .catch(() => {
          this.snackBar.open('投稿に失敗しました', null, {
            duration: 2000
          });
        });
    }
  }
}
