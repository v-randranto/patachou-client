import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

// TODO text color of title

const Notification = ({ config, emailHasFailed, onClose }) => {
    const [show, setShow] = useState(true);
    const { type, color, title, text, text2 } = config;
    const colorStyle = {
        color: color,
    };
    let bodyText = text;
    if (type === 'REGISTER' && text2) {
        bodyText = emailHasFailed ? text2 : text;
    }

    return (
        <Modal
            show={show}
            onHide={() => {
                setShow(false);
                onClose();
            }}
            backdrop="static"
            keyboard={false}
            animation={false}
            centered={true}
        >
            <Modal.Header closeButton>
                <Modal.Title style={colorStyle}>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{bodyText}</Modal.Body>
        </Modal>
    );
};

export default Notification;
