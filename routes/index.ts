import app = require("teem");

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

		await app.sql.connect(async sql => {
			
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
