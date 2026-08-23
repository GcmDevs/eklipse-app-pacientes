import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="page-shell">
      <div className="simple-card simple-card-inline">
        <p className="eyebrow">Ruta no encontrada</p>
        <h1>Esta vista no esta disponible.</h1>
        <p>
          Puedes volver al inicio de la aplicacion y continuar desde una ruta
          conocida.
        </p>
        <Link to="/inicio" className="primary-button">
          Ir a inicio
        </Link>
      </div>
    </main>
  )
}
