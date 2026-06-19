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
            { translationKey: 'nav.calendar', icon: 'calendar_month', ...schedulingNav },
            { translationKey: 'nav.sessions', icon: 'event_available', ...sessionsNav },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
            { translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true },
          ],
        },
      ];
    }

    if (role === InterfaceRole.Teacher) {
      const notesRoute =
        plan === PlanType.Institutional
          ? '/app/institutional-teacher-notes'
          : '/app/personal-teacher-notes';

      return [
        {
          translationKey: 'nav.groups.main',
          items: [
            { translationKey: 'nav.dashboard', icon: 'space_dashboard', route: dash },
            { translationKey: 'nav.calendarSessions', icon: 'calendar_month', ...schedulingNav },
            { translationKey: 'nav.notes', icon: 'note_alt', route: notesRoute },
            { translationKey: 'nav.groupSessions', icon: 'groups', ...sessionsNav },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
            { translationKey: 'nav.signOut', icon: 'logout', route: undefined, signOut: true },
          ],
        },
      ];
    }

    if (role === InterfaceRole.Parent && plan === PlanType.Personal) {
      return [
        {
          translationKey: 'nav.groups.main',
          items: [
            { translationKey: 'nav.home', icon: 'home', route: dash },
            { translationKey: 'nav.groupSessions', icon: 'groups', ...sessionsNav },
            { translationKey: 'nav.privateSessions', icon: 'lock', ...sessionsNav },
            { translationKey: 'nav.myCalendar', icon: 'calendar_month', route: '/app/scheduling' },
            { translationKey: 'nav.notes', icon: 'note_alt', route: '/app/personal-parent-notes' },
            { translationKey: 'nav.marketplace', icon: 'storefront', route: '/app/marketplace' },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
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
            { translationKey: 'nav.privateSessions', icon: 'lock', ...sessionsNav },
            { translationKey: 'nav.myCalendar', icon: 'calendar_month', route: '/app/scheduling' },
          ],
        },
        {
          translationKey: 'nav.groups.account',
          items: [
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
