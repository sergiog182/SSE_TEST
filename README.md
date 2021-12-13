![Appgate Header](media/header.png)
## Prueba Técnica.

**Nombre:** Sergio Alejandro Gutierrez Sanchez

**Cargo:**  Senior Software Engineer

## Como construirlo o empaquetarlo

Para construir la aplicación, es necesario montar la imagen de postgres con la base de datos:

```
 cd SSE_TEST/postgres-db
 docker build -t my-postgres-db .
 docker run -d --name postgres-db -it -p 5432:5432 my-postgres-db
```

Una vez la base de datos esté lista, se debe ejecutar en primera instancia el proyecto domainvalidator escrito en spring boot:

> :warning: Se debe modificar la propiedad **spring.datasource.url** y debe tener el valor de **jdbc:postgresql://localhost:5432/domains**

```
 cd SSE_TEST/domainvalidator
 mvn clean install
 mvn spring-boot:run
```

Finalmente se debe iniciar la aplicación validator-front escrita en react js:

```
 cd SSE_TEST/validator-front
 npm install
 npm start
```

## Como dockerizarlo o construir la imagen de docker

### De forma individual

Para dockerizar la solución se debe ejecutar el archivo dockerfile de cada una de las partes que intervienen en el proyecto:

> :warning: **Se deben mantener los nombres y la red de cada contenedor**

Si la red no está creada, ejecutar primero este comando

```
 docker network create appgate-network
```

### Postgres DB

Este dockerfile, se encarga de crear un contenedor con la imagen del motor de base de datos postgres, y de ejecutar el script que genera la base de datos utilizada por la solución.

```
 docker build -t my-postgres-db .
 docker run -d --name postgres-db -it --network appgate-network -p 5432:5432 my-postgres-db
```

### Backend

Este dockerfile, se encarga de generar un contenedor con el API construido utilizando spring boot, y el cual se conecta a la base de datos creada anteriormente.

```
 docker build -t back:app .
 docker run -d --name backend -it --network appgate-network --rm -p 8080:8080 back:app
```

Para que la construcción del contenedor funcione, es necesario generar el JAR de la aplicación:

```
 mvnw.cmd package -DskipTests // comando utilizado en windows
```

### Frontend

Este dockerfile, se encarga de crear un contenedor con la aplicación web creada con react js, que se encarga de consumir los servicios del API.

```
 docker build -t front:app .
 docker run -d --name frontend -it --network appgate-network --rm -p 80:80 front:app
```

### Utilizando docker-compose

La aplicación está construida pensando en un despliegue más fácil, utilizando docker compose, el archivo necesario se encuentra creado en la raíz del proyecto **docker-compose.yml**, es necesario ejecutar el siguiente comando:

```
 docker-compose up -d --build
```

Una vez se termine la ejecución de dicho comando, se instancian todos los contenedores anteriormente mencionados y se encontrarán en la misma red.

!! imagen docker compose !!

### PgAdmin

Adicionalmente, para hacer más fácil la gestión de base de datos, se agregó un contenedor con la imagen de PgAdmin 4, el cual debe ser configurado para agregar el servidor de la base de datos Domain:

!!Imagen Pgadmin 1!!

!!Imagen Pgadmin 2!!

## Como ejecutar sus pruebas

Para ejecutar las pruebas, una vez el ambiente esté funcionando, el primer paso que se debe realizar, es cargar los datos en postgres, para esto se creó la opción en el front **Upload domains** en el cual se solicita un archivo TXT con los dominios que se desean agregar:

!!! Imagen !!!

Después las opciones para buscar dominios similares y buscar dominios exactos, estarán disponibles para ser utilizadas:

!!! Imagen validar dominios !!!

## CURL para utilizar API

Para facilitar el entendimiento del API desarrollada, se utilizó un plugin para generar la documentación swagger de los endpoints creados en el API (http://localhost:8080/swagger-ui.html#/main-controller):

!!! Imagen Swagger !!!

Esto facilita el uso de una herramienta que permita probar servicios REST como postman:

!!! Imagen Postman !!!

## Genere un diagrama de arquitectura de la solución

!!! Imagen arquitectura solución !!!

## Un diagrama de cómo sería la estrategia de CI/CD que usted propone

Para manejar la estrategia de CI/CD, es necesario aclarar que se plante el uso de un repositorio centralizado con GIT, tales como:

- GitHub (https://github.com/)
- BitBucket (https://bitbucket.org)
- GitLab (https://about.gitlab.com/)

Y se plantea el uso de la metodologia de trabajo colaborativo GitFlow (https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow):

!!! Imagen GitFlow !!!

Partiendo de estos principios, se plantea el uso de Jenkins para la creación y manejo de los pipeline encargados de dichas tareas, de la siguiente manera:

### CI

Este pipeline será el encargado de tomar los cambios registrados en el repositorio de código, realizar la ejecución de pruebas unitarias, realizar un chequeo de código estático utilizando sonarqube y una vez que se pasen las pruebas y los resultados de sonarqube sean los apropiados se procederá a generar las imágenes de los contenedores con los cambios agregados, estas imágenes deben ser depositadas en un repositorio de imágenes tal como Docker Hub.

### CD

Este pipeline será el encargado de detener los contenedores con la imagen actual que será actualizada, hacer pull de la nueva imagen y montar de nuevo el contenedor con dicha imagen; en este paso también se podrían incluir algunas pruebas de integración con los demás contenedores.