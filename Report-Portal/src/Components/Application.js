import { useState } from "react";
import PhoneBookForm from "./PhoneBookForm";
import InformationTable from "./InformationTable";
import Alert from "./Alert";

function Application() {
  const [list, setList ] = useState([]);
  const [alert, setAlert ] = useState({
    show: true,
    msg: "Hello from Nigeria"
  });

  const handleForm = ( userFirstname, userLastname, userPhone ) => {
    const newList = {
      id: new Date().getTime().toString(),
      firstName: userFirstname,
      lastName: userLastname,
      phone: userPhone 
    }

    setList([...list, newList]);
    
    
  }
 
    return (
      <section>
        
        <PhoneBookForm addEntryToPhoneBook={handleForm} />
        {alert.show && <Alert {...alert} />}
        <InformationTable onAdd={list}/>
      </section>
    );
  }

export default Application;