﻿import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre"
		};

		res.render("index/sobre", opcoes);
	}

	public async eventos(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Eventos"
		};

		res.render("index/eventos", opcoes);
	}

	public async experiencias(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Experiencias"
		};

		res.render("index/experiencias", opcoes);
	}

	public async novo(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Novo Local"
		};

		res.render("index/novo", opcoes);
	}

	@app.http.post()
	@app.route.formData()
	public async adicionar(req: app.Request, res: app.Response) {

		await app.sql.connect(async sql => {
			
		});

		res.json(true);
	}

	

	public async locais(req: app.Request, res: app.Response) {
		let produtoA = {
			id: 1,
			nome: "Produto A",
			valor: 25
		};

		let produtoB = {
			id: 2,
			nome: "Produto B",
			valor: 15
		};

		let produtoC = {
			id: 3,
			nome: "Produto C",
			valor: 100
		};

		let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

		let opcoes = {
			titulo: "Locais",
			produtos: produtosVindosDoBanco
		};

		res.render("index/locais", opcoes);
	}
}

export = IndexRoute;
