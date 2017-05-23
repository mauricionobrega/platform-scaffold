```js
// JS import
import CountrySelect from '../components/country-select'
```

## Example Usage

This component must be rendered inside a ReduxForm.reduxForm component
for correct connection to the store.

    const ReduxForm = require('redux-form');
    const Redux = require('redux');
    const ReactRedux = require('react-redux');
    const React = require('react');

    // Redux setup
    const reducers = {
        form: ReduxForm.reducer,
    };
    const reducer = Redux.combineReducers(reducers);
    const store = Redux.createStore(reducer);

    const countries = [
        {id: 'us', label: 'United States'},
        {id: 'ca', label: 'Canada'}
    ]

    // The form
    const DemoForm = (props) => {
        const { handleSubmit } = props
        return (
            <div>
                <h3>Order Info</h3>
                <form onSubmit={handleSubmit}>
                    <FieldRow>
                        <CountrySelect countries={countries} />
                    </FieldRow>
                </form>
            </div>
        );
    }

    let StateDisplay = (props) => {
        return (
            <div>
                <h3>Form data</h3>
                <pre>
                    {JSON.stringify(props.values, null, '  ')}
                </pre>
            </div>
        )
    }

    StateDisplay = ReactRedux.connect((state)=>{return {values: state.form.country.values}})(StateDisplay)

    const DecoratedForm = ReduxForm.reduxForm({
        form: 'country', // a unique name for this form
    })(DemoForm);


    <ReactRedux.Provider store={store}>
        <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
            <div style={{flex: "1 0 auto"}}>
                <DecoratedForm />
            </div>
            <div style={{flex: "1 0 auto"}}>
                <StateDisplay />
            </div>
        </div>
    </ReactRedux.Provider>
