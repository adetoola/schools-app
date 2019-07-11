import { FieldProps } from 'formik';
import { NextFunctionComponent } from 'next';
import Link from 'next/link';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { Col, FormFeedback, FormText, Input, Label, Row } from 'reactstrap';

const CustomPasswordInput: NextFunctionComponent<
    FieldProps<any> & {
        label?: string;
        className?: string;
        text?: string;
        type?: string;
        haslink?: boolean;
    }
> = ({ field, form: { touched, errors }, ...props }) => {
    const [masked, setMasked] = useState(true);
    const togglePasswordMask = () => setMasked(!masked);

    return (
        <>
            {props.haslink ? (
                <Row>
                    <Col>
                        <Label for={`${field.name}`}>{props.label}</Label>
                    </Col>
                    <Col className="col-auto">
                        <Link href="reset-password">
                            <a className="form-text small text-muted">Forgot password?</a>
                        </Link>
                    </Col>
                </Row>
            ) : (
                <Label for={`${field.name}`}>{props.label}</Label>
            )}
            <div className="input-group input-group-merge">
                <Input
                    {...field}
                    {...props}
                    id={`${field.name}`}
                    type={masked ? 'password' : 'text'}
                    className={
                        props.className
                            ? `form-control form-control-appended ${props.className}`
                            : 'form-control form-control-appended'
                    }
                    valid={touched[field.name] && !errors[field.name]}
                    invalid={(errors[field.name] && touched[field.name]) || false}
                />
                <div className="input-group-append">
                    <span className="input-group-text">
                        {masked ? (
                            <Eye size={16} className="fe fe-eye" onClick={togglePasswordMask} />
                        ) : (
                            <EyeOff size={16} className="fe fe-eye" onClick={togglePasswordMask} />
                        )}
                    </span>
                </div>
            </div>
            {props.text ? <FormText color="muted">{props.text}</FormText> : null}
            {touched[field.name] && errors[field.name] && <FormFeedback>{errors[field.name]}</FormFeedback>}
        </>
    );
};

export default CustomPasswordInput;
