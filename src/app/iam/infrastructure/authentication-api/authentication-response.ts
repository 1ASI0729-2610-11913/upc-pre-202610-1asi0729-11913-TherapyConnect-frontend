export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  password: string;
  roles: string[];
}

export interface AuthenticatedUserResponse {
  id: number;
  username: string;
  token: string;
}

export interface UserResponse {
  id: number;
  username: string;
  roles: string[];
}
