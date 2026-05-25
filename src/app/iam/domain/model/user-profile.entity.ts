import { BaseEntity } from '../../../shared/infrastructure/base-entity';
import { InterfaceRole } from './interface-role.enum';
import { PlanType } from '../../../shared/domain/model/plan-type.enum';

export class UserProfile implements BaseEntity {
  private _id: number;
  private _profileKey: string;
  private _displayName: string;
  private _planKey: PlanType;
  private _roleKey: InterfaceRole;
  private _organizationName: string | null;
  private _pendingNotifications: number;
  private _avatarUrl: string | null;

  constructor(profile: {
    id: number;
    profileKey: string;
    displayName: string;
    planKey: PlanType;
    roleKey: InterfaceRole;
    organizationName: string | null;
    pendingNotifications: number;
    avatarUrl: string | null;
  }) {
    this._id = profile.id;
    this._profileKey = profile.profileKey;
    this._displayName = profile.displayName;
    this._planKey = profile.planKey;
    this._roleKey = profile.roleKey;
    this._organizationName = profile.organizationName;
    this._pendingNotifications = profile.pendingNotifications;
    this._avatarUrl = profile.avatarUrl;
  }

  get id(): number {
    return this._id;
  }
  set id(value: number) {
    this._id = value;
  }

  get profileKey(): string {
    return this._profileKey;
  }
  set profileKey(value: string) {
    this._profileKey = value;
  }

  get displayName(): string {
    return this._displayName;
  }
  set displayName(value: string) {
    this._displayName = value;
  }

  get planKey(): PlanType {
    return this._planKey;
  }
  set planKey(value: PlanType) {
    this._planKey = value;
  }

  get roleKey(): InterfaceRole {
    return this._roleKey;
  }
  set roleKey(value: InterfaceRole) {
    this._roleKey = value;
  }

  get organizationName(): string | null {
    return this._organizationName;
  }
  set organizationName(value: string | null) {
    this._organizationName = value;
  }

  get pendingNotifications(): number {
    return this._pendingNotifications;
  }
  set pendingNotifications(value: number) {
    this._pendingNotifications = value;
  }

  get avatarUrl(): string | null {
    return this._avatarUrl;
  }
  set avatarUrl(value: string | null) {
    this._avatarUrl = value;
  }
}
