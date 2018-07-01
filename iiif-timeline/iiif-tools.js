function updateIIIFImageUrl(iiifUrl, part, newValue) {
    let url = new URL(iiifUrl);
    let urlParts = url.pathname.split('/');
    if (part === 'region') {
        urlParts[urlParts.length - 4] = newValue;
    } else if (part === 'size') {
        urlParts[urlParts.length - 3] = newValue;
    } else if (part === 'rotation') {
        urlParts[urlParts.length - 2] = newValue;
    } else if (part === 'filename') {
        urlParts[urlParts.length - 1] = newValue;
    }
    url.pathname = urlParts.join('/');
    return url.href;
}