# Step 1 : Adapting an open source postcard flip to a custom CONTENTdm Page
One of the most important rules of software development is to never reinvent the wheel.  I've found a very nice starting point for our postcard flip on Codepen
```
https://codepen.io/hellomp/pen/ZvrmdN (forked here for posterity https://codepen.io/cmhdave73/pen/vjgrzq)
```
The first part we want to copy is the HTML block into a new YAML custom page we'll call `postcard.html`.  You can copy the entire contents of the HTML box in Codepen and make it the contents of `postcard.html` below the YAML instructions.

Next is to create a file called `style.css` and place the content in the CSS box from the CodePen in this file.

CodePen does allow some boilerplate code inclusions which we want to duplicate in our project.  The first part is including reset.css into our `postcard.html` file seen below pasted above our style.css.  This needs to be the first `<link>` tag in our file.

```
    <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'>
    <link rel='stylesheet' href='style.css' />
```
Second is adding in a Google font used by default in CodePen seen here pasted below our style.css file
```
    <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'>
    <link rel='stylesheet' href='style.css' />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700">
```

Last is the Javascript portion of the postcard flip.  We'll create a file called `flip.js`.  Copy the contents of the CodePen javascript box into `flip.js`

Finally we will include our flip.js file and the anime.js library in our `postcard.html` file.
```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.js"></script>
    <script src="flip.js"></script>
  </body>
```

