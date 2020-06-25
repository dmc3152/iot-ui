import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../shared/models/device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private baseUrl = 'http://localhost:3000/api/device/';

  constructor(private http: HttpClient) { }

  getDevices(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(this.baseUrl);
  }

  getDeviceById(id: string): Observable<Device> {
    return this.http.get<Device>(this.baseUrl + id);
  }

  addDevice(device: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, device);
  }
}
