import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit, OnDestroy {

  subscribe = new Subscription();

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  deleteAccount() {
    this.subscribe = this.snackBar.open('退会しますか？', 'はい', {
      duration: 2000
    }).onAction().subscribe(() => {
      this.authService.deleteAccount();
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

}
