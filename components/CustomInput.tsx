import { FieldProps } from 'formik';
import { NextFunctionComponent } from 'next';
import React from 'react';
import { FormFeedback, FormText, Input, Label } from 'reactstrap';

const CustomInput: NextFunctionComponent<
    FieldProps<any> & {
        label?: string;
        className?: string;
        text?: string;
        type?: string;
        field: object;
        form: object;
    }
> = ({ field, form: { touched, errors }, ...props }) => (
    <>
        {props.label ? <Label for={`${field.name}`}>{props.label}</Label> : null}
        <Input
            {...field}
            {...props}
            className={props.className ? `form-control ${props.className}` : 'form-control'}
            id={`${field.name}`}
            type={props.type || 'text'}
            valid={touched[field.name] && !errors[field.name]}
            invalid={(errors[field.name] && touched[field.name]) || false}
        />
        {props.text ? <FormText color="muted">{props.text}</FormText> : null}
        {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
    </>
);

export default CustomInput;
