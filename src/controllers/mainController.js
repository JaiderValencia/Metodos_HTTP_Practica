const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visited = products.filter((product) => {
			return product.category == "visited";
		});

		const inSale = products.filter((product) => {
			return product.category == "in-sale";
		});

		res.render("index", { visited, inSale });
	},
	search: (req, res) => {
		const kwSearch = req.query.keywords;

		const productSearch = [];

		products.forEach(product => {
			if (product.name.toUpperCase().includes(kwSearch.toUpperCase())) {
				productSearch.push(product);
			}
		});

		res.render("results", { productSearch, kwSearch });
	},
};

module.exports = controller;
