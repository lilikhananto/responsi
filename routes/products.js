var express = require('express');
const Validator = require('fastest-validator');
var router = express.Router();

const { Product } = require('../models');

const v = new Validator();

// untuk mengambil data dan menampilkan isi database
router.get('/', async (req, res) => {
    const products = await Product.findAll();
    return res.json(products);
});

// mengambil data sesuai dengan id 
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    return res.json(product || {});
});

// untuk menambah data ke dalam database
router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        brand: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema); // Perbaikan disini

    if (validate.length) {
        return res.status(400).json(validate);
    }

    // menyimpan ke dalam database
    const product = await Product.create(req.body);
    res.json(product);
});

// untuk melakukan update pada data sesuai dengan id yang dimasukkan
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    // cek data dalam database
    let product = await Product.findByPk(id);

    // cek apakah ada datanya
    if (!product) {
        return res.json({ message: 'Produk tidak ditemukan' });
    }

    const schema = {
        name: 'string|optional',
        brand: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema); // Perbaikan disini

    if (validate.length) {
        return res.status(400).json(validate);
    }

    product = await product.update(req.body);
    res.json(product);
});

// untuk menghapus data
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    // cek data dalam database
    const product = await Product.findByPk(id);

    // cek apakah ada datanya
    if (!product) {
        return res.json({ message: 'Produk tidak ditemukan' });
    }

    await product.destroy();

    res.json({
        message: 'Produk dihapus'
    });
});

module.exports = router;