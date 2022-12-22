import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private urlBase: string = environment.urlBase + '/heroes'

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlBase}/`);
  }

  getHeroe(heroeId: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.urlBase}/${heroeId}`);
  }

  getSuggested(searchTerm: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.urlBase}?q=${searchTerm}&_limit=6`)
  }

  updateHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.urlBase}/${heroe.id}`, heroe)
  }

  saveHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.urlBase}`, heroe);
  }

  deleteHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/${id}`)
  }
}
