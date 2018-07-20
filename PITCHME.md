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
---
header: false
footer: false
title: Timeline Demo
---

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

+++?code=iiif-timeline/step1/iiifbootstrap.js&lang=javascript&title=Source: Custom JS

@[1-18](A script loader that will inject our JS into the HTML header)
@[20,26](Then we add our CONTENTdm javascript lifecycle event listener)
@[21,25](We only want this code to run on our timeline page!)
@[22-24](For convenience we'll inject the axios library for HTTP requests)
