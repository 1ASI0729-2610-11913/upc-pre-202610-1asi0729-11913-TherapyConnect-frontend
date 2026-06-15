import { Injectable } from '@angular/core';
import { InterfaceRole } from '../../../../iam/domain/model/interface-role.enum';
import { NavigationGroup } from '../../../domain/model/navigation-context.model';
import { PlanType } from '../../../domain/model/plan-type.enum';

@Injectable({ providedIn: 'root' })
export class NavigationMenuService {
  buildDashboardRouteSegment(plan: PlanType, role: InterfaceRole): string {
    const map: Record<string, string> = {
      [`${PlanType.Personal}-${InterfaceRole.Parent}`]: 'personal-parent-dashboard',
      [`${PlanType.Personal}-${InterfaceRole.Teacher}`]: 'personal-teacher-dashboard',
      [`${PlanType.Institutional}-${InterfaceRole.Parent}`]: 'institutional-parent-dashboard',
      [`${PlanType.Institutional}-${InterfaceRole.Teacher}`]: 'institutional-teacher-dashboard',
      [`${PlanType.Institutional}-${InterfaceRole.InstitutionAdmin}`]:
        'institutional-admin-dashboard',
    };
    return map[`${plan}-${role}`] ?? 'personal-parent-dashboard';
  }

  buildNavigationGroups(plan: PlanType, role: InterfaceRole): NavigationGroup[] {
    const dash = `/app/${this.buildDashboardRouteSegment(plan, role)}`;
    const sessionsHub = '/app/sessions';
    const sessionsNav = { route: sessionsHub, pathMatch: 'subset' as const };
    const schedulingHub = '/app/scheduling';
    const schedulingNav = { route: schedulingHub, pathMatch: 'subset' as const };

    if (plan === PlanType.Institutional && role === InterfaceRole.InstitutionAdmin) {
      return [
        {
          translationKey: 'nav.groups.main',
          items: [
            { translationKey: 'nav.dashboard', icon: 'space_dashboard', route: dash },
            { translationKey: 'nav.students', icon: 'school', route: undefined },
            { translationKey: 'nav.therapists', icon: 'psychology', route: undefined },
            { translationKey: 'nav.calendar', icon: 'calendar_month', ...schedulingNav },
            { translationKey: 'nav.sessions', icon: 'event_available', ...sessionsNav },
          ],
        },
        {
          translationKey: 'nav.groups.management',
          items: [
            { translationKey: 'nav.reports', icon: 'assessment', route: undefined },
            { translationKey: 'nav.messages', icon: 'forum', route: undefined, badgeCount: 3 },
            { translationKey: 'nav.notifications', icon: 'notifications', route: undefined },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
            { translationKey: 'nav.settings', icon: 'settings', route: undefined },
            { translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true },
          ],
        },
      ];
    }

    if (role === InterfaceRole.Teacher) {
      // Ruta de notas varía según plan
      const notesRoute =
        plan === PlanType.Institutional
          ? '/app/institutional-teacher-notes'
          : '/app/personal-teacher-notes';

      const items: NavigationGroup[] = [
        {
          translationKey: 'nav.groups.main',
          items: [
            { translationKey: 'nav.dashboard', icon: 'space_dashboard', route: dash },
            { translationKey: 'nav.calendarSessions', icon: 'calendar_month', ...schedulingNav },
            { translationKey: 'nav.notifications', icon: 'notifications', route: undefined },
            { translationKey: 'nav.messages', icon: 'forum', route: undefined },
            { translationKey: 'nav.notes', icon: 'note_alt', route: notesRoute },
            { translationKey: 'nav.groupSessions', icon: 'groups', ...sessionsNav },
          ],
        },
        {
          translationKey: 'nav.groups.secondary',
          items: [
            { translationKey: 'nav.profile', icon: 'person', route: undefined },
            { translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true },
          ],
        },
      ];
      if (plan === PlanType.Personal) {
        items[0].items.splice(2, 0, {
          translationKey: 'nav.requests',
          icon: 'inbox',
          route: undefined,
        });
      }
      return items;
    }

    if (role === InterfaceRole.Parent && plan === PlanType.Personal) {
      return [
        {
          translationKey: 'nav.groups.main',
          items: [
            { translationKey: 'nav.home', icon: 'home', route: dash },
            {
              translationKey: 'nav.notifications',
              icon: 'notifications',
              route: undefined,
              badgeCount: 3,
            },
            { translationKey: 'nav.groupSessions', icon: 'groups', ...sessionsNav },
            { translationKey: 'nav.privateSessions', icon: 'lock', ...sessionsNav },
            {
              translationKey: 'nav.myCalendar',
              icon: 'calendar_month',
              route: '/app/padre-personal-calendar',
            },
            { translationKey: 'nav.homeVisits', icon: 'home_work', route: undefined },
            // Notas del padre — ruta activa
            { translationKey: 'nav.notes', icon: 'note_alt', route: '/app/personal-parent-notes' },
            { translationKey: 'nav.marketplace', icon: 'storefront', route: undefined },
            { translationKey: 'nav.tracking', icon: 'timeline', route: undefined },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
            { translationKey: 'nav.settings', icon: 'settings', route: undefined },
            { translationKey: 'nav.help', icon: 'help', route: undefined },
            { translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true },
          ],
        },
      ];
    }

    if (role === InterfaceRole.Parent && plan === PlanType.Institutional) {
      return [
        {
          translationKey: 'nav.groups.main',
          items: [
            { translationKey: 'nav.home', icon: 'home', route: dash },
            {
              translationKey: 'nav.notifications',
              icon: 'notifications',
              route: undefined,
              badgeCount: 3,
            },
            { translationKey: 'nav.privateSessions', icon: 'lock', ...sessionsNav },
            {
              translationKey: 'nav.myCalendar',
              icon: 'calendar_month',
              route: '/app/padre-institucional-calendar',
            },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
            { translationKey: 'nav.settings', icon: 'settings', route: undefined },
            { translationKey: 'nav.help', icon: 'help', route: undefined },
            { translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true },
          ],
        },
      ];
    }

    return [
      {
        translationKey: 'nav.groups.main',
        items: [{ translationKey: 'nav.dashboard', icon: 'space_dashboard', route: dash }],
      },
      {
        translationKey: 'nav.groups.account',
        items: [{ translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true }],
      },
    ];
  }
}
