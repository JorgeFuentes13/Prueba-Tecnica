import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments.';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private _apiKey : string = 'AIzaSyC-SVWk3_veZRi7YgePT-YZ7f_D60zwwGo';
  private _apiGeo : string = 'https://maps.googleapis.com/maps/api/geocode/json';


  private http = inject( HttpClient );
  
  geocodeAddress(address: string): Observable<any> {
    const url = `${this._apiGeo}?address=${encodeURIComponent(address)}&key=${this._apiKey}`;
    return this.http.get<any>(url)
      
  }
  
}
