import {Component, HostListener, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DemographyComponent} from "@pages/home/demography/demography.component";
import {EconomyComponent} from "@pages/home/economy/economy.component";
import {HistoryComponent} from "@pages/home/history/history.component";
import {NavbarComponent} from "@ui/navbar/navbar.component";

@Component({
  selector: 'denmark-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NavbarComponent,
    DemographyComponent,
    HistoryComponent,
    EconomyComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
      this.scrollSections()
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollSections();
  }

  scrollSections() {
    const sections = document.querySelectorAll('section');
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach((section: Element) => {
      const sectonTop = section.getBoundingClientRect().top;

      sectonTop < triggerBottom ? section.classList.add('show') : section.classList.remove('show');
    });
  }
}
