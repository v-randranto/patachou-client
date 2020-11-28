import React, {useState} from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

const Contact: React.FC = () =>  {
  
  const [message, setMessage] = useState('')
  
  return (
    <div className="home">
      <Col md="6" lg="4" className="mx-auto">
        <h3 className="text-center text-color pt-5">Un &apos;ti mot à Patachou</h3>
        <Form>
          <Form.Group className="my-4">
          <Form.Control
            name="message"
            as="textarea"
            rows={5}
            cols={50}
            maxLength={250}
            placeholder="mon message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <small> {250 - message.length} caractères disponibles </small>
          </Form.Group>

          <Button className="my-4" variant="send" block>
            {submitIcon}  J&apos;envoie
          </Button>
          <Button className="my-4" variant="secondary" block>
            Je réinitialise
          </Button>
        </Form>
      </Col>
      </div>
  )
}

export default Contact