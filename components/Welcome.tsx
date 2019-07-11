import { NextFunctionComponent } from 'next';
import { Field } from 'formik';
import { FormGroup, Label, Row, Col } from 'reactstrap';
import { dateFormats, startSunday, timeFormats, timezones } from '../lib/forms';
import React from 'react';
import * as Yup from 'yup';
import Wizard from './Wizard';
import GoogleMapsPlaceLookup from './GoogleMapsPlaceLookup';
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';

const createSchoolSchema = Yup.object().shape({
    schoolName: Yup.string()
        .min(7, 'Too Short!')
        .max(50, 'Too Long!')
        .required('School name is required!'),
    location: Yup.string().required('School location is required'),
});

const Welcome: NextFunctionComponent = () => (
    <Wizard
        initialValues={{
            schoolName: '',
            location: '',
            timezone: 'Africa/Lagos',
            weekStarts: 'no',
            dateFormat: 'DD/MM/YYYY',
            timeFormat: '12H',
        }}
        validationSchema={createSchoolSchema}
        onSubmit={(values, { setSubmitting }) => {
            console.log(values);
        }}
    >
        <Wizard.Page>
            {props => (
                <>
                    <FormGroup>
                        <Field
                            label="School Name"
                            name="schoolName"
                            type="text"
                            component={CustomInput}
                            placeholder="Your school name"
                            autoComplete="on"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            label="Location"
                            name="location"
                            component={GoogleMapsPlaceLookup}
                            placeholder="Your school location"
                            autoComplete="on"
                        />
                    </FormGroup>
                </>
            )}
        </Wizard.Page>
        <Wizard.Page>
            {props => (
                <>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label>Time Zone</Label>
                                <Field
                                    // className="custom-select"
                                    name="timezone"
                                    options={timezones}
                                    component={CustomSelect}
                                    placeholder="Select your timezone..."
                                    isMulti={false}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label>Calendar</Label>
                                <Field
                                    // className="custom-select"
                                    name="weekStarts"
                                    options={startSunday}
                                    component={CustomSelect}
                                    placeholder="When does the week start..."
                                    isMulti={false}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label>Date Format</Label>
                                <Field
                                    // className="custom-select"
                                    name="dateFormat"
                                    options={dateFormats}
                                    component={CustomSelect}
                                    placeholder="Preferred date format..."
                                    isMulti={false}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={6}>
                            <FormGroup>
                                <Label>Time Format</Label>
                                <Field
                                    // className="custom-select"
                                    name="timeFormat"
                                    options={timeFormats}
                                    component={CustomSelect}
                                    placeholder="Preferred time format..."
                                    isMulti={false}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </>
            )}
        </Wizard.Page>
    </Wizard>
);

export default Welcome;
