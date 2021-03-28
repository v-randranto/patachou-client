/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import CSS from 'csstype';
import { ModalConfig } from '../../types/modals';

// TODO text color of title

type NotifProps = {
    config: ModalConfig;
    emailHasFailed?: boolean;
    onClose: any;
};

const Notification: FC<NotifProps> = ({ config, emailHasFailed, onClose }: NotifProps) => {
    const [show, setShow] = useState(true);
    const { type, color, title, text, text2 } = config;
    const colorStyle: CSS.Properties = {
        color: color,
    };
    let bodyText: string = text;
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
