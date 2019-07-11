import { NextFunctionComponent } from 'next';
import React from 'react';

interface Props {
    text?: string;
}
const LoadingState: NextFunctionComponent<Props> = ({ text }: Props) => (
    <section
        className="space-sm d-flex justify-content-center align-items-center vh-100
        bg-auth bg-auth-img border-top border-top-2 border-primary"
    >
        <div className="container">
            <div className="row mb-5 justify-content-center">
                <div className="loading-spin">
                    <img alt="Our Logo" className="img-fluid" src="/static/favicon/apple-icon-76x76.png" />
                </div>
            </div>
            <div className="row mb-5 justify-content-center">
                <div className="rainbow-spin">
                    <div className="bounce1" />
                    <div className="bounce2" />
                    <div className="bounce3" />
                    <div className="bounce4" />
                </div>
            </div>
            {text ? (
                <div className="row justify-content-center">
                    <div className="col text-center">
                        <p className="lead">{text}</p>
                    </div>
                </div>
            ) : null}
        </div>
    </section>
);

export default LoadingState;
