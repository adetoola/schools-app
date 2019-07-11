import React from 'react';
import Link from 'next/link';
import { NextFunctionComponent } from 'next';

interface Props {
    email: string;
}

const VerifyEmail: NextFunctionComponent<Props> = ({ email }: Props) => {
    const futherHelpForGMailUsers = (gmail: string): string => {
        if (/gmail/.test(gmail)) {
            return 'Still can\'t find it? Try searching Gmail for "in:all subject:(Confirm your account on Schools)"';
        }
        return 'Sometimes it takes a bit longer, be patient! Double-check your spam and trash folders!';
    };

    return (
        <section
            className="space-sm d-flex justify-content-center align-items-center vh-100
        bg-auth bg-auth-img border-top border-top-2 border-primary"
        >
            <div className="container">
                <div className="row mb-5 justify-content-center">
                    <img alt="Our Logo" className="img-fluid" src="./static/favicon/apple-icon-76x76.png" />
                </div>
                <div className="row mb-5 justify-content-center">
                    <div className="col-md-7 col-lg-5 text-center">
                        <div className="account-content">
                            <h2>Almost there …</h2>
                            <span className="lead text-muted">
                                Please check your email ({email}) <br /> to confirm your account.
                            </span>

                            <hr />
                            <div className="row justify-content-center">
                                <div className="col col-md-10">
                                    <p>
                                        If <strong>{email}</strong> is not your email address, please{' '}
                                        <Link href="signup">
                                            <a className="text-secondary">go back</a>
                                        </Link>{' '}
                                        and enter the correct one.
                                    </p>

                                    <p>
                                        If you haven&rsquo;t received our email in 15 minutes, please check your spam
                                        folder.
                                    </p>

                                    <p>{futherHelpForGMailUsers(email)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmail;
