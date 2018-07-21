@title[Introduction]
## CONTENTdm and IIIF
#### Welcome to the 2018 CONTENTdm IIIF Workshop
---
@title[Introduction Redux]
## A little about us!
@fa[arrow-down]
+++
@title[Dave Collins]
## Dave Collins
#### Consulting Software Engineer, OCLC
#### collinsd@oclc.org
@fa[arrow-down]
+++
@title[Shane Huddleston]
## Shane Huddleston
#### CONTENTdm Product Manager
#### huddless@oclc.org
@fa[arrow-down]
+++
@title[Jeff Mixter]
## Jeff Mixter
#### OCLC Researcher
#### mixterj@oclc.rog
---
@title[CONTENTdm and Timelines]
## You have a story to tell!
One of the more popular requested features for customization is implementing a timeline using your CONTENTdm data.
---
@title[CONTENTdm and IIIF]
## CONTENTdm introduces IIIF Support
Within the past year the CONTENTdm team has been excited to bring every hosted CONTENTdm site IIIF functionality "baked in"
---
@title[CONTENTdm and IIIF]
## CONTENTdm Collection Manifests
But there is a gap currently that we will address with the help of Javascript, IIIF and CONTENTdm APIs
---
@title[Some Groundwork]
## First we need to lay down a foundation

@fa[arrow-down]

+++
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

+++?code=iiif-timeline/step1/iiifbootstrap.js&lang=javascript&title=Source: Custom JS

@[1-18](A script loader that will inject our JS into the HTML header)
@[20,26](Then we add our CONTENTdm javascript lifecycle event listener)
@[21,25](We only want this code to run on our timeline page!)
@[22-24](For convenience we'll inject the axios library for HTTP requests)

---
@title[Creating the IIIF collection manifest]
## Creating the collection manifest
Now that we have a blank slate to work from and a helpful Javascript HTTP client loaded we can start writing the code to create the IIIF Collection Manifest

+++?code=iiif-timeline/step2/iiifbootstrap.js&lang=javascript&title=Source: Collection Manifest

@[23-33](We create a function to make the JSON object that will be the base of our collection manifest)
@[35-41](Next we make a small function that will be used to make each of the member JSON objects which will be added to the member array)
@[31](The member array is in our collection manifest JSON object)
@[44,50](Make an HTTP call to our CONTENTdm dmQuery API to get our items.  This returns a Promise)
@[45,50](We call the ".then()" method on the Promise. This will execute when the HTTP call is complete)
@[46](Call our previously created function to make our base collection manifest JSON object)
@[47,49](Loop through each of the item records that are returned from our CONTENTdm dmQuery API)
@[47-49](Call the createMember method on each record and add it to the manifest member array)

