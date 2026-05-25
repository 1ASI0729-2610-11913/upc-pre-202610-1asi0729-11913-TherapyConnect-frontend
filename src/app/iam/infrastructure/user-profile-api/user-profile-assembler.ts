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
    return new UserProfile({
      id: resource.id,
      profileKey: resource.profileKey,
      displayName: resource.displayName,
      planKey: resource.planKey as PlanType,
      roleKey: resource.roleKey as InterfaceRole,
      organizationName: resource.organizationName,
      pendingNotifications: resource.pendingNotifications,
      avatarUrl: resource.avatarUrl,
    });
  }

  toResourceFromEntity(entity: UserProfile): UserProfileResource {
    return {
      id: entity.id,
      profileKey: entity.profileKey,
      displayName: entity.displayName,
      planKey: entity.planKey,
      roleKey: entity.roleKey,
      organizationName: entity.organizationName,
      pendingNotifications: entity.pendingNotifications,
      avatarUrl: entity.avatarUrl,
    };
  }
}
