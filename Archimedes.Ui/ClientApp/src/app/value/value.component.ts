import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html'
})
export class ValueComponent {
  public valueForecasts: ValueForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<ValueForecast[]>(baseUrl + 'values').subscribe(result => {
      this.valueForecasts = result;
    }, error => console.error(error));
  }
}

interface ValueForecast {
  value: string;
}
