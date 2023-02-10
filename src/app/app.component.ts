import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sap-on-site';

  constructor(@Inject(DOCUMENT) private document: Document) {
    const token = localStorage.getItem('token');
    this._getUserPreferenceTheme()
  }

  private _getUserPreferenceTheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (prefersDarkScheme.matches) {
      themeLink.href = 'arya-dark-blue.css';
    }
    else {
      themeLink.href = 'saga-light-blue.css';
    }

    const theme = localStorage.getItem('theme')
    if (theme) {
      if (theme === 'arya-dark-blue.css') {
        themeLink.href = 'arya-dark-blue.css';
      } else {
        themeLink.href = 'saga-light-blue.css';
      }
    }
  }
}
