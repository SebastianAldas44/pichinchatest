import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css'],
	providers: [PokemonService]
})
export class FormularioComponent implements OnInit {
	faSave = faSave;
	faX = faX;
	pokemon: Pokemon;

	constructor(
		private _pokemonService: PokemonService,
		private _toastService: ToastrService,
		private _router: Router,
		private _route: ActivatedRoute
	){
		this.pokemon = new Pokemon(null, '', '', 0, 0, 0, '', 1);
	}

	ngOnInit(): void {
		this._route.params.subscribe(param => {
			if(param["id"])
				this.getPokemon(parseInt(param["id"]));
		});
	}

	getPokemon(id: number): void
	{
		this._pokemonService.getOneById(id).subscribe(res => {
			this.pokemon = new Pokemon(res.id, res.name, res.image, res.attack, res.defense, res.hp, res.type, res.idAuthor);
		}, error => {
			console.log(error);
			this._toastService.error('El Pokemon que busca no existe');
			this._router.navigate(['/']);
		});
	}

	createPokemon(): void
	{
		this._pokemonService.create(this.pokemon).subscribe(res => {
			this._toastService.success('Pokemon creado de manera correcta');
			this._router.navigate(['/']);
		}, error => {
			this._toastService.error('No se ha podido crear el Pokemon');
			console.log(error);
		});
	}

	updatePokemon(): void
	{
		this._pokemonService.update(this.pokemon).subscribe(res => {
			this._toastService.success('Pokemon actualizado de manera correcta');
			this._router.navigate(['/']);
		}, error => {
			this._toastService.error('No se ha podido actualizar los datos del Pokemon');
			console.log(error);
		});
	}

	savePokemon(): void
	{
		if(this.pokemon.id)
			this.updatePokemon();
		else
			this.createPokemon();
	}
}
