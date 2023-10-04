import React, { useState, useEffect as transition } from "react";
import { TextInput, FormButton } from "../components/formComponents";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const api = 'http://localhost:8001';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nom', width: 130 },
    { field: 'desc', headerName: 'Description', width: 130 },
    { field: 'freezbe', headerName: 'Modèle', width: 130 },
    { field: 'stages', headerName: 'Etapes', width: 130 },
    { field: 'test', headerName: 'Tests', width: 130 },

]

let rows = [];


const Component = () => {
    function handleSubmit(event) {
        event.preventDefault();
        // this part will be used as a data submission logic

        console.log(formValues);
        axios.post(`${api}/addrecipe`, { token: `${JSON.parse(localStorage.getItem("token")).token}`, data: formValues })
        resetFormValues();
    }

    function handleModify(event) {
        event.preventDefault();
        // this part will be used as a data submission logic

        //debug purpose
        axios.post(`${api}/modifyrecipe`, { token: `${JSON.parse(localStorage.getItem("token")).token}`, data: formValues })
        resetFormValues();
    }

    function handleDelete(event) {
        event.preventDefault();
        // this part will be used as a data submission logic

        axios.post(`${api}/deleterecipe`, { token: `${JSON.parse(localStorage.getItem("token")).token}`, data: formValues })
        resetFormValues();
    }

    function resetFormValues() {
        formValues.id = '';
        formValues.name = '';
        formValues.desc = '';
        formValues.freezbeModel = '';
        formValues.stages = '';
        formValues.test = '';
    }

    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        desc: '',
        freezbeModel: '',
        stages: '',
        test: ''
    });
    const [state, setState] = useState('');

    // asynchronous function used to fetch data from the api
    transition(() => {
        setState('loading');

        axios.get(`${api}/getrecipes?token=${JSON.parse(localStorage.getItem("token")).token}`)
            .then((res) => {
                setState('success');
                rows = res.data.recordset;
                console.log(rows);
            })
            .catch(() => {
                setState('error');
            });
    }, []);

    // if api request error show error message
    if (state === 'error') {
        return (
            <h1>
                Une erreur est survenue, veuillez nous excuser du dérangement occasioné
            </h1>
        );
    }

    return (
        <div className="modelInteractions">
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                gridRowId={(row) => row.id}
            />

            <h1>Ajoutez un procédé</h1>
            <form onSubmit={handleSubmit}>
                <TextInput type="text" placeholder='Nom' defaultValue={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                <TextInput type="text" placeholder='Description' defaultValue={formValues.desc} onChange={(e) => setFormValues({ ...formValues, desc: e.target.value })} />
                <TextInput type="text" placeholder='Modèle Freezbe' defaultValue={formValues.freezbeModel} onChange={(e) => setFormValues({ ...formValues, freezbeModel: e.target.value })} />
                <TextInput type="number" placeholder='Etapes' defaultValue={formValues.stages} onChange={(e) => setFormValues({ ...formValues, stages: e.target.value })} />
                <TextInput type="text" placeholder='Test' defaultValue={formValues.desc} onChange={(e) => setFormValues({ ...formValues, test: e.target.value })} />
                <FormButton
                    className="add"
                    value="Envoyer"
                    type="submit"
                    onClick={() => { }}
                />
            </form>

            <h1>Modifiez un procédé</h1>
            <form onSubmit={handleModify}>
                <TextInput type="number" placeholder='ID' defaultValue={formValues.id} onChange={(e) => setFormValues({ ...formValues, id: e.target.value })} />
                <TextInput type="text" placeholder='Nom' defaultValue={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                <TextInput type="text" placeholder='Description' defaultValue={formValues.desc} onChange={(e) => setFormValues({ ...formValues, desc: e.target.value })} />
                <TextInput type="text" placeholder='Modèle Freezbe' defaultValue={formValues.freezbeModel} onChange={(e) => setFormValues({ ...formValues, freezbeModel: e.target.value })} />
                <TextInput type="number" placeholder='Etapes' defaultValue={formValues.stages} onChange={(e) => setFormValues({ ...formValues, stages: e.target.value })} />
                <TextInput type="text" placeholder='Test' defaultValue={formValues.desc} onChange={(e) => setFormValues({ ...formValues, test: e.target.value })} />
                <FormButton
                    className="modify"
                    value="modifier"
                    type="submit"
                    onClick={() => { }}
                />
            </form>

            <h1>Supprimez un procédé</h1>
            <form onSubmit={handleDelete}>
                <TextInput type="number" placeholder='ID' defaultValue={formValues.id} onChange={(e) => setFormValues({ ...formValues, id: e.target.value })} />
                <FormButton
                    className="delete"
                    value="Supprimer"
                    type="submit"
                    onClick={() => { }}
                />
            </form>

        </div>
    )
}

export default Component;
