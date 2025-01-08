
import { Component, inject } from '@angular/core';
import { FormGroup,FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';
import { MarkerService } from '../../services/marker.service';

@Component({
  selector: 'app-direction-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './direction-form.component.html',
  styleUrl: './direction-form.component.css'
})
export class DirectionFormComponent {

  private fb = inject(FormBuilder)
  private geocod = inject(GeocodingService)
  private markerService = inject(MarkerService)

  public myForm : FormGroup = this.fb.group({
    direction: ['', [Validators.required]]
  })


  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors 
      && this.myForm.controls[field].touched;
  }

  sendDirecction(): void{
    const direction = this.myForm.value.direction
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched;
      return;
    };

  this.geocod.geocodeAddress(direction).subscribe({
    next: (res) => {
      if (res.results && res.results.length > 0) {
        const location = res.results[0].geometry.location;
        this.markerService.sendGeoDataMarker(location);
      } else {
        console.error('No se encontraron resultados');
      }
    },
    error: (error) => {
      console.error('Error geocodificación:', error);
    },
    });
    this.myForm.reset();
  }
}
