# 🟢 Customer API

This is a NestJS REST API that provides a safe and performant registration for customers.

## Configuration

### Cache setup

1. Run the following commands to set up redis:
    ```bash
    $ docker pull redis
    $ docker run -d -p 6379:6379 redis
    ```

### API setup 
1. Go to the *.env.example* file and copy his content
2. Create a *.env* file on the root folder and paste the example content
3. Update *.env* file with correct values for your environment
4. Optional: comment or remove the CACHE_PASSWORD env if you do not have a password on redis

#### Using Docker
* Run the following commands to build and run the Docker image:
    ```bash
    $ docker build -t customer-api .
    $ docker run -p {YOUR_HOST_PORT}:{YOUR_DOCKER_PORT} --name customer-api customer-api
    ```

#### Using host
* Run the following commands launch on your host:
    ```bash
    $ yarn install
    $ yarn start
    ```

## Running tests

```bash
$ yarn test
```

#### Running coverage
```bash
$ yarn test:cov
```

## Operations
```
[POST] /customers -> Create a new customer
[PUT] /customers/:id -> Update customer by id
[GET] /customers/:id -> Find customer by id
```
## Author
[Christopher Moura](https://www.linkedin.com/in/ccmoura/)
