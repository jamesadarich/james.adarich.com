# Deployment Instructions

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

### Provision Kubernetes cluster

### Alocate IP address

### Setup DNS

### Setup TLS

## Continuous delivery

### Create service principal

### Setup Blue/Green Deploy

### Tidy up to enable next deploy / rollback

## Pull requests
