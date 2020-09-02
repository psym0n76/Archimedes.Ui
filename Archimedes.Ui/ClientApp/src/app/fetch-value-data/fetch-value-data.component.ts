import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-value',
  templateUrl: './fetch-value-data.component.html'
})
export class FetchValueDataComponent implements OnInit  {

  public valueForecasts: string[] = [];
  public hubConnection: HubConnection;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<string[]>(baseUrl + 'values').subscribe(result => { this.valueForecasts = result; }, error => console.error(error));
  }


  ngOnInit(): void {

    this.hubConnection = new HubConnectionBuilder().withUrl("https://localhost:44314/Hubs/Values").build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started..'))
      .catch(err => console.log('Error while establishing connection : ('));

    this.hubConnection.on('Add', (type: string) => {
      this.valueForecasts.push(type);

      console.log('Message Received');
      console.log(type);
    });


  }















  }

