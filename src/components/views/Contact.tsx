import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Contact: React.FC = () =>  {
  return (
    <>
      <Col md="6" lg="4" className="mx-auto">
        <h3 className="text-center text-color py-5">Je laisse un &apos;ti mot...</h3>
        <Form>
          <Form.Group className="my-3">
          <Form.Control
            name="name"
            type="text"
            placeholder="* Nom"
          />
          </Form.Group>

          <Form.Group className="my-3">
          <Form.Control
            name="email"
            type="email"
            placeholder="* adresse@email.com"
          />
          <Form.Text className="text-muted">
            Nous ne partagerons pas votre email.
          </Form.Text>
          </Form.Group>

          <Form.Group className="my-3">
          <Form.Control
            name="message"
            as="textarea"
            rows={5}
            cols={50}
            placeholder="* Votre message... (250 caractères)"
          />
          </Form.Group>

          <Button className="my-4" variant="primary" block>
            J&apos;envoie
          </Button>
          <Button className="my-4" variant="secondary" block>
            Je réinitialise
          </Button>
        </Form>
      </Col>
    </>
  )
}

export default Contact