# Recipes Frontend

Aplicacion frontend construida con React, TypeScript y Vite para la plataforma Recipes Social.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- CSS global (sin framework de UI)

## Setup

Ver sección Setup del [backend](https://github.com/UlisesChoco/recipes-backend).

## Arquitectura

## Patron orientado a features

Se usa una arquitectura feature-first: cada feature encapsula su logica y UI.

Estructura base por feature:

- components: componentes visuales de la feature.
- hooks: logica de estado, validaciones y casos de uso.
- service: consumo de API y definicion de tipos.
- pages: pantallas enrutables.

Features actuales:

- auth
- landing
- recipes
- shared

Ejemplo de organizacion:

```text
src/
	app/
		router.tsx
		guard/
			JWTProtectedRoute.tsx
		layout/
			LandingLayout.tsx
			AuthLayout.tsx
			MainLayout.tsx
	features/
		auth/
			components/
			hooks/
			pages/
			service/
		recipes/
			components/
			hooks/
			pages/
			service/
```

## Layouts reutilizables

La app separa estructura comun de contenido mediante layouts:

- LandingLayout: header publico + contenido landing + footer.
- AuthLayout: contenido de login/register + footer.
- MainLayout: header principal autenticado + contenido de recetas + footer.

Esto permite reutilizar componentes compartidos y mantener paginas enfocadas en su caso de uso.

## Guard JWT para rutas protegidas

JWTProtectedRoute bloquea acceso indebido a pantallas privadas:

- Lee token desde sessionStorage.
- Si no existe token, redirige a /login.
- Decodifica payload JWT y valida expiracion.
- Si el token esta vencido o es invalido, limpia sesion y redirige a /login.
- Si es valido, habilita render de rutas hijas protegidas.

## Routing

Rutas publicas:

- / -> landing
- /login -> inicio de sesion
- /register -> registro

Rutas protegidas (requieren JWT):

- /recipes -> recetas publicas
- /recipes/me -> mis recetas
- /recipes/new -> crear receta
- /recipes/me/:id -> editar receta propia
- /recipes/:id -> detalle publico de receta y calificacion

## Flujos funcionales

### Autenticacion

- Registro: formulario con validacion de nombre, apellido, email y password.
- Login: autentica contra backend y guarda JWT en sessionStorage.
- Logout: elimina JWT y redirige a login.

### Recetas

- Listado publico de recetas con autor e imagen.
- Listado de recetas propias.
- Creacion de receta con imagen + ingredientes dinamicos (multipart/form-data).
- Edicion de receta propia (incluye reemplazo opcional de imagen).
- Eliminacion de receta con confirmacion previa.
- Vista de detalle de receta con ingredientes y calificaciones.
- Calificacion de recetas (score 1 a 5 + comentario).

### Imagenes

La imagen de cada receta se construye desde el nombre de archivo recibido del backend:

- URL final: {VITE_API_URL}/uploads/{imageName}

Este comportamiento se implementa en la funcion buildRecipeImageSrc del modulo de servicios de recipes.

## Integracion con API backend

Base URL:

- import.meta.env.VITE_API_URL
- fallback local: http://localhost:3000

Endpoints consumidos:

- POST /auth/register
- POST /auth/login
- GET /recipes
- GET /recipes/me
- GET /recipes/:id
- PATCH /recipes/:id
- DELETE /recipes/:id
- POST /recipes (multipart/form-data)
- GET /recipes/:id/ratings
- POST /ratings

## Validaciones y manejo de errores

- Validaciones de formularios en hooks (auth y recipes).
- Manejo de estado de carga y errores por pantalla.
- Parsing de errores de API para mostrar mensajes de backend cuando existen.

## UI y estilos

- Estilos globales en src/index.css.
- Variables CSS para colores, superficies y espaciado.
- Componentes compartidos reutilizables en features/shared/components.
- Diseño responsive para header, footer y secciones principales.
