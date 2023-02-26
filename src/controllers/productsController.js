const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render("products", { products })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		id = req.params.id;

		const product = products.find((product) => {
			return product.id == id;
		});

		res.render("detail", { product: product })
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},

	// Create -  Method to store
	store: (req, res) => {
		const lastId = products[products.length - 1].id + 1

		const gettingProduct = {
			id: lastId,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: "default-image.png",
			category: req.body.category
		}

		products.push(gettingProduct);

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect("/products");
	},

	// Update - Form to edit
	edit: (req, res) => {
		const id = req.params.id;

		const productFind = products.find((product) => {
			return product.id == id;
		});

		res.render("product-edit-form", { productFind });
	},
	// Update - Method to update
	update: (req, res) => {
		const id = req.params.id;

		products.forEach(product => {
			if (product.id == id) {
				product.name = req.body.name;
				product.description = req.body.description;
				product.price = req.body.price;
				product.discount = req.body.discount;
				product.category = req.body.category;
				if (product == null) {
					product.image = "default-image.png";
				}
			}
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect("/products");
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		id = req.params.id;

		for (let i = 0; i < products.length; i++) {
			if (products[i].id == id) {

				products.splice(i, 1);
			}
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

		res.redirect("/products");
	}
};


console.log(products);

module.exports = controller;