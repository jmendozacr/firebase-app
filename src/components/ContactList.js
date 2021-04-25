import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import db from '../firebase/firebaseConfig';
import Contact from './Contact';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        db.collection("users").onSnapshot((snapshot) => {
            setContacts(snapshot.docs.map(document => {
                return {...document.data(), id: document.id}
            }));
        })
    
    }, []);

    return (
        contacts.length > 0 &&
        <Container>
            {contacts.map(item => (
                <Contact 
                    key={item.id} 
                    id={item.id} 
                    name={item.name} 
                    email={item.email}
                />
            ))}
        </Container>
    );
}

const Container = styled.div`
    margin-top: 40px;
`;

export default ContactList;
