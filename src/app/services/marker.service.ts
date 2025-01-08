import { inject, Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  public wsService = inject(WebsocketService)

  constructor() { }

  sendGeoDataMarker( geocod : any ) {
    
    console.log(geocod);
    const datos = {
      lat: geocod.lat,
      lng: geocod.lng
    };

    this.wsService.emit('newLocation', datos);
  }

  getGeoDataMarker(){
    return this.wsService.listen('newLocation');
   }
}
