import { Component, OnInit } from '@angular/core';
import { faSearch, faPlus, faPencil, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { PokemonService } from '../../services/pokemon.service';

@Component({
	selector: 'app-listado',
	templateUrl: './listado.component.html',
	styleUrls: ['./listado.component.css'],
	providers: [PokemonService]
})
export class ListadoComponent implements OnInit {
	faSearch = faSearch;
	faPlus = faPlus;
	faPencil = faPencil;
	faTrash = faTrash;
	faX = faX;
	pokemons: any[];
	buscador: string;

	constructor(
		private _pokemonService: PokemonService,
		private _toastService: ToastrService
	){
		this.pokemons = [];
		this.buscador = '';
	}

	ngOnInit(): void {
		this.listPokemons();
	}

	buscar(): void
	{
		if(!this.buscador)
			this.listPokemons();
	}

	listPokemons(): void
	{
		this.buscador = '';
		this._pokemonService.getAll().subscribe(res => {
			this.pokemons = res;
		}, error => {
			console.log(error);
			this.pokemons = [];
		})
	}

	listPokemonsByName(): void
	{
		if(this.buscador)
		{
			this._pokemonService.getByName(this.buscador).subscribe(res => {
				this.pokemons = res;
			}, error => {
				console.log(error);
				this.pokemons = [];
			});
		}
		else
			this._toastService.error('Ingrese un nombre para realizar la busqueda');
	}

	deletePokemon(pokemon: any): void
	{
		let pregunta = "¿Está seguro que desea eliminar el pokemon " + pokemon.name + " [" + pokemon.id + "]?"
		if(confirm(pregunta))
		{
			this._pokemonService.delete(pokemon).subscribe(res => {
				this.listPokemons();
				this._toastService.success("Se ha eliminado de manera correcta el Pokemon "+ pokemon.name + " [" + pokemon.id + "]");
			}, error => {
				this._toastService.error("No se ha podido eliminar el Pokemon "+ pokemon.name + " [" + pokemon.id + "]");
				console.log(error);
			});
		}
	}
}
