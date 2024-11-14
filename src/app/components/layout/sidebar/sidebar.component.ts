import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" class="brand-link">
        <span class="brand-text font-weight-light">Maruti ERP</span>
      </a>

      <div class="sidebar">
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column">
            <li class="nav-item">
              <a routerLink="/quotations" class="nav-link">
                <i class="nav-icon fas fa-file-invoice"></i>
                <p>Quotations</p>
              </a>
            </li>
            <li class="nav-item">
              <a routerLink="/models" class="nav-link">
                <i class="nav-icon fas fa-car"></i>
                <p>Models</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  `
})
export class SidebarComponent {}