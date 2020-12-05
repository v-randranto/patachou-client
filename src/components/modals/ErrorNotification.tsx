import React, { FC, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import CSS from 'csstype';
import { ModalConfig } from '../../types/modals'


// TODO text color of title

type ErrorProps = { 
    config: ModalConfig,
}

const ErrorNotification: FC<ErrorProps> = ({config}:ErrorProps) => {
    const { color, title, text } = config;
    const [show, setShow] = useState(true);
    const colorStyle: CSS.Properties = {
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
