# Step 2 : Adapting an open source postcard flip
One of the most important rules of software development is to not reinvent the wheel.  I've found a very nice starting point for our postcard flip on Codepen
```
https://codepen.io/hellomp/pen/ZvrmdN (forked here for posterity https://codepen.io/cmhdave73/pen/vjgrzq)
```
The first part we want to copy is the HTML block into our `/views/index.hbs` file.  You can copy the entire contents of the HTML box and replace the contents of index.hbs

Next is replacing the contents of our `/public/stylesheets/style.css` with the content in the CSS box from the CodePen.

CodePen does allow some boilerplate code inclusions which we want to duplicate in our project.  The first part is including reset.css into our `/views/layout.hbs` file seen below pasted above our style.css.  This needs to be the first `<link>` tag in our file.

```
    <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'>
    <link rel='stylesheet' href='/stylesheets/style.css' />
```
Second is adding in a Google font used by default in CodePen seen here pasted below our style.css file
```
    <link rel='stylesheet prefetch' href='https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css'>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700" rel="stylesheet">
```

Last is the Javascript portion of the postcard flip.  We'll create a file called `flip.js` in `/public/javascripts`.  Copy the contents of the CodePen javascript box into `/public/javascripts/flip.js`

Finally we will include our flip.js file and the anime.js library in our `/views/layout.hbs` file.
```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.js"></script>
    <script src="/javascripts/flip.js"></script>
  </body>
```

