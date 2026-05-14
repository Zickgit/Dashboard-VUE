import axios from 'axios';

export default {
    async readEmpleado(id) {
        const response = await axios.get(`http://dummy.restapiexample.com/api/v1/employee/${id}`);
        return response.data.data; // Retorna el objeto empleado
    },

    async readEmpleados() {
        const response = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
        return response.data.data; // Retorna la lista completa
    }
};
