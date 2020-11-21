/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useState, useContext} from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { AuthContext } from '../../contexts/AuthContext'
import { IAuth } from '../../models/auth'
import { FixLater } from '../../models/types'
import { Account, IProfile, IPhoto } from '../../models/account'

import { ADD_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../../constants/events'
import { REGISTER, ERROR_NOTE } from '../../constants/modalConfig'
import { FORMAT_RULES } from '../../constants/formRules'
import BsSpinner from '../layout/Spinner'

import Notification from '../modals/Notification'
import ErrorNotification from '../modals/ErrorNotification'

const acceptFileExtensions = FORMAT_RULES.fileExtensions.join(',')

const Register: FC = () => {
    const [pseudo, setPseudo] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [presentation, setPresentation] = useState<string>('')
    const [photoFile, setPhotoFile] = useState<IPhoto>()
    const [photoIsInvalid, setPhotoIsInvalid] = useState<boolean>(false)
    const [showStepOne, setShowStepOne] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [failure, setFailure] = useState<boolean>(false)

    const history = useHistory()
    const { auth }: { auth: IAuth } = useContext<FixLater>(AuthContext)
    if (auth.data) {
        return <Redirect to="/profile" />
    }

    const onFileSelect = (files) => {
        console.log('> onFileSelect')
        setPhotoIsInvalid(false)
        const reader = new FileReader()

        if (files && files.length) {
            const fileExtension = files[0].name.split('.').pop().toLowerCase()
            if (!acceptFileExtensions.includes(fileExtension)) {
                setPhotoIsInvalid(true)
                return
            }

            if (files[0].size > FORMAT_RULES.fileLimit) {
                setPhotoIsInvalid(true)
                return
            }

            const file = files[0]
            reader.readAsDataURL(file)
            reader.onload = () => {
                const photo: IPhoto = {
                    name: files[0].name,
                    contentType: files[0].type,
                    content: reader.result,
                }
               setPhotoFile(photo)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSaving(true)

        const profile: IProfile = {
            pseudo,
            password,
            email,
            presentation
        }

        if (!photoIsInvalid && photoFile) {
            profile.photo = photoFile;
        }

        const account = new Account(profile)
        account.emit(ADD_ACCOUNT)
        account.on(ACTION_DONE, () => {
            setSuccess(true)
            setSaving(false)
        });
        account.on(ACTION_FAILED, () => {
            setFailure(true)
            setSaving(false)
        })
    }

    const onCloseNotificationModal = () => {
        history.push('/login')
    }

    return (
        <>
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Je m&apos;inscris...</h3>

                <Form onSubmit={handleSubmit}>
                    {showStepOne && (
                        <div className="step-one">
                            <Form.Group className="my-3">
                                <Form.Control
                                    type="text"
                                    placeholder="* pseudo"
                                    required
                                    value={pseudo}
                                    onChange={(e) => {
                                        setPseudo(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    cols={50}
                                    placeholder="* Votre présentation... (140 caractères)"
                                    value={presentation}
                                    onChange={(e) => {
                                        setPresentation(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <input
                                    type="file"
                                    placeholder="* Charger une photo"
                                    accept={acceptFileExtensions}
                                    onChange={e => {
                                        onFileSelect(e.target.files);
                                    }}
                                />
                            </Form.Group>

                            <Button
                                className="my-4"
                                variant="dark text-white"
                                block
                                onClick={() => {
                                    setShowStepOne(false);
                                }}
                            >
                                Suivant
                            </Button>
                        </div>
                    )}

                    {!showStepOne && (
                        <div className="step-two">
                            <Form.Group className="my-3">
                                <Form.Control
                                    type="password"
                                    placeholder="* Mot de passe"
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Control
                                    type="password"
                                    placeholder="* Confirmation du mot de passe"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Control
                                    type="email"
                                    placeholder="* adresse@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <Form.Text className="text-muted">Nous ne partagerons pas votre email.</Form.Text>
                            </Form.Group>

                            {!saving && (
                                <>
                                    <Button
                                        className="my-4"
                                        variant="dark text-white"
                                        block
                                        onClick={() => {
                                            setShowStepOne(true);
                                        }}
                                    >
                                        précédent
                                    </Button>
                                    <Button type="submit" className="my-4" variant="primary" block>
                                        C&apos;est parti, chaud devant!
                                    </Button>

                                    <Button variant="info" href="/login" block>
                                        J&apos;ai déjà un compte
                                    </Button>
                                </>
                            )}

                            {saving && <BsSpinner />}
                        </div>
                    )}
                </Form>

                {success && <Notification config={REGISTER} onClose={onCloseNotificationModal} />}

                {failure && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </>
    );
};

export default Register;