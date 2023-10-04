import React, { useState, useEffect as transition } from "react";
import { TextInput, FormButton } from "../components/formComponents";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'

const api = 'http://localhost:8001';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nom', width: 130 },
    { field: 'desc', headerName: 'Description', width: 130 },
    { field: 'price', headerName: 'pUHT', width: 130 },
    { field: 'type', headerName: 'Gamme', width: 130 },
    { field: 'component', headerName: 'Ingrédient', width: 130 },
    { field: 'weight', headerName: 'Grammage', width: 130 },
];

let rows = [];


const Model = () => {
    // handles the submit call when button is pressed
    function handleSubmit(event) {
        event.preventDefault();
        // this part will be used as a data submission logic

        axios.post(`${api}/addmodel`, {token: `${JSON.parse(localStorage.getItem("token")).token}`, data : formValues})
        resetFormValues();
    }

    function handleModify(event) {
        event.preventDefault();
        // this part will be used as a data submission logic

        //debug purpose
        axios.post(`${api}/modifymodel`, {token: `${JSON.parse(localStorage.getItem("token")).token}`, data : formValues})
        resetFormValues();
    }

    function handleDelete(event) {
        event.preventDefault();
        // this part will be used as a data submission logic

        axios.post(`${api}/deletemodel`, {token: `${JSON.parse(localStorage.getItem("token")).token}`, data : formValues})
        resetFormValues();
    }

    function resetFormValues() {
        formValues.id = '';
        formValues.name = '';
        formValues.desc = '';
        formValues.price = '';
        formValues.series = '';
        formValues.component = '';
        formValues.weight = '';
    }

    const [formValues, setFormValues] = useState({
        id: '',
        name: '',
        desc: '',
        price: '',
        series: '',
        component: '',
        weight: ''
    });

    const [state, setState] = useState('');

    // asynchronous function used to fetch data from the api
  transition(() => {
    setState('loading');

    axios.get(`${api}/getmodels?token=${JSON.parse(localStorage.getItem("token")).token}`)
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

            <h1>Ajoutez un modèle</h1>
            <form onSubmit={handleSubmit}>
                <TextInput type="text" placeholder='Nom' defaultValue={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                <TextInput type="text" placeholder='Description' defaultValue={formValues.desc} onChange={(e) => setFormValues({ ...formValues, desc: e.target.value })} />
                <TextInput type="number" placeholder='pUHT' defaultValue={formValues.price} onChange={(e) => setFormValues({ ...formValues, price: e.target.value })} />
                <TextInput type="text" placeholder='Gamme' defaultValue={formValues.series} onChange={(e) => setFormValues({ ...formValues, series: e.target.value })} />
                <TextInput type="text" placeholder='Ingrédients' defaultValue={formValues.component} onChange={(e) => setFormValues({ ...formValues, component: e.target.value })} />
                <TextInput type="number" placeholder='Grammage' defaultValue={formValues.weight} onChange={(e) => setFormValues({ ...formValues, weight: e.target.value })} />
                <FormButton
                    className="add"
                    value="Envoyer"
                    type="submit"
                    onClick={() => { }}
                />
            </form>

            <h1>Modifiez un modèle</h1>
            <form onSubmit={handleModify}>
                <TextInput type="number" placeholder='ID' defaultValue={formValues.id} onChange={(e) => setFormValues({ ...formValues, id: e.target.value })} />
                <TextInput type="text" placeholder='Nom' defaultValue={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} />
                <TextInput type="text" placeholder='Description' defaultValue={formValues.desc} onChange={(e) => setFormValues({ ...formValues, desc: e.target.value })} />
                <TextInput type="number" placeholder='pUHT' defaultValue={formValues.price} onChange={(e) => setFormValues({ ...formValues, price: e.target.value })} />
                <TextInput type="text" placeholder='Gamme' defaultValue={formValues.series} onChange={(e) => setFormValues({ ...formValues, series: e.target.value })} />
                <TextInput type="text" placeholder='Ingrédients' defaultValue={formValues.component} onChange={(e) => setFormValues({ ...formValues, component: e.target.value })} />
                <TextInput type="number" placeholder='Grammage' defaultValue={formValues.weight} onChange={(e) => setFormValues({ ...formValues, weight: e.target.value })} />
                <FormButton
                    className="modify"
                    value="modifier"
                    type="submit"
                    onClick={() => { }}
                />
            </form>

            <h1>Supprimez un modèle</h1>
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

export default Model;