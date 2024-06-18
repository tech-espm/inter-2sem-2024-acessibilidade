import app = require("teem");

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

	public async facaparte(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Faça-Parte"
		};

		res.render("index/facaparte", opcoes);
	}

	public async confirmacao(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "confirmacao"
		};

		res.render("index/confirmacao", opcoes);
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

	public async editar(req: app.Request, res: app.Response) {
		let idlocal = parseInt(req.query["idlocal"] as string);

		let local: any = null;

		let tipos: any[];

		await app.sql.connect(async sql => {
			tipos = await sql.query("select idtipo, nm_tipo from tipo order by nm_tipo");
			let lista: any[] = await sql.query("select idlocal, idtipo, nm_local, end_local, cep_local, num_local, cidade_local, uf_local, lat_local, lng_local, estrelas from local where idlocal = ?", [idlocal]);
			if (lista.length) {
				local = lista[0];
			}
		});

		let opcoes = {
			titulo: "Editar Local",
			tipos: tipos,
			local: local
		};

		if (!local) {
			res.render("index/nao-encontrado", opcoes);
			return;
		}

		res.render("index/editar", opcoes);
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

		if (!local.estrelas) {
			res.status(400).json("estrelas inválido!");
			return;
		}

		await app.sql.connect(async sql => {
			await sql.query("insert into local (idtipo, nm_local, end_local, cep_local, num_local, cidade_local, uf_local, lat_local, lng_local, estrelas) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [ local.idtipo, local.nm_local, local.end_local, local.cep_local, local.num_local, local.cidade_local, local.uf_local, local.lat_local, local.lng_local, local.estrelas ]);
		});

		res.json(true);
	}

	@app.http.post()
	@app.route.formData()
	public async salvar(req: app.Request, res: app.Response) {
		let local = req.body;

		if (!local.idlocal) {
			res.status(400).json("Id inválido!");
			return;
		}

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

		if (!local.estrelas) {
			res.status(400).json("estrelas inválido!");
			return;
		}

		await app.sql.connect(async sql => {
			await sql.query("update local set idtipo = ?, nm_local = ?, end_local = ?, cep_local = ?, num_local = ?, cidade_local = ?, uf_local = ?, lat_local = ?, lng_local = ?, estrelas = ? where idlocal = ?", [ local.idtipo, local.nm_local, local.end_local, local.cep_local, local.num_local, local.cidade_local, local.uf_local, local.lat_local, local.lng_local, local.estrelas, local.idlocal ]);
		});

		res.json(true);
	}

	@app.http.delete()
	public async excluir(req: app.Request, res: app.Response) {
		let idlocal = parseInt(req.query["idlocal"] as string);

		await app.sql.connect(async sql => {
			await sql.query("delete from local where idlocal = ?", [idlocal]);
		});

		res.json(true);
	}

	public async locais(req: app.Request, res: app.Response) {
		let tipos: any[];
		let locais: any[];

		await app.sql.connect(async sql => {
			tipos = await sql.query("select idtipo, nm_tipo from tipo");
			locais = await sql.query("select idlocal, idtipo, nm_local, end_local, cep_local, num_local, cidade_local, uf_local, estrelas from local");
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
