import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { last } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
    constructor(private router: Router) { }
    sideNavItems = [
        {
          label: 'Dashboard',
          route: '/dashboard',
          icon: 'dashboard'
        },
        {
          label: 'Inventory',
          route: '/inventory',
          icon: 'inventory'
        },
        {
          label: 'User',
          route: '/user',
          icon: 'person'
        },
        {
          label: 'Product Type',
          route: '/producttype',
          icon: 'category'
        },
        {
          label: 'name',
          route: '/home',
          icon: 'home'
        },
        {
          label: 'idname',
          route: '/idname',
          icon: 'badge'
        }

    ];

    logout() {
        console.log('logout');
        this.router.navigate(['/login']);
    }
}
