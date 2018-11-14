# Deployment Instructions

This repository is compatible with netlify but can also be run via kubernetes.

docker build --build-arg SITE_DOMAIN=james.adarich.com . -t jamesadarich/james.adarich.com:<version>

## Create AKS instance

Check the below

```
az aks create --resource-group <RESOURCE_GROUP> --name <NAME> --generate-ssh-keys

az aks --get-credentials SOMETHING
```

### Alocate FQDN to IP address

Get resource group and name of IP

### Setup DNS

Set CNAME

Ingress

### Setup TLS

Cert Manager

Rewrite

## Standard deploys

If during helm install

```
Error: no available release name found
```

probably helm versions out of sync - confirm by `helm version` then fix by:

```
kubectl delete deployment tiller-deploy --namespace kube-system
helm init --upgrade --service-account default
```

## Continuous delivery

### Create service principal

### Setup Blue/Green Deploy

### Tidy up to enable next deploy / rollback

## Pull requests
