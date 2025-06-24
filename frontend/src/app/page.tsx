import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Visualización de Datos de Productos</h1>
        
        <div className="flex flex-col gap-4">
          <Link 
            href='/GraficoPrecios' 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver análisis de precios por categoría
          </Link>
          
          <Link 
            href='/GraficoMarcas' 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Ver distribución por marcas
          </Link>
        </div>
      </main>
    </div>
  );
}