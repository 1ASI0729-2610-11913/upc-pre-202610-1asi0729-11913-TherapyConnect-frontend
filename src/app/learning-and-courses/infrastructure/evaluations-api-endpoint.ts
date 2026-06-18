import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Evaluation } from '../domain/model/evaluation.entity';
import { EvaluationAssembler } from './evaluation-assembler';
import { EvaluationResource, EvaluationResponse } from './evaluation-response';

export class EvaluationsApiEndpoint extends BaseApiEndpoint<Evaluation, EvaluationResource, EvaluationResponse, EvaluationAssembler> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderEvaluationsEndpointPath}`,
      new EvaluationAssembler(),
    );
  }
}
