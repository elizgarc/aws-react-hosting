import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserContext from './context';
import { CardBootstrap } from './context';

export default function CreateAccount() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName]   = React.useState('');
  const [email, setEmail]         = React.useState('');
  const [password, setPassword]   = React.useState('');
  const [validated, setValidated] = React.useState(false);
  const [canSubmit, setCanSubmit] = React.useState(false);
  const ctx = React.useContext(UserContext);
  const [success, setSuccess] = React.useState(false);
  const handleCloseSuccess = () => {
    clearForm();
    setSuccess(false);
  }

  React.useEffect(() => {
    let formInfo = [firstName, lastName, email, password];
    let formFilled = formInfo.every((item) => { return item.length >= 1 });
    if(formFilled) setCanSubmit(true);
    if(canSubmit && !formFilled) setCanSubmit(false);
  }, [firstName, lastName, email, password, canSubmit]);

  function validate(field, label) {
    if (!field) {
      return false;
    }

    if (
      label === 'first name' && 
      !document.getElementById('formControlInputFirstName').checkValidity()
    ) {
      return false;
    }

    if (
      label === 'last name' &&
      !document.getElementById('formControlInputLastName').checkValidity()
    ) {
      return false;
    }

    if (
      label === 'email' &&
      !document.getElementById('formControlInputEmail').checkValidity()
    ) {
  
      return false;
    }
    if (
      label === 'password' &&
      !document.getElementById('formControlInputPassword').checkValidity()
    ) {
      return false;
    }

    return true;
  }


  function handleCreate(e) {
    e.preventDefault();
    e.stopPropagation();
    // setValidated turns on bootstrap form :invalid styling
    setValidated(true);
    console.log(`validating: ${firstName} ${lastName}, email: ${email}, password: ${password}`);
    if (!validate(firstName,  'first name'))  return;
    console.log(              `firstName validated: ${firstName}`);
    if (!validate(lastName,   'last name'))   return;
    console.log(              `lastName validated: ${lastName}`);
    if (!validate(email,      'email'))       return;
    console.log(              `email validated: ${email}`);
    if (!validate(password,   'password'))    return;
    console.log(              `password validated: ${password}`);
    ctx.users.push({firstName, lastName, email, password, balance:100});
    setSuccess(true);
  }

  function clearForm() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setValidated(false);
  }

  return (
    <div>

      <CardBootstrap 
        maxWidth="30rem"
        bgcolor="light"
        headerColor='light'
        headerBgColor='light'
        headerText='Create Account'
        
        body={(
          <form className={validated ? "was-validated" : "needs-validation"} 
            noValidate onSubmit={handleCreate} data-testid="form">
            {/* First and Last Name Row */}
            <div className="form-group row">
              <div className="col-6">
                <label htmlFor="formControlInputFirstName" className="form-label">First Name</label>
                <input type="input" className="form-control" id="formControlInputFirstName"
                  placeholder="Enter First Name" value={firstName} required minLength="2"
                  onChange={e => setFirstName(e.currentTarget.value)} 
                />
                <div id='first-name-invalid' className="invalid-feedback">First Name must be 2 or more letters.</div>
              </div>
              <div className="col-6">
                <label htmlFor="formControlInputLastName" className="form-label">Last Name</label>
                <input type="input" className="form-control" id="formControlInputLastName"
                  placeholder="Enter Last Name" value={lastName} required minLength="2"
                  onChange={e => setLastName(e.currentTarget.value)} 
                />
                <div id='last-name-invalid' className="invalid-feedback">Last Name must be 2 or more letters.</div>
              </div>
            </div><br />

            {/* Email */}
            <div className="form-group">
              <label htmlFor="formControlInputEmail" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="formControlInputEmail"
                placeholder="Enter email" value={email} required 
                onChange={e => setEmail(e.currentTarget.value)}
              />
              <div id='email-invalid' className="invalid-feedback">Valid email address required.</div>
            </div>
            <br />

            {/* Password */}
            <div className="form-group">
              <label htmlFor="formControlInputPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="formControlInputPassword"
                placeholder="Enter password" value={password} required minLength="8"
                onChange={e => setPassword(e.currentTarget.value)}
              />
              <div id='password-invalid' className="invalid-feedback">Password must be 8 or more characters.</div>
            </div>
            <br />

            {/* Submit Button */}
            <button type="submit" disabled={!canSubmit} className="btn btn-primary">Create Account</button>
          </form>
        )}
      />

      {/* Success Modal */}
      <Modal show={success} onHide={handleCloseSuccess} centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Created</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p className='lead'>Congratulations, <span className='fw-bold'>{firstName} {lastName}</span>!</p>
          <p className='lead'>Your account was successfully created. Please enjoy a <span className='fw-bold'>$100&nbsp;sign&nbsp;up&nbsp;bonus</span>!</p>
          <p className='lead'>Would you like to create another account?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseSuccess}>Add another Account</Button>
          <Button variant='outline-secondary' onClick={handleCloseSuccess}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
