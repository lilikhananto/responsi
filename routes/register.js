var express = require('express');
const Validator = require('fastest-validator');
var router = express.Router();

const { Register } = require('../models');

const v = new Validator();

// untuk mengambil data dan menampilkan isi database
router.get('/', async (req, res) => {
    const register = await Register.findAll();
    return res.json(register);
});

// mengambil data sesuai dengan id 
router.get('/:id', async (req, res) => {
    const id_pelanggan = req.params.id;
    const register = await Register.findByPk(id_pelanggan);
    return res.json(register || {});
});

// Add a new register
router.post('/', async (req, res) => {
    const schema = {
        nama: 'string',
        email: 'string',
        password: 'string'
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({ errors: validate });
    }

    const register = await Register.create(req.body);
    res.json(register);
});

// Update register by ID
router.put('/:id', async (req, res) => {
    const id_pelanggan = req.params.id;
    let register = await Register.findByPk(id_pelanggan);

    if (!register) {
        return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
    }

    const schema = {
        nama: 'string|optional',
        email: 'string|optional',
        password: 'string|optional'
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({ errors: validate });
    }

    register = await register.update(req.body);
    res.json(register);
});

// Delete register by ID
router.delete('/:id', async (req, res) => {
    const id_pelanggan = req.params.id;
    const register = await Register.findByPk(id_pelanggan);

    if (!register) {
        return res.status(404).json({ message: 'Pelanggan tidak ditemukan' });
    }

    await register.destroy();

    res.json({
        message: 'Pelanggan dihapus'
    });
});

module.exports = router;