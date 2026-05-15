import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguagePreferenceService } from '../../services/language-preference.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, TranslateModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css',
})
export class LanguageSwitcherComponent {
  private readonly translate = inject(TranslateService);
  private readonly languagePreference = inject(LanguagePreferenceService);

  useLanguage(lang: string): void {
    this.languagePreference.persist(lang);
    void this.translate.use(lang);
  }
}
