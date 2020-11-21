/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import CSS from 'csstype';
import { ModalConfig } from '../../types/modals'

// TODO text color of title

type NotifProps = { 
    config: ModalConfig,
    onClose: any
}

const Notification: FC<NotifProps> = ({config, onClose}: NotifProps) => {
    const [show, setShow] = useState(true)
    const {color, title, text} = config 
    const colorStyle: CSS.Properties = {
        color: color
    }
    
    return (
        <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        animation={true}
        centered={true}
        onExited={onClose}
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

export default Notification;
