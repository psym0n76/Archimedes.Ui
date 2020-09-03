import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { ConfigurationService } from '../services/configuration.service';

@Component({
  selector: 'app-value',
  templateUrl: './fetch-value-data.component.html'
})
export class FetchValueDataComponent implements OnInit  {

  valueForecasts: string[] = [];
  hubConnection: HubConnection;
  userInterfaceBaseUrl: string;

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    configuration: ConfigurationService)
  {
    http.get<string[]>(baseUrl + 'values').subscribe(result => { this.valueForecasts = result; }, error => console.error(error));

    this.userInterfaceBaseUrl = configuration.userInterfaceBaseUrl;
  }

  ngOnInit(): void {

    this.hubConnection = new HubConnectionBuilder().withUrl(`${this.userInterfaceBaseUrl}/Hubs/Values`).build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started..' + this.userInterfaceBaseUrl + '/Hubs/Values'))
      .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.on('Add',
      (type: string) => {

        this.valueForecasts.push(type);
        console.log('Message Received');
        console.log(type);
      });
  }
}

