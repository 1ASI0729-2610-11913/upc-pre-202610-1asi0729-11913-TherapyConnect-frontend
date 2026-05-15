import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { UserProfile } from '../../domain/model/user-profile.entity';
import { UserProfileAssembler } from './user-profile-assembler';
import { UserProfileResource, UserProfilesResponse } from './user-profile-response';

export class UserProfilesApiEndpoint extends BaseApiEndpoint<
  UserProfile,
  UserProfileResource,
  UserProfilesResponse,
  UserProfileAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderUserProfilesEndpointPath}`,
      new UserProfileAssembler(),
    );
  }
}
