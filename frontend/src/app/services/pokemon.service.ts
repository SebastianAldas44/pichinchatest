import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../utilities/global';
import { Pokemon } from '../models/pokemon';

@Injectable()
export class PokemonService
{
	private url: string;
	constructor(
		private _http: HttpClient
	){
		this.url = Global.url; 
	}

	getAll(): Observable<any>
	{
		return this._http.get(this.url  + "?idAuthor=1");
	}

	getOneById(id: number): Observable<any>
	{
		return this._http.get(this.url  + id);
	}

	getByName(name: string): Observable<any>
	{
		return this._http.get(this.url  + "?idAuthor=1&name=" + name);
	}

	create(pokemon: Pokemon): Observable<any>
	{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.post(this.url + "?idAuthor=1", pokemon, { headers });
	}

	update(pokemon: Pokemon): Observable<any>
	{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.put(this.url + pokemon.id, pokemon, { headers });
	}

	delete(pokemon: Pokemon): Observable<any>
	{
		let headers = new HttpHeaders().set("Content-Type", "application/json");
		return this._http.delete(this.url + pokemon.id);
	}
}