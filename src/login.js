import React from 'react';
import { Button, Card, FloatingLabel, Form, FormControl, FormGroup, InputGroup, Modal } from 'react-bootstrap';
import UserContext, { CardBootstrap} from './context';

export default function Login() {
  const [validated, setValidated] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const handleCloseError = () => setError(false);
  const [success, setSuccess] = React.useState(false);
  const handleCloseSuccess = () => setSuccess(false);
  const ctx = React.useContext(UserContext);
  const user = ctx.users.find(item => item.loggedIn === true);
  const userIndex = ctx.users.findIndex(item => item.loggedIn === true);


  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    const registered = ctx.users.find(item => item.email === email);
    if (registered) {
      const registeredIndex = ctx.users.findIndex(item => item.email === email);
    
      if (password === registered.password) {
      
        ctx.users[userIndex].loggedIn = false;
     
        ctx.users[registeredIndex].loggedIn = true;
      
        setSuccess(true);
      
        setEmail('');
        setPassword('');
        setValidated(false);
        return
      }
    }

    setError(true);
    setEmail('');
    setPassword('');
    setValidated(false);
  };

  return (
    <>
      <CardBootstrap 
        maxWidth='25rem'
        bgcolor="light"
        headerText='Login'
        body={(
          <>
          {/* {userIndex === 0 ? (
            <>
            <p>Welcome, you are using <span className='fw-bold'>{user.firstName}&nbsp;{user.lastName}'s</span> account.</p> 
            <p>You may continue using his account for free.<br />Or log in to another.</p>
            </>
          ) : (
            <> */}
              <p className='lead'>Welcome, <span className='fw-bold'>{user.firstName}&nbsp;{user.lastName}</span>!</p>
            {/* </>
          )} */}
          <hr />
          <Card.Title>Change Account</Card.Title>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <FormGroup controlId='loginEmail' className='my-3'>
              <FloatingLabel label="Email">
                <Form.Control type='email' placeholder='email@email.com' value={email} onChange={e => setEmail(e.currentTarget.value)} required />
                <Form.Control.Feedback type='invalid'>Email required</Form.Control.Feedback>
              </FloatingLabel>
            </FormGroup>

            <FormGroup controlId='loginPassword' className='my-3'>
              <FloatingLabel label="Password">
                <Form.Control type='password' placeholder='password' value={password} onChange={e => setPassword(e.currentTarget.value)} required />
              <Form.Control.Feedback type='invalid'>Password required</Form.Control.Feedback>
              </FloatingLabel>
            </FormGroup>

            <Button type='submit'>Log In</Button>
          </Form>
          </>
        )}
      />

      {/* Success Modal */}
      <Modal show={success} onHide={handleCloseSuccess} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p className='lead'>You are now logged in as:</p>
          <p className='lead fw-bold'>{user.firstName}&nbsp;{user.lastName}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleCloseSuccess}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={error} onHide={handleCloseError} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p className='lead'>Email/Password not found.</p>
          <p className='lead'>Please try again.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-secondary' onClick={handleCloseError}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
