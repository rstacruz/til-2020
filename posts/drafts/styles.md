---
title: Sample styles for blog posts and stuff
---

The Metamorphosis (German: Die Verwandlung) is a novella written by Franz Kafka which was first published in 1915. One of Kafka's best-known works, The Metamorphosis tells the story of salesman Gregor Samsa who wakes one morning to find himself inexplicably transformed into a huge insect and subsequently struggling to adjust to this new condition.

## Variations

<figure>

| Class           |                                                            For |
| --------------- | -------------------------------------------------------------: |
| `.-wide`        | Everything. This is deprecated; things are wide by default now |
| `.-panorama`    |                                     Everything (esp. `figure`) |
| `.-no-pad`      |                                                         Figure |
| `.-transparent` |                                                         Figure |

</figure>

### For h3's

<figure>

| Class                    |  For |
| ------------------------ | ---: |
| `.-literate-style`       | h3's |
| `.-wider-literate-style` | h3's |

</figure>

## Random stuff

```js
function sampleCode() {
  const str = 'This is a string'
  return true
}
```

The novella has been widely discussed among literary critics, with differing interpretations being offered.

### Part 1

One day, Gregor Samsa, a traveling salesman, wakes up to find himself transformed into a giant insect (the most common translation of the German description ungeheures Ungeziefer, literally "monstrous vermin"). He reflects on how dreary life as a traveling salesman is. As he looks at the wall clock, he notices that he has overslept and missed his train for work. He ponders the consequences of this delay.

<figure class='-panorama'>
<img src='https://source.unsplash.com/NpZmRfdgNT8/1400x300' alt='Panoramic picture'>
</figure>

### Another part

Gregor becomes annoyed at how his boss never accepts excuses or explanations from any of his employees no matter how hard-working they are, displaying an apparent lack of trusting abilities. Gregor's mother knocks on the door, and he answers her. She is concerned for Gregor because he is late for work, which is unorthodox for him. Gregor answers his mother and realizes that his voice has changed, but his answer is short, so his mother does not notice. His sister, Grete, to whom he is very close, then whispers through the door and begs him to open it. He tries to get out of bed but is incapable of moving his body. While trying to move, he finds that his office manager, the chief clerk, has shown up to check on him. He finally rocks his body to the floor and calls out that he will open the door shortly.

-  o entu

## Figures

###

<!-- {.-literate-style} -->

<figure class='-no-pad'>
<img src='https://source.unsplash.com/NpZmRfdgNT8/600x600' alt='Display'>
</figure>

Getting fractional scaling right in Xorg is tricky, but possible. The solution
that works for me comes in 2 parts.

1. **Enlarge UI and text by 200%** &mdash; Use Xresources + GDK + QT env vars to
   scale everything by 200%. You can't adjust this without restarting apps. This
   200% shouldn't be changed; for fractional scaling, we will scale down the
   display instead in the next step.

2. **Scale your display down as needed** &mdash; Use xrandr to scale things down
   by 75%, or whatever ratio you like. This can be adjusted on the fly, and can
   be applied per-display.

In the example above, you'll have a 150% screen scale (200% &times; 75% = 150%).
