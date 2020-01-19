---
title: Learn Kubernetes in X minutes
layout: simple
---

<figure>

<img src='https://source.unsplash.com/random/600x400' />

</figure>

## Introduction

### Getting a cluster

The easiest way to learn Kubernetes is to run your own cluster. The official [Docker for Mac](https://docker.com) and [Docker for Windows](https://docker.com) all come with Kubernetes integration out-of-the-box.

### Cluster nodes

A Kubernetes cluster has many **nodes**, or physical machines.

```sh
$ kubectl get nodes

  NAME             STATUS   ROLES    AGE   VERSION
  docker-desktop   Ready    master   48m   v1.14.7
```

---

## Deploying an app

### Deployments

Apps start by creating a **deployment**. A deployment can contain Docker images and volumes. Think of it as blueprints for virtual machines that will run your app. Here's a deployment that deploys one Docker image:

```sh
$ kubectl create \
  deployment \
  bootcamp \
  --image=gcr.io/google-samples/kubernetes-bootcamp:v1

  deployment.apps/bootcamp created
```

A cluster can have many deployments. Our cluster should have one now.

```sh
$ kubectl get deployments

  NAME       READY   UP-TO-DATE   AVAILABLE   AGE
  bootcamp   0/1     1            0           15s
```

---

### Deployment templates

Each deployment defines **template** that lists what resources are going to be running in the deployment. The one we just created has a Docker image.

```sh
$ kubectl describe deployments/bootcamp

  Name:              bootcamp
  ...
  Replicas:          1 desired | 1 total | 1 available
  ...
  Pod Template:
    Containers:
     bootcamp:
       Image:        gcr.io/google-samples/kubernetes-bootcamp:v1
       ...
```

<!-- $ kubectl describe deployment bootcamp # same -->

---

### Pods

Deployments will create **pods**. Think of a pod as a virtual machine, each with their own internal IP. Our deployment created one pod with the IP of 172.18.0.2.

```sh
$ kubectl get pods -o wide

  NAME                        READY   STATUS    AGE     IP           NODE
  bootcamp-5b48cfdcbd-crkm8   1/1     Running   4m29s   172.18.0.2   minikube
```

A pod is a mini-machine that runs a deployment's resources. In our case, it runs the Docker image specified in the deployment.

```sh
$ kubectl describe pod bootcamp-5b48cfdcbd-crkm8

  Image:          gcr.io/google-samples/bootcamp:v1
  Port:           8080/TCP
  State:          Running
  ...
```

---

### Getting inside pods

A pod is kind of a virtual machine that you can get inside of. You can run `kubectl exec` to run things inside it. Here, we'll run `bash` to get a shell inside a running pod.

```sh
$ kubectl exec -it bootcamp-5b48cfdcbd-crkm8 -- bash

  root@bootcamp-5b48cfdcbd-crkm8:/# ps aux

    USER       PID  TIME  COMMAND
    root         1  0:00  /bin/sh -c node server.js
    root         7  0:00  node server.js
    ...

  root@bootcamp-5b48cfdcbd-crkm8:/# curl 127.0.0.1:8080

    Hello Kubernetes bootcamp! | Running on: ...
```

> Docs: [Get shell in a running container](https://kubernetes.io/docs/tasks/debug-application-cluster/get-shell-running-container/)

---

## Exposing your app

### Load balancers

Pods aren't accessible by the outside world. For that, you'll need to create a **service** using `kubectl expose`. The service type we'll use is a `LoadBalancer` which exposes a public IP and routes it to multiple pods.

```sh
$ kubectl expose deployment/bootcamp \
  --type=LoadBalancer \
  --port=8080 \
  --target-port=9376 \
  --name=bootcamp-lb
```

The service we created exposes the guest's port `8080` to the world using a load balancer.

```sh
$ kubectl get service

  NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
  bootcamp-lb  LoadBalancer   10.96.119.98   <pending>     8080:30694/TCP   4m48s
```

---

### External IP's

If you're doing this in minikube, you'll get an external IP that `<pending>`. In a cloud provider (eg, AWS, Google or Azure), this will create a load balancer for that provider, and you'll get a proper external address (eg, `bootcamp-lb.us-west-2.elb.amazonaws.com`).

```sh
$ kubectl describe service/bootcamp-lb

    Name:                   bootcamp-lb
    IP:                     10.67.252.103
    LoadBalancer Ingress:   192.0.2.89
    Port:                   <unnamed> 80/TCP
    NodePort:               <unnamed> 32445/TCP
```

If you're using minikube, you can use `minikube service <name>` to emulate this functionality. You'll get a URL that you can access.

```sh
$ minikube service bootcamp-lb

  |-----------|----------|-------------|-----------------------------|
  | NAMESPACE |   NAME   | TARGET PORT |             URL             |
  |-----------|----------|-------------|-----------------------------|
  | default   | bootcamp |             | http://192.168.99.100:30694 |
  |-----------|----------|-------------|-----------------------------|
```

> Docs: [Creating a load balancer](https://kubernetes.io/docs/tasks/access-application-cluster/create-external-load-balancer/)

---

## Scaling your app

Our deployment runs in one pod by default. You can use `kubectl get` or `kubectl describe` to verify this.

```sh
$ kubectl get pods

  NAME                        READY   STATUS    RESTARTS   AGE
  bootcamp-75bccb7d87-5xhkz   1/1     Running   0          18s
```

Use `kubectl scale` to increase number of pods.

```sh
$ kubectl scale deployments/bootcamp --replicas=4

  deployments.extensions/bootcamp staled
```

This should increase the number of running pods.

```sh
$ kubectl get pods

  NAME                        READY   STATUS    RESTARTS   AGE
  bootcamp-75bccb7d87-5xhkz   1/1     Running   0          18s
  bootcamp-75bccb7d87-6pbcj   1/1     Running   0          18s
  bootcamp-75bccb7d87-b4z65   1/1     Running   0          18s
  bootcamp-75bccb7d87-p7fhz   1/1     Running   0          3m15s
```

---

## Updating your app

Using `kubectl set image` will initiate a rolling update on a _deployment_.

```sh
$ kubectl set image deployments/bootcamp bootcamp=jocatalin/kubernetes-bootcamp:v2

  deployment.extensions/bootcamp image updated
```

```sh
$ kubectl rollout status deployments/bootcamp

  deployment "bootcamp" successfully rolled out
```

---

## Configuration files

### Yaml format

Kubernetes resources can be defined as YAML files. For example, instead of doing `kubectl create deployment` to create deployments, you can create them as a YAML file:

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  minReadySeconds: 5
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.7.9
          ports:
            - containerPort: 80
```

### Creating YAML files

You don't always need to create these files by hand. After creating with `kubectl create`, you can export them into YAML files.

```sh
$ kubectl get \
  deployment/nginx-deployment \
  -o yaml --export \
  > nginx-deployment.yml
```

## Making changes

### Applying files

You can "apply" config files. This will create the resources in them, or update them if they already exist.

```sh
kubectl apply -f nginx-deployment.yml
```

You can also apply multiple files in a directory.

```sh
kubectl apply -f <directory>/
```

---

### Testing config changes

If you update config files, use _diff_ to check for changes before applying them. If there are any changes, they will be printed out.

```sh
$ kubectl diff -f nginx-deployment.yml

  -  PortNumber: 8080
  +  PortNumber: 8081
```

---

### Deleting resources

You can delete resources described in a config file.

```sh
kubectl delete -f nginx-deployment.yml
```

---

## Resources

### Everything is a resource

In this document, we often refer to resources in the syntax of `deployment/nginx-deployment`. They can be written in other notations too. All of these below are the same.

```sh
$ kubectl delete deployment/nginx-deployment
$ kubectl delete deployment nginx-deployment
$ kubectl delete deploy nginx-deployment
```

We deployed an app using `kubectl create`. This command is used to create resources just like deployments. Just about everything in Kubernetes is a resource.

```sh
$ kubectl create <resource> <name>
$ kubectl delete <resource>
$ kubectl get <resource>
$ kubectl describe <resource>
```

```sh
$ kubectl create deployment ...
$ kubectl create service ...
$ kubectl create cronjob ...
$ kubectl create job ...
```

---

### Resources in YAML files

Most commands that take resources can be substituted with YAML files. These two commands below are the same, assuming your `nginx-deployment.yml` has a `kind: deployment` resource in it.

```sh
$ kubectl expose deployment/nginx-deployment ...
$ kubectl expose -f nginx-deployment.yml ...
```
