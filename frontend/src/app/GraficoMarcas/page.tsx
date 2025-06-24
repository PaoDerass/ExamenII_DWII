'use client'
import { traerProductosPorMarca } from '@/app/Servicios/api';
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2';
import Link from 'next/link';

import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend 
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function page() {
    const [infoGrafico, setInfoGrafico] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }
        ]
    });

    const [estaCargando, setEstaCargando] = useState(true);

    // Paleta de colores para el grafico circular
    const coloresRelleno = [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 205, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(199, 199, 199, 0.8)',
        'rgba(83, 102, 255, 0.8)',
        'rgba(255, 99, 255, 0.8)',
        'rgba(99, 255, 132, 0.8)'
    ];

    const coloresLinea = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 205, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(255, 99, 255, 1)',
        'rgba(99, 255, 132, 1)'
    ];

    useEffect(() => {
        traerProductosPorMarca()
            .then(informacion => {
                console.log('Info recibida:', informacion);
                
                const nombresMarcas = informacion.map((elemento: any) => elemento.brandCode);
                const cantidadItems = informacion.map((elemento: any) => parseInt(elemento.cantidad));

                setInfoGrafico({
                    labels: nombresMarcas,
                    datasets: [{
                        label: 'Total de productos',
                        data: cantidadItems,
                        backgroundColor: coloresRelleno.slice(0, nombresMarcas.length),
                        borderColor: coloresLinea.slice(0, nombresMarcas.length),
                        borderWidth: 1
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
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Distribución del inventario por marcas'
            },
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
                Gráfico Circular - Productos por Marca
            </h1>
            
            <div className="max-w-4xl mx-auto">
                <Pie data={infoGrafico} options={configuracionGrafico} />
            </div>
        </div>
    );
}