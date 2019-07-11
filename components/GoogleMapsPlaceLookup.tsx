/* global google */
import { NextComponentClass } from 'next';
import React, { Component } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Script from 'react-load-script';
import { googleMapsKey } from '../lib/config';
import { Label, FormText, FormFeedback } from 'reactstrap';

interface Props {
    isValid: boolean;
    isInvalid: boolean;
    onChange: any;
    onBlur: any;
    field: object;
    form: object;
}

class GoogleMapsPlaceLookup extends Component<NextComponentClass & Props> {
    public props: Props;
    public state = {
        allowNew: false,
        isLoading: false,
        multiple: false,
        options: [],
    };

    public resetComponent = () => this.setState({ isLoading: false, options: [] });
    public handleScriptLoad() {
        // Initialize Google Autocomplete
        console.log('Google Maps Place loaded!!!');
    }

    public handleSearch = query => {
        this.setState({ isLoading: true });
        if (query.length === 0) {
            return this.resetComponent();
        }

        /*global google*/
        const autocompleteService = new google.maps.places.AutocompleteService();
        autocompleteService.getPlacePredictions({ input: query }, this.handleAutocompleteResult);
        this.setState({ isLoading: false });
    };

    public handleAutocompleteResult = (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
                isLoading: false,
                options: predictions.map(prediction => ({
                    id: prediction.id,
                    mainText: prediction.structured_formatting.main_text,
                    secondaryText: prediction.structured_formatting.secondary_text,
                    description: prediction.description,
                })),
            });
        }
    };

    public render() {
        const {
            field,
            form,
            form: { touched, errors, handleChange },
        }: Props = this.props;
        return (
            <>
                <Script
                    url={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`}
                    onLoad={this.handleScriptLoad}
                />
                <Label for={`${field.name}`}>{this.props.label}</Label>
                <AsyncTypeahead
                    id={`${field.name}`}
                    {...field}
                    {...this.props}
                    {...this.state}
                    valid={touched[field.name] && !errors[field.name]}
                    invalid={(errors[field.name] && touched[field.name]) || false}
                    isValid={touched[field.name] && !errors[field.name]}
                    isInvalid={(errors[field.name] && touched[field.name]) || false}
                    labelKey="description"
                    minLength={3}
                    placeholder="Search for the place location..."
                    onBlur={() => form.setFieldTouched('location')}
                    onChange={selected => form.setFieldValue('location', selected[0])}
                    onSearch={this.handleSearch}
                    renderMenuItemChildren={option => <div>{option.description}</div>}
                />
                {this.props.text ? <FormText color="muted">{this.props.text}</FormText> : null}
                {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
            </>
        );
    }
}

export default GoogleMapsPlaceLookup;
