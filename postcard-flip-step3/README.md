# Step 3 : Making it our own with IIIF
---
We could easily use static images with this project but IIIF definitely allows us a lot more control of the final product with a better user experience for all browsers.

If you are unaware, OCLC selects several of our customer's collections to be highlighted in our featured collections.  In October 2017 we highlighted the Whitaker Postcard Collection from the Daviess County Public Library 

https://www.oclc.org/en/news/announcements/2017/contentdm-featured-collections-October2017.html  

The OCLC Developer Network has all the information we need to fill in the blanks for the postcard image we've selected.

https://www.oclc.org/developer/news/2017/image-open-access.en.html

We'll simply add in an `<img>` tag for the front image selecting from the below values

| url piece | value |
|---|---|
|collectionAlias | p17056col3 |
|item ID | 186 |
|region | full|
|size | full |
|rotation | 0 |
|quality | default|
|format | jpg|

Editing our `/views/index.hbs` file we replace the text "A" with the front IIIF `<img>` tag
```
    <div class="front">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/186/full/full/0/default.jpg" />
    </div>
```
and do the same for the back image (changing the item ID to use the back image id instead of the front)

Editing our `/views/index.hbs` file we replace the text "B" with the back IIIF `<img>` tag
```
    <div class="back">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/187/full/full/0/default.jpg" />
    </div>
```

As I mentioned earlier, we could have accomplished this with static images and it would have been fine.  However, if we inspect our image the front image at full size is ~340KB and our back image is ~235KB.  Together that's well over 0.5MB which is just needlessly large.  Not only does it take longer to download, it would use up data for our mobile users.  We want to be friendlier than that.

Using the "size" attribute of IIIF we're going to try to only grab the size we need.  Let's make an educated guess and reduce the size by 75%
```
    <div class="front">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/186/full/pct:25/0/default.jpg" />
    </div>
    <div class="back">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/187/full/pct:25/0/default.jpg" />
    </div>
```

Wow! That's much friendlier.  The front image size is ~29KB and the back image is ~27KB.  Our users will thank us!  Oh, but you know what?  Our UX designer went to all the trouble of giving us a nicely rounded div and the image is hiding the corners.  With our new found IIIF powers we can try to make our UX designer happy as well.
```
    <div class="front">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/186/full/pct:20/0/default.jpg" />
    </div>
    <div class="back">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/187/full/pct:20/0/default.jpg" />
    </div>
```
That does look better but it seems the image is a little small on the postcard and we're sticklers for details so we'll split the difference at 22%
```
    <div class="front">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/186/full/pct:22/0/default.jpg" />
    </div>
    <div class="back">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/187/full/pct:22/0/default.jpg" />
    </div>
```

### Success!!!

That was a little bit of trial and error when we really could have used IIIF and simple math to get us the exact size we needed in one shot.  If we analyze our style.css we can see that the style for our `.card-container` is 400x250
```
    width: 400px;
    height: 250px;
```
We also know that our UX designer has styled a 10px radius on our `.card`
```
    border-radius: 10px;
```
To avoid covering up our nice rounded corners we'll subtract 10px from each side of our postcard (20px total from the width and the height). Again using IIIF we can say the exact size we want in pixels
```
    <div class="front">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/186/full/380,230/0/default.jpg" />
    </div>
    <div class="back">
      <img src="https://dcpl.contentdm.oclc.org/digital/iiif/p17056coll3/187/full/380,230/0/default.jpg" />
    </div>
```

We have now made both our UX Designer happy and our users will love the final result since we're not needlessly gobbling up their data.
