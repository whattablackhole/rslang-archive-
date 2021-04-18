import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EbookProviderService } from 'src/app/ebook/services/ebook-provider.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenu {
  constructor(
    private router: Router,
    private ebookProviderService: EbookProviderService,
  ) {}

  goToPage(event: Event): Promise<boolean> {
    this.ebookProviderService.updatedDataSelectionGame({
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
