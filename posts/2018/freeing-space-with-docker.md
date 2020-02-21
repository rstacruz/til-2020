---
title: Freeing space with Docker
date: 2019-01-29
tags: [Development]
layout: ismple
---

You can use `docker system prune` to remove unused Docker artifacts.

```bash
# Remove containers, images, etc not used
# in the last 240 hours
docker system prune --filter --until=240h
```

```bash
# Remove unused volumes
docker volume prune
```

## How does it work?

### Deleting old things

Delete unused things using `docker system prune --filter until=240h`. This will remove old containers, images, cache files and networks.

```
$ docker system prune --filter until=240h

  WARNING! This will remove:
          - all stopped containers
          - all networks not used by at least one container
          - all dangling images
          - all dangling build cache
          - Elements to be pruned will be filtered with:
          - label={"until":{"240h":true}}
  Are you sure you want to continue? [y/N] y

  Deleted Images:
  deleted: sha256:8799b139678a109a9c3e34e6e14d222a781b5dc10ec57e9f3270aab7ab873bce
  deleted: sha256:28aba4f5dbd168981da679fc70c388c3c40f1919521652dfc4854f3d5cd992f3
  deleted: sha256:1c90d90cbeacaa6176b7ea0ac93c07441e75ddbaa25a05696736fc3c18387f3d
  deleted: sha256:5c61153197a71fa5f230895d13510c9bc2e486ecfddd92b210d16d80827da766
  deleted: sha256:0f50ceabe764c2e2835bb86bc8c62e41ca554975f775291cd62f0eab5d9c87a0
  deleted: sha256:08f48b0f1516c9f92ecd3fbe638969302efeb7076f857d6b7ac85566d3eda51d
  deleted: sha256:be1a87a5b74fd86f118cb68450acffd70bad442d5f41854a641405286b8ded96

  Total reclaimed space: 197.1MB
```

### Delete unused volumes

Now that you've deleted some containers, you may want to delete their associated volumes as well with `docker volume prune`.

```
$ docker volume prune

  WARNING! This will remove all local volumes not used by at least one container.
  Are you sure you want to continue? [y/N] y

  Deleted Volumes:
  flipstack_node_modules
  flipstack_pgdata
  ticketbase_build
  ticketbase_db
  ...

  Total reclaimed space: 970.6MB
```
