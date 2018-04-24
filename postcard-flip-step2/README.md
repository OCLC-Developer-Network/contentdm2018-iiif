# Step 1 : Setting up our project
We will take advantage of the Express application generator in order to quickly scaffold an application skeleton but first we need to install it.  We can do so by executing the following command:
```
$ npm install express-generator -g
```
Now that we have that installed let's generate our skeleton.  Express application generator supports several view template frameworks but we'll use Handlebars for it's simplicity and similarity to straight HTML.  We do that by specifying our view template as `hbs`
```
$ express --view=hbs postcard-flip
```
That was simple! Let's install the dependencies now.
```
$ cd postcard-flip
$ npm install
```
Finally we can start our application skeleton by running the following command
```
npm start
```
