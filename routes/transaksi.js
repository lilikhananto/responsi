var express = require('express');
const Validator = require('fastest-validator');
var router = express.Router();

const { Transaksi } = require('../models');

const v = new Validator();

// untuk mengambil data dan menampilkan isi database
router.get('/', async (req, res) => {
    const transaksi = await Transaksi.findAll();
    return res.json(transaksi);
});

// mengambil data sesuai dengan id 
router.get('/:id', async (req, res) => {
    const id_transaksi = req.params.id;
    const transaksi = await Transaksi.findByPk(id_transaksi);
    return res.json(transaksi || {});
});

// untuk menambah data ke dalam database
router.post('/', async (req, res) => {
    const schema = {
        no_hp: 'string',
        alamat: 'string',
        unit: 'integer',
        metode: 'enum'
    };
    
    const validate = v.validate(req.body, schema);
    
    if (validate.length) {
        return res.status(400).json(validate);
    }

    // menyimpan ke dalam database
    const transaksi = await Transaksi.create(req.body);
    res.json(transaksi);
});

// untuk melakukan update pada data sesuai dengan id yang dimasukkan
router.put('/:id', async (req, res) => {
    const id_transaksi = req.params.id;

    // cek data dalam database
    let transaksi = await Transaksi.findByPk(id_transaksi);

    // cek apakah ada datanya
    if (!transaksi) {
        return res.json({ message: 'Transaksi tidak ditemukan' });
    }

    const schema = {
        no_hp: 'string|optional',
        alamat: 'string|optional',
        unit: 'integer|optional',
        metode: 'enum|optional'
    }

    const validate = v.validate(req.body, schema); // Perbaikan disini

    if (validate.length) {
        return res.status(400).json(validate);
    }

    transaksi = await transaksi.update(req.body);
    res.json(transaksi);
});

// untuk menghapus data
router.delete('/:id', async (req, res) => {
    const id_transaksi = req.params.id;

    // cek data dalam database
    const transaksi = await Transaksi.findByPk(id_transaksi);

    // cek apakah ada datanya
    if (!transaksi) {
        return res.json({ message: 'Transaksi tidak ditemukan' });
    }

    await transaksi.destroy();

    res.json({
        message: 'Transaksi dihapus'
    });
});

module.exports = router;