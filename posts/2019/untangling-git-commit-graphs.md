---
title: Untangling git commit graphs
date: 2019-03-24
tags: [Git]
---

<figure>
<img src='images/tig-commit-graph.gif'>
</figure>

Everyone's ran into [Guitar Hero]-like git graphs. These are usually made by tools that can't make the graphs readable enough. There's a way to make them easier to read!

[Tig] is a fantastic tool for visualizing Git trees in the command line. Press `shift-g` to switch the commit graph to _v1_, which simplifies the graph. The example above shows the same fragment of Git history, but changing how it's visualized will make it apparent that it's simply a few PR's being merged en masse.

## Try it out yoruself

Try Tig out in your package manager! For MacOS, it's available as `brew install tig`. For Linux, it's available in most distro's repositories.

[guitar hero]: https://twitter.com/henryhoffman/status/694184106440200192?lang=en
[tig]: https://github.com/jonas/tig
