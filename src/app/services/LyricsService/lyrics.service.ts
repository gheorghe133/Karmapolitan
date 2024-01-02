import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LyricsService {
  private apiURL = "https://karmapolitan-server.vercel.app/get_lyrics";

  constructor(private httpClient: HttpClient) {}

  getLyrics(song_name: string, song_artist: string): Observable<any> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    const data = {
      song_name: song_name,
      song_artist: song_artist,
    };

    return this.httpClient.post(`${this.apiURL}`, data, { headers: headers });
  }
}
