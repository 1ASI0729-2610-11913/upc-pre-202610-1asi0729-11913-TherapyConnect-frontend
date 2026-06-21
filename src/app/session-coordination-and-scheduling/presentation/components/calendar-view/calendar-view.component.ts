import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Evento } from '../../../domain/model/evento.entity';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.css',
})
export class CalendarViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() eventos: Evento[] = [];
  @Input() mode: 'monthly' | 'weekly' = 'monthly';

  private readonly translate = inject(TranslateService);
  private langSubscription!: Subscription;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek',
    locales: [esLocale, enLocale],
    locale: 'es',
    slotMinTime: '07:00',
    slotMaxTime: '21:00',
    allDaySlot: false,
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridWeek,timeGridDay,dayGridMonth',
    },
    events: [],
    eventClick: (info) => {
      console.log('Evento clicked:', info.event.title);
    },
  };

  ngOnInit(): void {
    this.updateLocale(this.translate.currentLang);
    this.langSubscription = this.translate.onLangChange.subscribe((event) => {
      this.updateLocale(event.lang);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventos'] || changes['mode']) {
      this.updateCalendar();
    }
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
  }

  private updateLocale(lang: string): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      locale: lang === 'en' ? 'en-gb' : 'es',
    };
  }

  private updateCalendar(): void {
    const events: EventInput[] = this.eventos.map((evento) => ({
      id: String(evento.id),
      title: evento.titulo,
      start: `${evento.fechaSesion}T${evento.horaInicio}`,
      end: `${evento.fechaSesion}T${evento.horaFin}`,
      color: this.getColorByTipo(evento.tipoSesion),
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      initialView: this.mode === 'weekly' ? 'timeGridWeek' : 'dayGridMonth',
      events,
    };
  }

  private getColorByTipo(tipo: string): string {
    switch ((tipo ?? '').toUpperCase()) {
      case 'PRIVATE':
      case 'INDIVIDUAL':
      case 'PRIVADA':
        return '#7C3AED';
      case 'GROUP':
      case 'GRUPAL':
        return '#2563EB';
      case 'EMERGENCY':
      case 'EMERGENCIA':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  }
}
