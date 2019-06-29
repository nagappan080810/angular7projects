import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    private newsurl = "https://myallies-breaking-news-v1.p.rapidapi.com/GetTopNews";
    isLoading = true;
    isCachedData = false;
    newslist: any = [];

    constructor(private httpclient: HttpClient) {}

    ngOnInit() {
        this.isCachedData = !window.navigator.onLine;
        console.log("assigning value --"+this.isCachedData);
        const httpOptions = {
          headers: new HttpHeaders({
            'X-RapidAPI-Host':  'myallies-breaking-news-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '8efb50ac24mshe05ab3d7fa8ac5ep10313fjsne25022afcc1e'
          })
        };
        console.log("ng on initialization");
        this.httpclient.get(this.newsurl, httpOptions)
            .subscribe((resp) => {
                            console.log(resp['Data']);
                            this.newslist = resp['Data'];
                            this.isLoading = false;
                        },
                        (err) => {
                            console.log(err);
                        });
    }
}
