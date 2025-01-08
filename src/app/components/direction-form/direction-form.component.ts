
import { Component, inject } from '@angular/core';
import { FormGroup,FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';

@Component({
  selector: 'app-direction-form',
  imports: [ ReactiveFormsModule ],
  templateUrl: './direction-form.component.html',
  styleUrl: './direction-form.component.css'
})
export class DirectionFormComponent {

  private fb = inject(FormBuilder)
  private geocod = inject(GeocodingService)

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
    next: (response) => {
      console.log('Respuesta de geocodificación:', response);
      if (response.results && response.results.length > 0) {
        const location = response.results[0].geometry.location;
        console.log('Coordenadas:', location);
        // Actualiza el mapa o realiza otra acción
      } else {
        console.error('No se encontraron resultados');
      }
    },
    error: (err) => {
      console.error('Error al llamar a la API de geocodificación:', err);
    },
    });
    
    this.myForm.reset();
  }
  
}
