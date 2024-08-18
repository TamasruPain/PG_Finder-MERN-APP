import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

import {
    MDBFooter,
    MDBContainer,
    MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter className='bg-dark text-center text-white'>
            <MDBContainer className='p-3'>
                <section className='mb-2'>

                    <MDBBtn outline color="light" floating className='mx-2' href='https://www.linkedin.com/in/tamasru-pain-bb4408224/' role='button' target='_blank'>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='mx-2' href='https://github.com/TamasruPain' role='button' target='_blank'>
                        <FontAwesomeIcon icon={faGithub} />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='mx-2' href='https://www.instagram.com/tamasru_pain/' role='button' target='_blank'>
                        <FontAwesomeIcon icon={faInstagram} />
                    </MDBBtn>

                    <MDBBtn outline color="light" floating className='mx-2' href='https://www.facebook.com/trigger.pain.7/' role='button' target='_blank'>
                        <FontAwesomeIcon icon={faFacebook} />
                    </MDBBtn>

                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 Copyright:
                <a className='text-white' href='https://www.linkedin.com/in/tamasru-pain-bb4408224/' target='_blank'>
                    Tamasru Pain
                </a>
            </div>
        </MDBFooter>
    )
}

export default Footer
