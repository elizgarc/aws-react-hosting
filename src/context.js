import React, { useContext, useState, useEffect } from 'react';
import { Button, Card, Form, FormControl, InputGroup, Dropdown, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserContext = React.createContext(null);
export default UserContext;


export function CardBootstrap(props) {
  function classes() {
    const bg        = props.bgcolor;
    const txt       = props.txtcolor;
    const bsMargin  = props.bsMargin;
    const classNm   = props.className;

    let classes = 'mt-5';
    if (bg)       classes += ` bg-${bg}`;
    if (txt)      classes += ` text-${txt}`;
    if (bsMargin) classes += ` m-${bsMargin}`;
    if (classNm)  classes += ` ${classNm}`;
    return classes;
  }
  
  function styles() {
    const width = props.width;
    const maxWidth = props.maxWidth;
    const minWidth = props.minWidth;
    const padding = props.padding;

    let styles = {};
    if (width)    styles = {...styles, width};
    if (maxWidth) styles = {...styles, maxWidth};
    if (minWidth) styles = {...styles, minWidth};
    if (padding)  styles = {...styles, padding};
    return styles;
  }

  return (
    <Card className={classes()} style={styles()}>
      {props.headerText && <Card.Header as="h4"
        className={props.headerBgColor ? 'bg-' + props.headerBgColor : ''}>{props.headerText}
      </Card.Header>}
      <Card.Body>
        {props.title && <Card.Title as="h5">{props.title}</Card.Title>}
        {props.text && <Card.Text>{props.text}</Card.Text>}
        {props.body}
        {props.status && <div id='createStatus' className="text-danger">{props.status}</div>}
        {/* {props.status && <Button variant='primary'>Go somewhere</Button>} */}
        {props.footer && <Card.Footer>{props.footer}</Card.Footer>}
      </Card.Body>
    </Card>
  );
}

export function BankTransactionForm(props) {
  const ctx       = useContext(UserContext);
  const user      = ctx.users.find(user => user.loggedIn === true);
  const userIndex = (ctx.users.findIndex(user => user.loggedIn === true));
  const [amount, setAmount]       = useState('');
  const [submit, setSubmit]       = useState(false);
  const [validated, setValidated] = useState(false);
  const [message, setMessage]     = useState('Please enter a valid dollar amount.');
  const [showConf, setShowConf]   = useState(false);
  const [success, setSuccess]     = useState(false);
  const handleCloseConf = () => {
    setAmount('');
    setValidated(false);
    setShowConf(false);
  };
  const handleCloseSuccess        = () => setSuccess(false);
  const type = props.type;

  useEffect(() => {
    
    if (amount) setSubmit(true);
  
  }, [amount]); 
  
  useEffect(() => {
    if (amount <= 0) setMessage('Please enter an amount greater than 0.');
    if (amount == '') setMessage('Please enter a valid dollar amount.');
    if (amount > 0) setMessage('Please enter a valid dollar amount.');
    if (type === 'withdraw' && amount > user.balance) {
      setMessage('Overdraft error. Insufficient funds for this transaction.');
    }
    if (amount > 1000000) setMessage('Amount too large for this service. Please contact local bank branch.');
  }, [amount, type, user]);


  if (!(type === 'deposit' | type === 'withdraw')) return;

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);
   
    if (!document.getElementById(type + 'Input').checkValidity()) return;
    setShowConf(true);
  }
  
  const handleConfirm = () => {
    handleCloseConf();

    let transaction = amount;
    transaction = Number(transaction);

    if (type === 'deposit') {
  
      ctx.users[userIndex].balance = Number(Number(ctx.users[userIndex].balance + transaction).toFixed(2));
    }
    if (type === 'withdraw') {
   
      if (transaction > ctx.users[userIndex].balance) {
    
        return;
      }
      ctx.users[userIndex].balance = Number(Number(ctx.users[userIndex].balance - transaction).toFixed(2));
    }
    addTransactionHistory(transaction);
    

    setSuccess(true);
    setValidated(false);
    setAmount('');
  }

  const addTransactionHistory = (transaction) => {
    const timestamp = new Date().toLocaleTimeString();
    if (ctx.users[userIndex].transactionHistory) {
      ctx.users[userIndex].transactionHistory.unshift({type: type, amount: transaction, time: timestamp, runningBalance: ctx.users[userIndex].balance});
    } else {
      ctx.users[userIndex].transactionHistory = [{type: type, amount: transaction, time: timestamp, runningBalance: ctx.users[userIndex].balance}];
    }
  }

  const handleChange = (e) => {
    setAmount(e.currentTarget.value);
  }

  return (
    <>
    <Form className={validated ? "was-validated" : "needs-validation"}
      noValidate onSubmit={handleSubmit}>

      {/* Account Info */}
      <InputGroup className='my-3 mb-0'>
        <InputGroup.Text className='col-4'>Account</InputGroup.Text>
        <Button variant='outline-secondary' className='col-8 text-dark' disabled>{user.firstName} {user.lastName}</Button>
        {/* <Dropdown drop='up' align="end">
          <Dropdown.Toggle variant='outline-secondary' className='col-1 fs-4 p-0' />
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/login/">Change Account</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </InputGroup>

      {/* Current Balance Info */}
      <InputGroup size="lg" className='my-3 mb-4'>
        <InputGroup.Text className='col-4'>Balance</InputGroup.Text>
        <Button variant='outline-secondary' 
          className='col-8' 
          style={{
            color: 'black',
            opacity: '1',
            borderColor: 'rgba(0, 0, 0, 0.3)'
          }} 
          disabled
        >{user.balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Button>
      </InputGroup>
      <hr className="text-secondary" style={{opacity: '10%'}} />

      {/* Transaction Area */}
      <InputGroup size="lg" className='my-3 has-validation'>
        <div className='text-muted mx-auto'>Only enter numbers and decimal: 5000.00</div>
        <InputGroup.Text className='col-4'>{type === 'deposit' ? 'Deposit' : 'Withdraw'}:</InputGroup.Text>
        <FormControl type='number' id={type === 'deposit' ? 'depositInput' : 'withdrawInput'} className='input-money' required
          max={type === 'deposit' ? 1000000 : user.balance} min={0.01} step={0.01} 
          value={amount} onChange={handleChange}
        ></FormControl>
        <div id='amountInvalidFeedback' className='invalid-feedback'>{message}</div>
      </InputGroup>
      <Button size='lg' variant='primary' 
        className='col-12' type='submit' disabled={!submit}
      >Submit {type === 'deposit' ? 'Deposit' : 'Withdrawal'}</Button>
    </Form>

    {/* Confirmation Modal */}
    <Modal show={showConf} onHide={handleCloseConf} centered>
      <Modal.Header>
        <Modal.Title>Transaction Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <p className='lead'>{type === 'deposit' ? 'Deposit' : 'Withdraw'} <span className='fw-bold'>{Number(amount).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</span> {type === 'deposit' ? 'to' : 'from'} {user.firstName}&nbsp;{user.lastName}'s account?</p>
          <Button variant='primary' size='lg' className='m-2 mx-4'
          onClick={handleConfirm}>Yes, {type === 'deposit' ? 'deposit' : 'withdraw'}</Button>
          <Button variant='secondary' size='lg' className='m-2 mx-4'
          onClick={handleCloseConf}>No, cancel</Button>
      </Modal.Body>
    </Modal>

    {/* Success Modal */}
    <Modal show={success} onHide={handleCloseSuccess} centered>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-center'>
        <p className='lead'>Your {type === 'deposit' ? 'deposit' : 'withdrawal'} is complete.</p>
        <InputGroup size="lg" className='my-3 mb-4'>
          <InputGroup.Text className='col-6'>New account balance</InputGroup.Text>
          <Button variant='outline-dark' className='col-6 px-5' disabled
          >{user.balance.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</Button>
      </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-secondary' onClick={handleCloseSuccess}>Close</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}
