# FrontOffice SOLID

Proyecto web para venta

## Requisitos

-  [node v20.14.0](https://nodejs.org/en/blog/release/v20.9.0)
-  [yarn 1.22.22](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) `npm install --global yarn`
-  Servidor Apache ([XAMPP](https://www.apachefriends.org/), [WampServer](https://www.wampserver.com/), [Apache Lounge](https://www.apachelounge.com/), [Bitnami](https://bitnami.com/), [Laragon](https://laragon.org/))

## Configuración Inicial para Jenkins

-  Configurar correctamente un servidor Apache en la que se desplegara el artefacto generado y asegurarse tener presente la configuracion `HTDOCS_DIR` en el pipeline, que define el directorio del servidor apache en donde se debe copiar el artefacto generado para exponerlo en el servidor apache
-  Asegurarse de tener instalado [node](https://nodejs.org/en/blog/release/v20.9.0)
-  Asegurarse de tener instalado [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

```bash
npm install --global yarn
```

-  Tomar en cuenta la dirección de la API, por defecto esta fijado en `http://localhost:8080` pero se puede modificar, ajustando el parámetro `URL_BACKEND` en el pipeline

## Configuración para entorno de desarrollo

Utilizar el archivo `.env.example` como modelo para crear el archivo .env en el directorio raíz del proyecto, este archivo contiene la dirección URL del API:

```properties
VITE_API_URL=http://localhost:8080/api
```

### Instalar dependencias

luego de descargar el repositorio, ejecutar el comando yarn install para descargar las dependencias

```bash
yarn install
```

### Levantar servicio en desarrollo

Para levantar el servicio en desarrollo, utilizar el comando yarn dev

```bash
yarn dev
```
