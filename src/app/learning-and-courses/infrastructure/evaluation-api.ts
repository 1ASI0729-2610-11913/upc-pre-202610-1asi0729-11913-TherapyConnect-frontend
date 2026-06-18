import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Evaluation } from '../domain/model/evaluation.entity';
import { EvaluationAssembler } from './evaluation-assembler';
import { EvaluationResource, EvaluationResponse } from './evaluation-response';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class EvaluationApi {
  private baseUrl = environment.platformProviderApiBaseUrl;
  private endpoint = environment.platformProviderEvaluationsEndpointPath;
  private http = inject(HttpClient);

  getEvaluations(): Observable<Evaluation[]> {
    return this.http
      .get<EvaluationResponse | EvaluationResource[]>(`${this.baseUrl}${this.endpoint}`)
      .pipe(
        map((response) =>
          Array.isArray(response)
            ? EvaluationAssembler.toEntitiesFromResources(response)
            : EvaluationAssembler.toEntitiesFromResponse(response),
          ),
      );
  }

  createEvaluation(entity: Evaluation): Observable<Evaluation> {
    const resource = EvaluationAssembler.toResourceFromEntity(entity);
    return this.http
      .post<EvaluationResource>(`${this.baseUrl}${this.endpoint}`, resource)
      .pipe(map((response) => EvaluationAssembler.toEntityFromResource(response)));
  }

  updateEvaluation(id: number, entity: Evaluation): Observable<Evaluation> {
    const resource = EvaluationAssembler.toResourceFromEntity(entity);
    return this.http
      .put<EvaluationResource>(`${this.baseUrl}${this.endpoint}/${id}`, resource)
      .pipe(map((response) => EvaluationAssembler.toEntityFromResource(response)));
  }

  deleteEvaluation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${this.endpoint}/${id}`)
  }
}
