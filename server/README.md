
# Challenge Houlak - Back End

This project connect with the api of spotify and returns the information about your favorite artist
## Deployment

To deploy this project run

```bash
  npm run start
```

To deploy this project with nodemon( Hot reload )

```bash
  npm run watch
```


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Contact with admi to get .env

```bash
  copy .env on root
```

Start the server

```bash
  npm run start
```


## API Reference

#### Get Token

```http
  GET /api/v1/getToken
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| ` `       | `      ` |Returns a token to makes api|

#### Get item

```http
  GET /api/v1/getAlbums/:id/:limit
```

| Parameter | Type     |  Description               |
| :-------- | :------- |:-------------------------- |
| `id`      | `string` | Returns the albums of the specify artist       |
| `limit`   | `number` |     |

#### Get Historical

```http
  GET /api/v1/getHistorical
```

| Parameter | Type     |  Description               |
| :-------- | :------- |:-------------------------- |
| ``        | ``       | Returns the records about all wanted artists    | 


#### Post Search Artist

```http
  POST /api/v1/searchArtist
```

| Body |                |  Description              |
| :-------- | :------- |:-------------------------- |
|   q (Artist name) | string | Returns all data about one artist by the name                   |
| type              | string |                      |
| market            | string  |                     |
| limit | number | |

#### Post: Get albums by Id on popular order

```http
  POST api/v1/getIdAlbumsByPopularity
```

| Body |                |  Description              |
| :-------- | :------- |:-------------------------- |
|   array | [id: number] | Returns all albums on array, ordered by popularity          |















## Authors

- [@angryPotatoFace](https://github.com/angryPotatoFace/houlak-challenge)

