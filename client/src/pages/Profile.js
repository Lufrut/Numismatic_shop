import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import ChangePassword from "../components/modals/ChangePassword";
import DeleteAccount from "../components/modals/DeleteAccount";

const Profile = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setPasswordVisible(true)}
            >
                Изменить пароль
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setDeleteVisible(true)}
            >
                Удалить аккаунт
            </Button>
            <ChangePassword show={passwordVisible} onHide={() => setPasswordVisible(false)}/>
            <DeleteAccount show={deleteVisible} onHide={() => setDeleteVisible(false)}/>

        </Container>
    );
};

export default Profile;
