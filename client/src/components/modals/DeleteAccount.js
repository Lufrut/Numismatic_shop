import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {deletes} from "../../http/userAPI";

const CreateType = ({show, onHide}) => {
    const [value, setValue] = useState('')

    const addType = () => {
        deletes({value}).then(data => {
            setValue('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление аккаунта
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="outline-success" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-danger" onClick={addType}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;
