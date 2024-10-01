# Task Manager - Angular Project

Este proyecto es una aplicación de gestión de tareas simple utilizando **Angular**, **NgRx** para el manejo del estado, y **PrimeNG** como biblioteca de componentes UI. 

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

/src │ ├── /app │ ├── /components │ │ ├── /task-form # Componente de formulario para crear/editar tareas │ │ └── /task-list # Componente para listar las tareas │ │ │ ├── /states # NgRx state management (acciones, reducers, selectores) │ │ ├── task.actions.ts # Definición de acciones de NgRx para tareas │ │ ├── task.reducer.ts # Reducer que maneja el estado de las tareas │ │ └── task.selectors.ts # Selectores para obtener el estado de las tareas │ │ │ └── app.module.ts # Módulo principal de la aplicación │ ├── /assets # Recursos estáticos como imágenes y estilos ├── /environments # Archivos de configuración de entorno └── index.html # Punto de entrada de la aplicación

## Características

- **Crear tareas**: Un formulario que permite crear nuevas tareas.
- **Editar tareas**: Las tareas existentes se pueden seleccionar y editar.
- **Eliminar tareas**: Permite eliminar tareas.
- **Completar tareas**: Marca las tareas como completadas.
- **Manejo de estado con NgRx**: Utiliza NgRx para la gestión de estado global, asegurando que todas las tareas se gestionen de manera eficiente en la aplicación.
- **Interfaz amigable**: Utiliza PrimeNG para proporcionar una interfaz moderna y fácil de usar.

## Requisitos previos

Asegúrate de tener las siguientes herramientas instaladas en tu sistema:

- [Node.js](https://nodejs.org/) - Recomendado: versión LTS.
- [Angular CLI](https://angular.io/cli) - Recomendado: versión 12 o superior.
- Un editor de texto como [Visual Studio Code](https://code.visualstudio.com/).

## Instalación y Configuración

### 1. Clona el repositorio

git clone https://github.com/dario2801/velaio
cd task-manager

## Instalar dependencias
npm install
## Iniciar el servidor de desarrollo
ng serve --open
## Accede a la aplicación en tu navegador
http://localhost:4200
## Compilacion
ng build --prod

