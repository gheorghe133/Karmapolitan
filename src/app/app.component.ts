import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { LyricsService } from "./services/LyricsService/lyrics.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterOutlet],
  template: `
    <form [formGroup]="searchForm" (onSubmit)="search()">
      <input type="text" placeholder="song_name" formControlName="song_name" />
      <br />
      <input
        type="text"
        placeholder="song_artist"
        formControlName="song_artist"
      />
      <br />
      <button (click)="search()">Search</button>
    </form>

    <div class="information">
      @if (this.hasError) {
      <p class="error">{{ this.errorMessage }}</p>
      } @else{
      <img
        class="image"
        src="{{ this.lyrics?.header_image_url }}"
        alt="{{ this.lyrics?.header_image_url }}"
      />
      <h1>{{ this.lyrics?.full_title }}</h1>
      <p class="lyrics">{{ this.lyrics?.lyrics }}</p>
      }
    </div>
  `,
  styles: [
    `
      form {
        input[type="text"] {
          border: 1px solid #d1d5db;
          color: #f3f4f6;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          display: block;
          padding: 0.625rem;
          background-color: #1f2937;
          border-color: #4b5563;
          outline: none;
        }

        input[type="text"]::placeholder {
          color: #a0aec0;
        }

        button {
          border: 1px solid #d1d5db;
          color: #f3f4f6;
          font-size: 0.875rem;
          border-radius: 0.375rem;
          display: block;
          padding: 0.625rem;
          background-color: #1f2937;
          border-color: #4b5563;
          outline: none;
          cursor: pointer;
        }
      }

      .information {
        margin-top: 25px;

        .image {
          width: 300px;
        }

        .lyrics {
          white-space: pre-wrap;
          line-height: 24px;
        }

        .error {
          font-weight: 600;
          color: red;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = "Karmapolitan";

  searchForm: FormGroup;
  lyrics: any | undefined;
  errorMessage: string | undefined;
  hasError: boolean | undefined;

  constructor(
    private lyricsService: LyricsService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      song_name: [null, [Validators.required]],
      song_artist: [null, [Validators.required]],
    });
  }

  search() {
    this.lyricsService
      .getLyrics(
        this.searchForm.value.song_name,
        this.searchForm.value.song_artist
      )
      .subscribe(
        (result) => {
          this.lyrics = result;
          this.hasError = false;
        },
        (error) => {
          this.hasError = true;
          this.errorMessage = error.error.error;
        }
      );
  }
}
