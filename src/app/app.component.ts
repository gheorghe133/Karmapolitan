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
    <section class="section">
      <div class="container-form">
        <h1 class="title">Karmapolitan</h1>
        <form [formGroup]="searchForm" (onSubmit)="search()">
          <input
            type="text"
            placeholder="Sont title ..."
            formControlName="song_name"
          />
          <br />
          <input
            type="text"
            placeholder="Sont artist ..."
            formControlName="song_artist"
          />
          <br />
          <button (click)="search()">Search</button>
        </form>

        <div class="error-container">
          @if (this.hasError) {
          <p class="error">{{ this.errorMessage }}</p>
          }
        </div>
      </div>
      <div class="container-lyrics">
        <div class="information">
          @if (!this.hasError) {
          <img
            class="image"
            src="{{ this.lyrics?.header_image_url }}"
            alt="{{ this.lyrics?.header_image_url }}"
          />
          <h1>{{ this.lyrics?.full_title }}</h1>
          <p class="lyrics">{{ this.lyrics?.lyrics }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .container-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
          font-size: 35px;
          letter-spacing: 10px;
        }

        form {
          width: 80%;
          padding: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          input[type="text"] {
            width: 100%;
            border: 1px solid #d1d5db;
            color: #f3f4f6;
            font-size: 0.875rem;
            border-radius: 0.375rem;
            padding: 0.625rem;
            background-color: #1f2937;
            border-color: #4b5563;
            outline: none;
          }

          input[type="text"]::placeholder {
            color: #a0aec0;
          }

          button {
            width: 100%;
            border: 1px solid #d1d5db;
            color: #f3f4f6;
            font-size: 0.875rem;
            border-radius: 0.375rem;
            display: block;
            padding: 0.625rem;
            background-color: #1e3a8a;
            border-color: #1e3a8a;
            outline: none;
            cursor: pointer;
          }
        }

        .error-container {
          height: 25px;
        }

        .error {
          font-weight: 600;
          color: #e11d48;
        }
      }

      .container-lyrics {
        width: 100%;
        height: 100%;
        overflow-y: auto;

        .information {
          .image {
            width: 300px;
          }

          .lyrics {
            white-space: pre-wrap;
            line-height: 24px;
          }
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
