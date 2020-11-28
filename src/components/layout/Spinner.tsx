import React from 'react'
import BsSpinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

const Spinner: React.FC = () => {
    return (
        <Button variant="dark" className="mx-auto" disabled>
        <BsSpinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>
    )
}

export default Spinner