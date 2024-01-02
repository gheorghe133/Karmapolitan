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
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterOutlet],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("0.5s", style({ opacity: 1 })),
      ]),
    ]),
  ],
  template: `
    <section class="section">
      <div class="container-form">
        <h1 class="title">{{ title }}</h1>
        <form class="form" [formGroup]="searchForm" (onSubmit)="search()">
          <input
            class="form-input"
            type="text"
            placeholder="Song title ..."
            formControlName="song_name"
          />
          <br />
          <input
            class="form-input"
            type="text"
            placeholder="Song artist ..."
            formControlName="song_artist"
          />
          <br />
          <button
            class="form-button"
            [disabled]="this.searchForm.invalid"
            [class.disabled]="this.searchForm.invalid"
            (click)="search()"
          >
            Search
          </button>
        </form>

        <div class="error-container">
          @if (this.hasError) {
          <p class="error-message">{{ this.errorMessage }}</p>
          }
        </div>
      </div>
      <div class="container-lyrics">
        @if (loader) {
        <div class="lyrics-loader"></div>
        } @else if (lyrics && !hasError && !loader) {
        <div
          class="lyrics-background"
          [style.background]="getBackgroundStyle()"
          [@fadeIn]
        ></div>
        <div class="lyrics-information" [@fadeIn]>
          <img
            class="lyrics-image"
            [src]="lyrics.header_image_url"
            [alt]="lyrics.header_image_url"
          />
          <h1 class="lyrics-title">{{ lyrics.full_title }}</h1>
          <p class="lyrics">{{ lyrics.lyrics }}</p>
        </div>
        }
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

      .section .container-form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .section .container-form .title {
        font-size: 35px;
        letter-spacing: 10px;
      }

      .section .container-form .form {
        width: 80%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .section .container-form .form .form-input {
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

      .section .container-form .form .form-input::placeholder {
        color: #a0aec0;
      }

      .section .container-form .form .form-button {
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
        transition: 0.2s ease-in;
      }

      .section .container-form .form .disabled {
        cursor: not-allowed !important;
        opacity: 0.5;
      }

      .section .container-form .error-container {
        height: 25px;
      }

      .section .container-form .error-message {
        font-weight: 600;
        color: #e11d48;
      }

      .section .container-lyrics {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .section .container-lyrics .lyrics-background {
        height: 100%;
        width: 100%;
        position: absolute;
        filter: blur(100px);
        transition: 0.5s ease-in;
        z-index: -1;
      }

      .section .container-lyrics .lyrics-information {
        width: 100%;
        position: relative;
        z-index: 1;
        padding: 20px;
        overflow-y: auto;
      }

      .section .container-lyrics .lyrics-information .lyrics-image {
        width: 300px;
        height: 300px;
      }

      .section .container-lyrics .lyrics-information .lyrics-title {
        word-break: break-word;
      }

      .section .container-lyrics .lyrics-information .lyrics {
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 24px;
      }

      .section .container-lyrics .lyrics-loader {
        width: 56px;
        height: 56px;
        display: grid;
        border: 4.5px solid #0000;
        border-radius: 50%;
        border-color: #dbdcef #0000;
        animation: lyrics-loader 1s infinite linear;
      }

      .section .container-lyrics .lyrics-loader::before,
      .section .container-lyrics .lyrics-loader::after {
        content: "";
        grid-area: 1/1;
        margin: 2.2px;
        border: inherit;
        border-radius: 50%;
      }

      .section .container-lyrics .lyrics-loader::before {
        border-color: #1e3a8a;
        animation: inherit;
        animation-duration: 0.5s;
        animation-direction: reverse;
      }

      .section .container-lyrics .lyrics-loader::after {
        margin: 8.9px;
      }

      @keyframes lyrics-loader {
        100% {
          transform: rotate(1turn);
        }
      }

      @media (max-width: 950px) {
        .section {
          display: block;
        }

        .section .container-form {
          height: max-content;
        }

        .section .container-form .title {
          font-size: 25px;
        }

        .section .container-lyrics {
          height: max-content;
        }

        .section .container-lyrics .lyrics-loader {
          margin-top: 100px;
        }
      }

      @media (max-width: 412px) {
        .section .container-form .form {
          padding: 0;
        }

        .section .container-form .title {
          letter-spacing: 7px;
        }

        .section .container-lyrics .lyrics-information .lyrics-image {
          width: 100%;
          min-height: 370px;
        }
      }

      @media (max-width: 360px) {
        .section .container-lyrics .lyrics-information .lyrics-image {
          min-height: 320px;
        }
      }
    `,
  ],
})
export class AppComponent {
  title: string = "Karmapolitan";

  searchForm: FormGroup;

  lyrics: any | undefined;

  errorMessage: string | undefined;
  hasError: boolean | undefined;

  loader: boolean | undefined;

  constructor(
    private lyricsService: LyricsService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      song_name: [null, [Validators.required]],
      song_artist: [null],
    });
  }

  public search() {
    this.loader = true;

    this.lyricsService
      .getLyrics(
        this.searchForm.value.song_name,
        this.searchForm.value.song_artist
      )
      .subscribe(
        (result) => {
          this.lyrics = result;
          this.hasError = false;
          this.loader = false;
        },
        (error) => {
          this.hasError = true;
          this.loader = false;
          this.lyrics = null;
          this.errorMessage = error.error.error;
        }
      );
  }

  public getBackgroundStyle() {
    if (this.lyrics && this.lyrics.header_image_url) {
      return `url('${this.lyrics.header_image_url}') center/cover`;
    } else {
      return "";
    }
  }
}
