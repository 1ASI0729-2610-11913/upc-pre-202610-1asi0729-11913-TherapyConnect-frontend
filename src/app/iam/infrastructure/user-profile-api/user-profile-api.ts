import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { InterfaceRole } from '../../domain/model/interface-role.enum';
import { PlanType } from '../../../shared/domain/model/plan-type.enum';
import { UserProfile } from '../../domain/model/user-profile.entity';
import { UserProfilesApiEndpoint } from './user-profiles-api-endpoint';

/**
 * Fachada HTTP del bounded context IAM para perfiles de usuario.
 */
@Injectable({ providedIn: 'root' })
export class UserProfileApi extends BaseApi {
  private readonly profilesEndpoint: UserProfilesApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.profilesEndpoint = new UserProfilesApiEndpoint(http);
  }

  listProfiles(): Observable<UserProfile[]> {
    return this.profilesEndpoint.getAll();
  }

  findByPlanAndRole(plan: PlanType, role: InterfaceRole): Observable<UserProfile | undefined> {
    return this.listProfiles().pipe(
      map((profiles) => profiles.find((p) => p.planKey === plan && p.roleKey === role)),
    );
  }
}
