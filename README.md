# show-price
A tool to get a hourly price of an environments hosted on AWS Cloud provider.

To make it works every instance should be tagged with a following tags:

env: ENVIRONMENT_NAME
service: SERVICE_NAME

Examples,

So, saying you have following logical infrastructure -
**dev** and **prod** environments with two different services in each env - **backend** and a **frontend**.

```bash
# Display price per envs only
$ show-price -p "*"
.prod = 0.0174$ per hour
.dev = 0.0116$ per hour

# Display price per envs per services
$ show-price -p "*.*"
.prod.front = 0.0174$ per hour
.dev.front = 0.0058$ per hour
.dev.back = 0.0058$ per hour

# Display price for a specific env
$ show-price -p "prod"
.prod = 0.0174$ per hour

# Display price for a specific env and all it's services
$ show-price -p "prod.*"
.prod.front = 0.0174$ per hour

# Display price for all specific services within all envs
$ show-price -p "*.front"
.prod.front = 0.0174$ per hour
.dev.front = 0.0058$ per hour


# Display price for a specific instance in a specific env and service
$ show-price -p "prod.front.i-009105b93c431c998"
.prod.front.i-009105b93c431c998 = 0.005800$ per hour

# Display price of all instances for an env
$ show-price -p "prod.*.*"
.prod.front.i-009105b93c431c998 = 0.005800$ per hour
.prod.front.i-01adbf97655f57126 = 0.005800$ per hour
.prod.front.i-0c6137d97bd8318d8 = 0.005800$ per hour
```
