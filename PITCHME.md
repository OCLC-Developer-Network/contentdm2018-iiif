@title[Introduction]
## CONTENTdm and IIIF
#### Welcome to the 2018 CONTENTdm IIIF Workshop
---
@title[Introduction Redux]
## A little about me!
@fa[arrow-down]
+++
@title[Dave Collins]
## Dave Collins
#### Consulting Software Engineer, OCLC
#### collinsd@oclc.org

---

@title[CONTENTdm and Timelines]
## You have a story to tell!
One of the more popular requested customizations is a timeline using your CONTENTdm data.

+++

@title[Overview]
## An overview
@ul[squares]
- Prepare the content
- Identify a set of items
- Build a custom page container
- Include some "helper" scripts
- Put it all together
@ulend

---

@title[Grooming Your Content]
## It starts with metadata
Your record descriptions will drive this timeline.

+++

@title[Some Field Notes]
## You'll need a few fields
@ul[squares]
- @color[yellow](Title) Consider the length.  
- @color[yellow](Date) Useful for sorting. It will be prominent.  
- @color[yellow](Caption) "**Description**" or custom caption.  
- @color[yellow](Attribution) Rights statement to display.  
@ulend

+++

@title[Ordering the Sneaky Way]
## Force the slide order
Create a @color[yellow](**Timeline Sequence**) field to have complete control over the sequence.

+++

@title[Thank you, Destination Indiana]
## Special thanks to Indiana Historical Society
We used content from their **Destination Indiana** portal for this demo and they have a wealth of fantastic, contextualized content. See <https://www.destination-indiana.com>.

---

@title[CONTENTdm and IIIF]
## We need Collection manifests
... there is a gap currently that we will address with the help of Javascript, IIIF and CONTENTdm APIs today

<http://iiif.io/api/presentation/2.0/#collections>

---

@title[Some Groundwork]
## First we need to lay down a foundation

@fa[arrow-down]

+++
@title[A timeline on a custom page]
## A timeline on a custom page
CONTENTdm has given site authors the ability to add custom pages.  That's where we want to add our timeline for this demo.  We'll name the file timeline.html and follow the CONTENTdm custom page file format.

<https://help.oclc.org/Metadata_Services/CONTENTdm/Advanced_website_customization/Custom_pages>

@fa[arrow-down]

+++
@title[Source: timeline.html]
#### Source: timeline.html
```
– – –
header: false
footer: false
title: Timeline Demo
– – –

<div id='timeline-embed' style="width: 100%; height: 600px"></div>
<style>
    body {
        background: white;
    }
    .CoreLayout-mainWrapperContainer {
        margin-top: 0px;
    }
</style>
```
@[1-5](Custom pages start with a YAML-like header)
@[8-15](We then add a little CSS to remove some artifacts)
@[7](Finally we create a placeholder for our timeline.)

---
@title[Some more groundwork]
## More groundwork
Our next piece will be a custom script that will be loaded in the &lt;head&gt; of our CONTENTdm site from the Custom Scripts option in the WCT global menu.  We'll name ours iiifbootstrap.js

@fa[arrow-down]

+++?code=iiif-timeline/step1/iiifbootstrap.js&lang=javascript&title=Source: Custom JS

@[1-18](A script loader that will inject our JS into the HTML header)
@[20,26](Then we add our CONTENTdm javascript lifecycle event listener)
@[21,25](We only want this code to run on our timeline page!)
@[22-24](For convenience we'll inject the axios library for HTTP requests)

Note:
- One of the limitations of custom scripts in the WCT is that we only allow one script to be loaded.  We want to load many scripts though which is why we've created this ScriptLoader
- The axios library works on IE11 whereas fetch() does not

---
@title[Creating the IIIF collection manifest]
## Creating the collection manifest
Now that we have a blank slate to work from and a helpful Javascript HTTP client loaded we can start writing the code to create the IIIF Collection Manifest

@fa[arrow-down]

+++?code=iiif-timeline/step2/iiifbootstrap.js&lang=javascript&title=Source: Collection Manifest

@[23-33](We create a function to make the JSON object that will be the base of our collection manifest)
@[35-41](Next we make a small function that will be used to make each of the member JSON objects which will be added to the member array)
@[31](The member array is in our collection manifest JSON object)
@[44,51-53](Make an HTTP call to our [CONTENTdm dmQuery API](https://www.oclc.org/support/services/contentdm/help/customizing-website-help/other-customizations/contentdm-api-reference/dmquery.en.html) to get our items.  This returns a Promise)
@[45,51-53](We call the ".then()" method on the Promise. This will execute when the HTTP call is complete)
@[45-46,51-53](Call our previously created function to make our base collection manifest JSON object)
@[45-47,49,51-53](Loop through each of the item records that are returned from our [CONTENTdm dmQuery API](https://www.oclc.org/support/services/contentdm/help/customizing-website-help/other-customizations/contentdm-api-reference/dmquery.en.html))
@[45-49,51-53](Call the createMember method on each record and add it to the manifest member array)

+++
@title[Demo]
## Demo
---
@title[Promises]
## Javascript Promises

> The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
>
> – MDN Web Docs

@fa[arrow-down]

+++?code=iiif-timeline/step3/iiifbootstrap.js&lang=javascript?&title=Source: Promises

@[58](Declare an array where we'll be storing our eventual promises)
@[58-59,61](We need to loop through our IIIF collection manifest members that we've created)
@[60](Push each axios call return into our array of promises.  Each axios call will perform a GET on a collection manifest item URL)

+++
@title[All the promises]
![All the promises](https://i.imgflip.com/2egvk6.jpg)
###### @size[0.5em](image from *Hyperbole and a Half* by Allie Brosh)

@fa[arrow-down]

+++?code=iiif-timeline/step3/iiifbootstrap.js&lang=javascript&title=Source: All the promises
@[63,67](Axios allows us to call ".all" on our array of promises and only after ALL of them are complete will it enter the ".then()" block)
@[63-67](Each axios GET call is placed in a separate response in the results array which we can loop through one at a time.)

---
@title[Finally a timeline]
## Finally a timeline
Our hard work is paying off now.  We just have a few more things to do in order to get our timeline embedded into our custom page.  We'll use the fantastic TimelineJS from https://timeline.knightlab.com

![Knightlab](iiif-timeline/images/knightlab-dark.png)

+++?code=iiif-timeline/step4/iiifbootstrap.js&lang=javascript&title=Source: TimelineJS
@[95](First thing's first.  We need to add one more ScriptLoader to pull in the TimelineJS library)
@[96-100](We also want to inject the TimelineJS CSS file into the <head> of our document)
@[114-118,125](We create a TimelineJS JSON object with a title slide and an empty events array)
@[58-73](Let's create a function to convert an item manifest into a TimelineJS event)
@[62](In this method we see a call to another helper function I created to update the a IIIF image URL)
@[75-89](It's a simple function that takes as input a URL, the part of the URL we want to change, and the new value)
@[58-73](Going back to our function that converts a item manifest into a TimelineJS event there is mention of another unfamiliar method)
@[66,69-70](It's this getMetadata function, let's see what that's about)
@[47-56](It will loop through a IIIF Item manifest and find the metadata we're interested in and return it)
@[114,120-121,123,125](Here we will use convertToEvent to convert each IIIF manifest into a single timeline event)
@[114,120-123,125](Then we push each event into our TimelineJS JSON event array)
@[124](Success is ours! We can call our TimelineJS code snippit and pass in our carefully constructed Timeline JS JSON object)

+++
@title[Demo]
## Demo
