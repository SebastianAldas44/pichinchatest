export class Pokemon
{
	constructor(
		public id: number,
		public name: string,
		public image: string,
		public attack: number,
		public defense: number,
		public hp: number,
		public type: string,
		public idAuthor: number
	){}
}