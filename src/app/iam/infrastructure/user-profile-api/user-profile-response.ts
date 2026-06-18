import { BaseResource, BaseResponse } from '../../../shared/infrastructure/base-response';

export interface UserProfilesResponse extends BaseResponse {
  userProfiles: UserProfileResource[];
}

export interface UserProfileResource extends BaseResource {
  profileKey: string;
  displayName: string;
  planKey: string;
  roleKey: string;
  organizationName: string | null;
  pendingNotifications: number;
  avatarUrl: string | null;
}
