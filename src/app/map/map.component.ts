import { Component, inject, OnInit } from '@angular/core';
import {GoogleMap, MapAdvancedMarker} from '@angular/google-maps';
import { DirectionFormComponent } from '../components/direction-form/direction-form.component';
import { MarkerService } from '../services/marker.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-map',
  imports: [GoogleMap, DirectionFormComponent, MapAdvancedMarker],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit  {


  private markerService = inject(MarkerService)
  public MarkerSus: Subscription = Subscription.EMPTY;

  advancedMarkerOptions: google.maps.marker.AdvancedMarkerElementOptions = {gmpDraggable: false};
  advancedMarkerPositions: google.maps.LatLngLiteral[] = [];


  ngOnInit(): void {
    this.MarkerSus = this.markerService.getGeoDataMarker().subscribe((markerData: any) => {
      console.log('Received marker data: ', markerData);
      this.addMarker(markerData);
    });
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

  addMarker(markerData: { lat: number; lng: number }): void {
    this.advancedMarkerPositions.push({
      lat: markerData.lat,
      lng: markerData.lng,
    });
    console.log('marquer creado')
  }


}
