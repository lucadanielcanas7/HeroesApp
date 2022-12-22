import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }  

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor( private _heroesService: HeroesService,
               private _activatedRoute: ActivatedRoute,
               private _router: Router,
               private _snackbar: MatSnackBar,
               public dialog: MatDialog) { }

  ngOnInit(): void {
    if(!this._router.url.includes('edit')) return;

    this._activatedRoute.params
      .pipe(
        switchMap( ({id}) => this._heroesService.getHeroe(id) )
      )  
      .subscribe(heroe => this.heroe = heroe)
  }

  save(): void {
    if(this.heroe.superhero.trim().length === 0) return;
    
    if(this.heroe.id) {
      //update
      this._heroesService.updateHeroe(this.heroe)
        .subscribe(res => {
          this._router.navigate(['/heroes']);
          this.showSnackbar('Heroe actualizado correctamente.')
        })
    }
    else {
      this._heroesService.saveHeroe(this.heroe)
      .subscribe(heroe => {
        this._router.navigate(['/heroes']);
        this.showSnackbar('Heroe creado correctamente.');
      })
    }
  }

  delete(): void {
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().
    pipe(
      switchMap( value => value === true ? this._heroesService.deleteHeroe(this.heroe.id!) : '')
    )
    .subscribe(res => this._router.navigate(['/heroes']))
  }

  showSnackbar(message: string): void {
    this._snackbar.open(message, 'OK!', {
      duration: 2500
    })
  }
}
