import { Component, OnInit,  } from '@angular/core';



@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {
  europeTranslate: Array<string> = ["Austria", "Belgium", "Cyprus", "Croatia", "Denmark", "Estonia", "Finland",
    "France", "Germany", "Greece", "Ireland", "Italy", "Latvia", "Lithuania", "Luxemburg", "Malta", "Netherlands",
    "Poland", "Portugal", "UK", "Czech Republic", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Hungary"];
  europe = ["Austria", "Belgio", "Cipro", "Croazia", "Danimarca", "Estonia",
    "Finlandia", "Francia", "Germania", "Grecia", "Irlanda", "Italia", "Lettonia", "Lituania", "Lussemburgo",
    "Malta", "Paesi Bassi", "Polonia", "Portogallo", "Regno Unito", "Repubblica Ceca", "Romania",
    "Slovacchia", "Slovenia", "Spagna", "Svezia", "Svizzera", "Ungheria"];
  constructor() { }

  ngOnInit(): void {
  }

}
