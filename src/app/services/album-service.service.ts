// album-service.service.ts
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { Album } from '../component/album/model/model'
import { observable } from 'rxjs';
@Injectable()
export class AlbumService {
constructor(private http: Http) { }
// this is the endpoint of our REST API service in Go
  private albumsUrl = 'http://localhost:11000/';
  private albumsAddUrl = this.albumsUrl + "add" ;
  private albumDeleteUrl = this.albumsUrl + "delete";
// Fetch all existing albums
     getAlbums() : Observable<Album[]> {
// ...using get request
         return this.http.get(this.albumsUrl)
          // ...and calling .json() on the response to return data
            .map((res:Response) => res.json())
            //...errors if any
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
     }
// Add a new album
    addAlbum (body: Object): Observable<Object> {
        let bodyString = JSON.stringify(body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'text/plain' }); // ... Set content type as text in order not to trigger preflight OPTIONS request
        let options       = new RequestOptions({ headers: headers }); // Create a request option
return this.http.post(this.albumsAddUrl, body, options) // ...using post request
                         .map((res:Response) => res) // ...and returning data
                         .catch((error:any) => Observable.throw(error || 'Server error')); //...errors if any
    }
    
//Delete an Album
    deleteAlbum (body: Object): Observable<Object> {
      let contentString = JSON.stringify(body);
     // let album_id = contentString.substring(12,36)
      console.log("The contentString " + contentString)
      //console.log("After substring  " + album_id)
      let headers = new Headers({ "Access-Control-Request-Method": "DELETE", "OPTIONS": "OPTIONS"});
      let options       = new RequestOptions({ headers: headers }); // Create a request option
      //console.log("The object string is " + album_id)
    return this.http.delete(this.albumDeleteUrl,options) 
                                .map((res:Response) => res)
                                .catch((err:any) => Observable.throw(err || 'Server error') );


    }
}