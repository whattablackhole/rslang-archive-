import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EbookDataService } from 'src/app/ebook/services/ebook-data.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenu {
  constructor(
    private router: Router,
    private ebookDataService: EbookDataService,
  ) {}

  goToPage(event: Event): Promise<boolean> {
    this.ebookDataService.updatedDataSelectionGame({
      fromEbook: false,
    });
    const target = event.target as HTMLElement;
    const path = this
      .router
      .createUrlTree(['games', target.dataset.path])
      .toString();
    return this.router.navigate([path]);
  }
}
