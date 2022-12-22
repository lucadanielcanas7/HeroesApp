import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  heroes: Heroe[] = []
  selectedHeroe: Heroe | undefined;

  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.heroesService.getSuggested(this.searchTerm.trim())
      .subscribe(heroes => this.heroes = heroes)
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value) {
      this.selectedHeroe = undefined;
      return; 
    }

    const heroe: Heroe = event.option.value;
    this.searchTerm = heroe.superhero;
    this.heroesService.getHeroe(heroe.id!)
      .subscribe(heroe => this.selectedHeroe = heroe)
  }

}
