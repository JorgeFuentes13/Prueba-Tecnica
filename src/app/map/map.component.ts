import { Component, inject, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DirectionFormComponent } from '../components/direction-form/direction-form.component';
import { MarkerService } from '../services/marker.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule, DirectionFormComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit  {


  private markerService = inject(MarkerService)
  public MarkerSus: Subscription = Subscription.EMPTY;

  ngOnInit(): void {
    
    this.MarkerSus = this.markerService.getGeoDataMarker().subscribe(
      marker => console.log('dato desde map: ',marker)
    )
  }

  ngOnDestroy(): void {
    this.MarkerSus.unsubscribe();
  }

  center: google.maps.LatLngLiteral = { lat: -33.45694, lng: -70.64827};
  zoom = 11;

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
  };


}
