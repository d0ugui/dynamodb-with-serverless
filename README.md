### Live 017

- Command to deploy the stack to the AWS

```
sls create
```

- Command to invoke the API locally

```
sls invoke local -f hello
```

- Command to deploy only code without deploying the entire stack

```
sls deploy function -f {function_name}
```

- Command that generate the deployment package

```
sls package
```

- Command to remove the stack from AWS

```
sls remove
```
