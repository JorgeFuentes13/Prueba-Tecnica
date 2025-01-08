import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DirectionFormComponent } from '../components/direction-form/direction-form.component';


@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, DirectionFormComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent  {

  center: google.maps.LatLngLiteral = { lat: -33.45694, lng: -70.64827};
  zoom = 11;

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
  };
}
