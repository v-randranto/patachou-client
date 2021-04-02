import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'

// TODO text color of title

const ErrorNotification = ({config}) => {
    const { color, title, text } = config;
    const [show, setShow] = useState(true);
    const colorStyle = {
        color: color
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            animation={false}
            centered={true}
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title style={colorStyle}>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{text}</p>
            </Modal.Body>
        </Modal>
    );
};

export default ErrorNotification;
