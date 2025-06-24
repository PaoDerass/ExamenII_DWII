'use client'
import { traerPreciosPorCategoria } from '@/app/Servicios/api';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import Link from 'next/link';

import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
);

export default function page() {
    const [infoGrafico, setInfoGrafico] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                borderColor: '',
                backgroundColor: '',
                fill: false
            }
        ]
    });

    const [estaCargando, setEstaCargando] = useState(true);

    useEffect(() => {
        traerPreciosPorCategoria()
            .then(informacion => {
                console.log('Info recibida:', informacion);
                
                const categoriasNombres = informacion.map((elemento: any) => elemento.categoryCode);
                const valoresPrecios = informacion.map((elemento: any) => parseFloat(elemento.precio_promedio));

                setInfoGrafico({
                    labels: categoriasNombres,
                    datasets: [{
                        label: 'Valor promedio por categoria',
                        data: valoresPrecios,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false
                    }]
                });

                setEstaCargando(false);
            })
            .catch((fallo) => {
                console.log('Hubo un problema:', fallo);
                setEstaCargando(false);
            });
    }, []);

    const configuracionGrafico = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Análisis de precios promedio por categoría de productos'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Valor monetario'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Tipos de categoria'
                }
            }
        }
    };

    if (estaCargando) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl">Obteniendo información...</p>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-4">
                <Link 
                    href='/' 
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    ← Regresar
                </Link>
            </div>
            
            <h1 className="text-2xl font-bold mb-6 text-center">
                Gráfico Lineal - Precios por Categoría
            </h1>
            
            <div className="max-w-4xl mx-auto">
                <Line data={infoGrafico} options={configuracionGrafico} />
            </div>
        </div>
    );
}