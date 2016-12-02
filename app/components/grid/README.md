```js
// JS, importing the local component
import Grid from 'components/grid'

// SCSS, importing the local component styles to app/styles/_components.scss
@import '../components/grid/base';
```


## Example Usage

The `Grid` component by itself doesn't do a whole lot because it's just a
container for children that you must customize with grid styles in a template
stylesheet using [Susy mixins](http://susydocs.oddbird.net/en/latest/toolkit/).
The `Grid` container component is actually used to offset the outer most grid
children's excess padding.

The main thing to understand is that the children of `Grid` are set span a
certain number of columns in the grid via Sass mixins from the Susy library. See
the example SCSS further below.

    <Grid className="t-example-template">
        <div className="t-example-template__promo">
            <strong>Full Content:</strong>
        </div>

        <div className="t-example-template__main ">
            <strong>Main Content:</strong>
        </div>

        <div className="t-example-template__aux c">
            <strong>Auxiliary Content:</strong>
        </div>
    </Grid>

The above example sub-template classes are styled in the following manner:

```scss
@include susy-breakpoint($mobile-breakpoint, $mobile-layout) {
    // Less than 420px viewport width
    .t-example-template__promo,
    .t-example-template__main,
    .t-example-template__aux {
        @include span(4);
        @include first();
        @include last();
    }
}

@include susy-breakpoint($tablet-breakpoint, $tablet-layout) {
    // Less than 1024px viewport width
    .t-example-template__promo,
    .t-example-template__main,
    .t-example-template__aux {
        @include span(6);
        @include pre(1);
        @include post(1);
        @include last();
    }
}

@include susy-breakpoint($desktop-breakpoint, $desktop-layout) {
    // Over 1024px viewport width
    .t-example-template__promo {
        @include span(6);
        @include pre(3);
        @include post(3);
        @include last();
    }

    .t-example-template__main {
        @include span(7);
    }

    .t-example-template__aux {
        @include span(5);
        @include last();
    }
}
```
