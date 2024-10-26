# FrontOffice SOLID

Proyecto web para venta

### Requisitos

-  [node v20.14.0](https://nodejs.org/en/blog/release/v20.9.0)
-  [yarn 1.22.22](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) `npm install --global yarn`
-  Servidor Apache ([XAMPP](https://www.apachefriends.org/), [WampServer](https://www.wampserver.com/), [Apache Lounge](https://www.apachelounge.com/), [Bitnami](https://bitnami.com/), [Laragon](https://laragon.org/))

## Development

Utilizar el archivo `.env.example` como modelo para crear el arvchivo .env en el directorio raiz del proyecto, este archivo contiene la direccion URL del API:

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
