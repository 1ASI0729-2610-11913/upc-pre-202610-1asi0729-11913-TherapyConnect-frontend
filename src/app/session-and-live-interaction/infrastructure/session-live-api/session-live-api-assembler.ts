import { Injectable } from '@angular/core';
import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { SessionChecklistItem } from '../../domain/model/session-checklist.entity';
import { TherapySession } from '../../domain/model/therapy-session.entity';
import { SessionChecklistItemDto, TherapySessionDto } from './session-live-dto.model';

@Injectable({ providedIn: 'root' })
export class TherapySessionApiAssembler extends BaseAssembler<TherapySession, TherapySessionDto> {
  override toDomain(dto: TherapySessionDto): TherapySession {
    return {
      id: dto.id,
      patientName: dto.patientName,
      patientAge: dto.patientAge,
      conditionLabel: dto.conditionLabel,
      parentName: dto.parentName,
      professionalName: dto.professionalName,
      classroomName: dto.classroomName,
      dateLabel: dto.dateLabel,
      weekdayLabel: dto.weekdayLabel,
      startTime: dto.startTime,
      endTime: dto.endTime,
      durationMinutes: dto.durationMinutes,
      type: dto.type as TherapySession['type'],
      modality: dto.modality as TherapySession['modality'],
      status: dto.status as TherapySession['status'],
      accessType: dto.accessType as TherapySession['accessType'],
      observationsCount: dto.observationsCount,
    };
  }

  override toDto(domain: TherapySession): TherapySessionDto {
    return { ...domain };
  }
}

@Injectable({ providedIn: 'root' })
export class SessionChecklistApiAssembler extends BaseAssembler<SessionChecklistItem, SessionChecklistItemDto> {
  override toDomain(dto: SessionChecklistItemDto): SessionChecklistItem {
    return {
      id: dto.id,
      groupTitle: dto.groupTitle,
      label: dto.label,
      checked: dto.checked,
    };
  }

  override toDto(domain: SessionChecklistItem): SessionChecklistItemDto {
    return { ...domain };
  }
}
