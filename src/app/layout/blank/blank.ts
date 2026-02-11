import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './blank.html',
  styleUrl: './blank.scss',
})
export class Blank {

}
