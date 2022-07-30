import React, { useState } from "react";

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [ userFirstname, setUserFirstName ] = useState('');
  const [ userLastname, setUserLastName ] = useState('');
  const [ userPhone, setUserPhone ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    addEntryToPhoneBook( userFirstname, userLastname, userPhone );


    setUserFirstName('')
    setUserLastName('')
    setUserPhone('')
  } 
  

    return (
      <form onSubmit={onSubmit} style={style.form.container}>
        <label>First name:</label>
        <br />
        <input 
          style={style.form.inputs}
          className='userFirstname'
          name='userFirstname' 
          type='text'
          value={userFirstname}
          onChange={(e) => setUserFirstName(e.target.value)}
        />
        <br/>
        <label>Last name:</label>
        <br />
        <input 
          style={style.form.inputs}
          className='userLastname'
          name='userLastname' 
          type='text' 
          value={userLastname}
          onChange={(e) => setUserLastName(e.target.value)}
        />
        <br />
        <label>Phone:</label>
        <br />
        <input
          style={style.form.inputs}
          className='userPhone' 
          name='userPhone' 
          type='text'
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
        />
        <br/>
        <input 
          style={style.form.submitBtn} 
          className='submitButton'
          type='submit' 
          value='Add User' 
        />
      </form>
    )
  }
export default PhoneBookForm;