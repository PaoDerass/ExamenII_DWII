const express = require('express');
const cors = require('cors');
const sequelize = require('./conexion/database');
const Producto = require('./Modelo/Producto');

const app = express();

app.use(cors());
app.use(express.json());

var puerto = 5000;

app.get('/precios-por-categoria', async (req, resp) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'categoryCode',
                [sequelize.fn('AVG', sequelize.cast(sequelize.col('value'), 'DECIMAL(10,2)')), 'precio_promedio']
            ],
            where: {
                value: {
                    [sequelize.Op.ne]: null,
                    [sequelize.Op.ne]: '',
                    [sequelize.Op.ne]: '0'
                }
            },
            group: ['categoryCode'],
            order: [[sequelize.literal('precio_promedio'), 'DESC']]
        });

        if (resultado.length == 0) {
            resp.status(400).send({ "mensaje": 'No existen registros' });
        } else {
            resp.status(200).send(resultado);
        }

    } catch (error) {
        resp.status(500).send({ error: 'Ocurrio un error: ' + error });
    }
});

app.get('/productos-por-marca', async (req, resp) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'brandCode',
                [sequelize.fn('COUNT', sequelize.col('*')), 'cantidad']
            ],
            where: {
                brandCode: {
                    [sequelize.Op.ne]: null,
                    [sequelize.Op.ne]: ''
                }
            },
            group: ['brandCode'],
            order: [[sequelize.literal('cantidad'), 'DESC']]
        });

        if (resultado.length == 0) {
            resp.status(400).send({ "mensaje": 'No existen registros' });
        } else {
            resp.status(200).send(resultado);
        }

    } catch (error) {
        resp.status(500).send({ error: 'Ocurrio un error: ' + error });
    }
});

app.listen(puerto, () => {
    console.log('Aplicacion ejecutando en el puerto ' + puerto);
});