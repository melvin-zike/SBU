
 import React from "react";
 
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

    const InformationTable = ({onAdd}) => {
        return (
          <>
          <table style={style.table} className='informationTable'>
              <thead> 
                <tr>
                  <th style={style.tableCell}>First name</th>
                  <th style={style.tableCell}>Last name</th>
                  <th style={style.tableCell}>Phone</th>
                </tr>
              </thead>
          {onAdd.map((item) => {
             const { id, firstName, lastName, phone } = item
             return(
              
              <tbody key={id}>
                <tr >
                <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{phone}</td>
                  <td>{<h1>X</h1>}</td>
                </tr>
                  
               </tbody>             
            )             
          })}

          </table>
          </>
          
        );
      
}

export default InformationTable;