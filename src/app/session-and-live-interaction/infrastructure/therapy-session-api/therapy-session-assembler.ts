import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import {
  SessionAccessType,
  SessionModality,
  SessionStatus,
  SessionType,
  TherapySession,
} from '../../domain/model/therapy-session.entity';
import { TherapySessionResource, TherapySessionsResponse } from './therapy-sessions-response';

export class TherapySessionAssembler implements BaseAssembler<TherapySession, TherapySessionResource, TherapySessionsResponse> {
  toEntitiesFromResponse(response: TherapySessionsResponse): TherapySession[] {
    return response.therapySessions.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: TherapySessionResource): TherapySession {
    return new TherapySession({
      id: resource.id,
      patientName: resource.patientName,
      patientAge: resource.patientAge,
      conditionLabel: resource.conditionLabel,
      parentName: resource.parentName,
      professionalName: resource.professionalName,
      classroomName: resource.classroomName,
      dateLabel: resource.dateLabel,
      weekdayLabel: resource.weekdayLabel,
      startTime: resource.startTime,
      endTime: resource.endTime,
      durationMinutes: resource.durationMinutes,
      type: resource.type as SessionType,
      modality: resource.modality as SessionModality,
      status: resource.status as SessionStatus,
      accessType: resource.accessType as SessionAccessType,
      observationsCount: resource.observationsCount,
    });
  }

  toResourceFromEntity(entity: TherapySession): TherapySessionResource {
    return {
      id: entity.id,
      patientName: entity.patientName,
      patientAge: entity.patientAge,
      conditionLabel: entity.conditionLabel,
      parentName: entity.parentName,
      professionalName: entity.professionalName,
      classroomName: entity.classroomName,
      dateLabel: entity.dateLabel,
      weekdayLabel: entity.weekdayLabel,
      startTime: entity.startTime,
      endTime: entity.endTime,
      durationMinutes: entity.durationMinutes,
      type: entity.type,
      modality: entity.modality,
      status: entity.status,
      accessType: entity.accessType,
      observationsCount: entity.observationsCount,
    };
  }
}
