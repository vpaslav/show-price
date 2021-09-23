# show-price
A tool to get a hourly price of an environments hosted on AWS Cloud provider.

To make it works every instance should be tagged with a following tags:

env: ENVIRONMENT_NAME
service: SERVICE_NAME

Examples,

So, saying you have following logical infrastructure -
**dev** and **prod** environments with two different services in each env - **backend** and a **frontend**.

> To see prices of all your environments:
> show-price -p "*"

.dev = 0.0406
.prod = 0.0058

> To see prices of all your services:
> show-price -p "*.*"

.dev.frontend = 0.0406
.dev.backend = 0.0406
.prod.frontend = 0.0058
.prod.backend = 0.0058

> To see prices of all your services within **dev** env:
> show-price -p "dev.*"

.dev.frontend = 0.0406
.dev.backend = 0.0406

> To see prices of all your **backend** services:
> show-price -p "*.backend"

.dev.backend = 0.0406
.prod.backend = 0.0058

