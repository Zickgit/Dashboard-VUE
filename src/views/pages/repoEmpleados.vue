<template>
    <div class="card">
        <h5>Consumir API REST Empleado</h5>

        <!-- Formulario de búsqueda por ID -->
        <div class="p-fluid grid">
            <div class="field col-12 md:col-6">
                <label>Nombre:</label>
                <InputText v-model="empleadoSeleccionado.employee_name" disabled />
            </div>
            <div class="field col-12 md:col-6">
                <label>Salario:</label>
                <InputText v-model="empleadoSeleccionado.employee_salary" disabled />
            </div>
            <div class="field col-12 md:col-6">
                <label>Edad:</label>
                <InputText v-model="empleadoSeleccionado.employee_age" disabled />
            </div>
            <div class="field col-12 md:col-6">
                <label>Id Emp:</label>
                <InputText v-model="idEmpleado" type="number" />
            </div>
            <div class="col-12">
                <Button label="Consultar Datos" icon="pi pi-search" class="p-button-success" @click="consultarEmpleado" />
            </div>
        </div>

        <!-- URL consultada -->
        <p v-if="urlConsultada" class="mt-3">
            <strong>{{ urlConsultada }}</strong>
        </p>

        <!-- DataTable con paginado y ordenamiento -->
        <h5>Lista de Empleados</h5>
        <DataTable :value="listaEmpleados" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]" responsiveLayout="scroll" sortMode="multiple">
            <Column field="employee_name" header="Nombre del Empleado" :sortable="true" />
            <Column field="employee_salary" header="Salario" :sortable="true" />
            <Column field="employee_age" header="Edad" :sortable="true" />
        </DataTable>
    </div>
</template>

<script>
import ApiDatosEmpleado from '@/service/ApiDatosEmpleado';
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';

export default {
    name: 'RepoEmpleados',
    components: { DataTable, Column, InputText, Button },
    data() {
        return {
            idEmpleado: '',
            empleadoSeleccionado: {},
            listaEmpleados: [],
            urlConsultada: ''
        };
    },
    async mounted() {
        // Carga la tabla completa al inicio
        this.listaEmpleados = await ApiDatosEmpleado.readEmpleados();
    },
    methods: {
        async consultarEmpleado() {
            if (!this.idEmpleado) return;
            this.urlConsultada = `http://dummy.restapiexample.com/api/v1/employee/${this.idEmpleado}`;
            this.empleadoSeleccionado = await ApiDatosEmpleado.readEmpleado(this.idEmpleado);
        }
    }
};
</script>
