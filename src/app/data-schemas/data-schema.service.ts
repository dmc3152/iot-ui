import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSchema } from '../shared/models/data-schema';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataSchemaService {
  private baseUrl = `${environment.apiUrl}/schema/`;

  constructor(private http: HttpClient) { }

  getDataSchemas(): Observable<Array<DataSchema>> {
    return this.http.get<Array<DataSchema>>(this.baseUrl);
  }

  getDataSchemaById(id: string): Observable<DataSchema> {
    return this.http.get<DataSchema>(this.baseUrl + id);
  }

  addDataSchema(schema: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, schema);
  }
}
