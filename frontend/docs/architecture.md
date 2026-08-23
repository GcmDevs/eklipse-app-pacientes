# Arquitectura base

## Objetivo

Tener una base que permita crecer el producto sin que cada nueva pantalla mezcle UI, reglas de negocio y acceso a datos.

## Estructura propuesta

```text
src/
  app/
    App.tsx
    providers/
  pages/
    home/
      ui/
  shared/
    config/
    ui/
```

## Responsabilidad por carpeta

### `app`

Contiene el arranque global de la aplicacion.

- configuracion de rutas
- providers globales
- bootstrap de la app

### `pages`

Contiene pantallas completas conectadas al router.

- cada pagina compone secciones
- no debe convertirse en deposito de logica reutilizable

### `features`

Reservada para modulos funcionales cuando el producto empiece a crecer.

Ejemplos:

- autenticacion
- citas
- historia clinica
- notificaciones

Cada feature deberia poder contener:

```text
features/
  auth/
    api/
    model/
    ui/
```

### `shared`

Contiene piezas reutilizables y neutrales al dominio.

- componentes presentacionales
- helpers
- configuraciones comunes
- constantes

## Reglas de crecimiento

1. Si algo solo se usa en una pantalla, vive cerca de esa pantalla.
2. Si algo se reutiliza entre dominios, va a `shared`.
3. Si aparece logica propia de negocio, crear `features/<dominio>`.
4. Evitar que `shared` conozca reglas de un dominio especifico.
5. No mezclar llamadas HTTP dentro de componentes de UI si el flujo ya tiene complejidad.

## Convenciones recomendadas

### Imports

- usar alias `@/`
- evitar rutas relativas largas como `../../../`

### Componentes

- un archivo por componente
- nombres en PascalCase
- props tipadas junto al componente si son simples

### Datos y APIs

- un cliente HTTP compartido en `shared/api` cuando aparezca la primera integracion real
- servicios por dominio dentro de `features/<dominio>/api`
- mapear respuestas del backend antes de exponerlas a la UI si la estructura crece

### Estado

- iniciar con estado local por componente o por pagina
- subir a contexto o libreria de estado solo cuando haya necesidad real
- separar estado de servidor de estado de interfaz

## Flujo recomendado para nuevas funcionalidades

1. Crear la pantalla en `pages` si nace de una ruta.
2. Extraer a `features` cuando la funcionalidad tenga reglas propias o varias piezas coordinadas.
3. Mover piezas comunes a `shared` solo cuando exista reutilizacion real.
4. Documentar decisiones estructurales nuevas en este archivo o en un ADR corto.

## Proximos pasos sugeridos

1. Crear `src/features` cuando definamos el primer dominio funcional.
2. Agregar `shared/api/http-client.ts` al integrar backend.
3. Incorporar pruebas para componentes criticos y servicios.
4. Reemplazar la pagina inicial por el primer flujo real del paciente.
