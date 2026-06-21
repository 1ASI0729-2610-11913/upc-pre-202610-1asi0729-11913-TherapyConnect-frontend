import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { InterfaceRole } from '../../domain/model/interface-role.enum';
import { PlanType } from '../../../shared/domain/model/plan-type.enum';
import { UserProfile } from '../../domain/model/user-profile.entity';
import { UserProfileResource, UserProfilesResponse } from './user-profile-response';

export class UserProfileAssembler implements BaseAssembler<UserProfile, UserProfileResource, UserProfilesResponse> {
  toEntitiesFromResponse(response: UserProfilesResponse): UserProfile[] {
    return response.userProfiles.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: UserProfileResource): UserProfile {
    const primaryRole = resource.roleKey ?? resource.roles?.[0] ?? InterfaceRole.Parent;
    return new UserProfile({
      id: resource.id,
      profileKey: resource.profileKey ?? resource.username ?? `user-${resource.id}`,
      displayName: resource.displayName ?? resource.username ?? `Usuario ${resource.id}`,
      planKey: (resource.planKey ?? PlanType.Personal) as PlanType,
      roleKey: primaryRole as InterfaceRole,
      organizationName: resource.organizationName ?? null,
      pendingNotifications: resource.pendingNotifications ?? 0,
      avatarUrl: resource.avatarUrl ?? null,
    });
  }

  toResourceFromEntity(entity: UserProfile): UserProfileResource {
    return {
      id: entity.id,
      profileKey: entity.profileKey,
      username: entity.profileKey,
      roles: [entity.roleKey],
      displayName: entity.displayName,
      planKey: entity.planKey,
      roleKey: entity.roleKey,
      organizationName: entity.organizationName,
      pendingNotifications: entity.pendingNotifications,
      avatarUrl: entity.avatarUrl,
    };
  }
}
