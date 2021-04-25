import React, {useState} from 'react';
import styled from 'styled-components';
import db from './../firebase/firebaseConfig';

const Contact = ({ id, name, email }) => {
    const [editing, setEditing] = useState(false);
    const [updateName, setUpdateName] = useState(name);
    const [updateEmail, setUpdateEmail] = useState(email);

    const updateContact = (e) => {
        e.preventDefault();

        db.collection('users').doc(id).update({
            name: updateName,
            email: updateEmail
        }).
        then(() => {
            console.log("User updated.");
        })
        .catch((error) => {
            console.log("Error updating document:", Error);
        });

        setEditing(false);
    }

    const deleteContact = (userId) => {
        db.collection('users').doc(userId).delete().
        then(() => {
            console.log("The user was deleted.");
        })
        .catch((error) => {
            console.log("Error deleting document:", Error);
        });
    }

    return (
        <Container>
            {
                editing ? 
                <form onSubmit={updateContact} action="">
                    <Input
                        type="text"
                        name="name"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)} 
                        placeholder="name"  
                    />
                    <Input
                        type="text"
                        name="email"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)} 
                        placeholder="email"  
                    />
                    <Button type="submit">Update</Button>
                </form>
                :
                <>
                    <Name>{name}</Name>
                    <Email>{email}</Email>
                    <Button onClick={() => setEditing(!editing)}>Edit</Button>
                    <Button onClick={() => deleteContact(id)}>Delete</Button>
                </>
            }
        </Container>
    );
}

const Container = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,.2);
`;

const Name = styled.p`
    font-weight: bold;
`;
 
const Email = styled.p`
    font-style: italic;
    color: #6B6B6B;
    margin: 5px 0;
`;
 
const Button = styled.button`
    padding: 5px 20px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 0px 2px;
    margin-bottom: 10px;
    transition: .3s ease all;
    outline: none;
    background: #C4C4C4;
    color: #fff;
    font-size: 12px;
 
    &:hover {
        background: #3D76E9;
    }
`;
 
const Input = styled.input`
    padding: 10px;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    width: 100%;
    margin-bottom: 10px;
    transition: .2s ease all;
    outline: none;
    text-align: center;
    
    &:focus {
        border: 2px solid #3D76E9;
    }
`;

export default Contact;
