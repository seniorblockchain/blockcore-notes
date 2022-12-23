import { Component, ViewChild } from '@angular/core';
import { ApplicationState } from './services/applicationstate.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AppUpdateService } from './services/app-update.service';
import { CheckForUpdateService } from './services/check-for-update.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatSidenav;
  @ViewChild('draweraccount') draweraccount!: MatSidenav;
  authenticated = false;

  constructor(
    public appState: ApplicationState,
    private storage: StorageService,
    public authService: AuthenticationService,
    private router: Router,
    public appUpdateService: AppUpdateService,
    public appUpdateCheckService: CheckForUpdateService
  ) {
    appState.title = 'Blockcore Notes';

    this.authService.authInfo$.subscribe((auth) => {
      this.authenticated = auth.authenticated();
    });
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  async ngOnInit() {
    await this.storage.open();
    await this.storage.initialize();

    // const testdata = await this.storage.get('123');
    // console.log(testdata);

    // await this.storage.putProfile('123', { about: 'Hi', name: 'Name', picture: '' });

    // const testdata = await this.storage.get('123', 'profile');
    // console.log(testdata);
  }
}
