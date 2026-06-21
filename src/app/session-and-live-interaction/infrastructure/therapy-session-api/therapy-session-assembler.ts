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
      patientName: resource.patientName ?? resource.title ?? `Estudiante ${resource.studentId ?? ''}`.trim(),
      patientAge: resource.patientAge ?? 0,
      conditionLabel: resource.conditionLabel ?? resource.sessionType ?? '',
      parentName: resource.parentName ?? '',
      professionalName: resource.professionalName ?? `Profesor ${resource.teacherId ?? ''}`.trim(),
      classroomName: resource.classroomName ?? '',
      dateLabel: resource.dateLabel ?? resource.sessionDate ?? '',
      weekdayLabel: resource.weekdayLabel ?? '',
      startTime: resource.startTime ?? '',
      endTime: resource.endTime ?? '',
      durationMinutes: resource.durationMinutes ?? 0,
      type: (resource.type ?? resource.sessionType ?? 'private') as SessionType,
      modality: (resource.modality ?? 'virtual') as SessionModality,
      status: (resource.status ?? resource.sessionStatus ?? 'scheduled') as SessionStatus,
      accessType: (resource.accessType ?? 'personal') as SessionAccessType,
      observationsCount: resource.observationsCount ?? 0,
    });
  }

  toResourceFromEntity(entity: TherapySession): TherapySessionResource {
    return {
      id: entity.id,
      title: entity.patientName,
      sessionDate: entity.dateLabel,
      sessionType: entity.type,
      sessionStatus: entity.status,
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
