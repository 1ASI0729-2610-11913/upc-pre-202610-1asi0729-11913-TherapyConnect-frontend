import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { Evaluation } from '../domain/model/evaluation.entity';
import { EvaluationResource, EvaluationResponse } from './evaluation-response';

export class EvaluationAssembler implements BaseAssembler<Evaluation, EvaluationResource, EvaluationResponse> {
  toEntitiesFromResponse(response: EvaluationResponse): Evaluation[] {
    return response.evaluations.map((resource) => this.toEntityFromResource(resource));
  }

  toEntityFromResource(resource: EvaluationResource): Evaluation {
    return new Evaluation({
      id: resource.id,
      courseId: resource.courseId ?? null,
      evaluationState: resource.evaluationState,
      evaluationScore: resource.evaluationScore,
      answer: resource.answer,
      certificationState: resource.certificationState,
    });
  }

  toResourceFromEntity(entity: Evaluation): EvaluationResource {
    return {
      id: entity.id,
      courseId: entity.courseId,
      evaluationState: entity.evaluationState,
      evaluationScore: entity.evaluationScore,
      answer: entity.answer,
      certificationState: entity.certificationState,
    }
  }
}
