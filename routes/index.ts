﻿import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let locais: any[];

		await app.sql.connect(async sql => {
			locais = await sql.query("select idlocal, idtipo, nm_local, end_local, cep_local, num_local, cidade_local, uf_local, lat_local, lng_local from local");
		});

		let opcoes = {
			locais: locais
		};

		res.render("index/index", opcoes);
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
			titulo: "Experiências"
		};

		res.render("index/experiencias", opcoes);
	}

	public async registrar(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Registrar-se"
		};

		res.render("index/registrar", opcoes);
	}

	public async novo(req: app.Request, res: app.Response) {
		let tipos: any[];

		await app.sql.connect(async sql => {
			tipos = await sql.query("select idtipo, nm_tipo from tipo order by nm_tipo");
		});

		let opcoes = {
			titulo: "Novo Local",
			tipos: tipos
		};

		res.render("index/novo", opcoes);
	}

	@app.http.post()
	@app.route.formData()
	public async adicionar(req: app.Request, res: app.Response) {
		let local = req.body;

		if (!local.nm_local) {
			res.status(400).json("Nome inválido!");
			return;
		}

		if (!local.end_local) {
			res.status(400).json("Endereço inválido!");
			return;
		}

		if (!local.cep_local) {
			res.status(400).json("cep inválido!");
			return;
		}

		if (!local.num_local) {
			res.status(400).json("Numero inválido!");
			return;
		}

		if (!local.cidade_local) {
			res.status(400).json("CIdade inválida!");
			return;
		}

		if (!local.uf_local) {
			res.status(400).json("Estado inválido!");
			return;
		}

		if (!local.idtipo) {
			res.status(400).json("Tipo inválido!");
			return;
		}

		if (!local.lat_local) {
			res.status(400).json("Latitude inválida!");
			return;
		}

		if (!local.lng_local) {
			res.status(400).json("Longitude inválida!");
			return;
		}

		await app.sql.connect(async sql => {
			await sql.query("insert into local (idtipo, nm_local, end_local, cep_local, num_local, cidade_local, uf_local, lat_local, lng_local) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", [ local.idtipo, local.nm_local, local.end_local, local.cep_local, local.num_local, local.cidade_local, local.uf_local, local.lat_local, local.lng_local ]);
		});

		res.json(true);
	}

	

	public async locais(req: app.Request, res: app.Response) {
		let tipos: any[];
		let locais: any[];

		await app.sql.connect(async sql => {
			tipos = await sql.query("select idtipo, nm_tipo from tipo");
			locais = await sql.query("select idlocal, idtipo, nm_local, end_local, cep_local, num_local, cidade_local, uf_local from local");
		});

		let opcoes = {
			titulo: "Locais",
			tipos: tipos,
			locais: locais			
		};

		res.render("index/locais", opcoes);
	}
}

export = IndexRoute;
