```js
// JS, importing the local component
import LazyLoadImage from 'components/lazy-load-image'
```


## Example Usage

    <LazyLoadImage
        image={<Image src="http://vignette3.wikia.nocookie.net/brooklynnine-nine/images/f/fa/Andy-509.jpg/revision/latest?cb=20130516221328" />}
        placeholder="Some placeholder"
    />

## Threshold usage: # of pixel out of viewport before loading images

    <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <LazyLoadImage
            image={<Image src="http://vignette3.wikia.nocookie.net/brooklynnine-nine/images/f/fa/Andy-509.jpg/revision/latest?cb=20130516221328" />}
            placeholder="Some placeholder"
            threshold={200}
        />
    </div>
