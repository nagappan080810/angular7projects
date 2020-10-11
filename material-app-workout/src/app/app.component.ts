import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICoronaStats } from 'src/app/coronastats';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Country Wide Corona Status Tracker'

  displayedColumns: string[] = [
    'Country',
    'TotalConfirmed',
    'NewConfirmed',
    'TotalDeaths',
    'NewDeaths',
    'TotalRecovered',
    'NewRecovered',
    'Date',
  ]

  coronastats: ICoronaStats[] = [];

  @ViewChild(MatSort) matsort: MatSort;

  @ViewChild(MatSort, {static: false}) 
  set sort(sort: MatSort) {
    sort.sortChange.subscribe((sort: Sort) => {
      console.log('sortChange', sort.active);
      console.log('sortChange', sort.direction);
      console.log(this.coronastats);
      this.coronastats = this.coronastats.sort((cs1, cs2) => {
        if (sort.direction === 'asc') {
          return cs1[sort.active] - cs2[sort.active];
        } else {
          return cs2[sort.active] - cs1[sort.active];
        }
      });
      this.coronastats = [...this.coronastats];
      console.log(this.coronastats);    
    });

    this.matsort = sort;
    // this.dataSource.sortingDataAccessor = (data, sortheaderid) => {
    //   console.log(sortheaderid);
    //   return data[sortheaderid];
    // };
 }

  ngOnInit() {
    this.fetchCoronaStats();
  }

  constructor(private httpclient: HttpClient) {

  }

  fetchCoronaStats(): void {
    this.httpclient.get("https://api.covid19api.com/summary").subscribe((response: any)=>{
      console.log("response ===>", response.Countries)
      this.coronastats = response.Countries
      this.coronastats.forEach((stat: ICoronaStats, index, arr)=> {
        let percentage: Number = (stat.TotalRecovered.valueOf() / stat.TotalConfirmed.valueOf()) * 100  
        console.log(stat.Country + "==" +  percentage +  "==" +  (percentage > 50));
        if (percentage > 50) {
          stat.isMedicalGood = true;
        } 
      })
    });
  }
}
