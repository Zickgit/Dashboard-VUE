<template>
    <div class="card">
        <h5>API de datos históricos del mercado de valores de Lyon, Francia</h5>
        <Chart type="line" :data="lineData" :options="lineOptions" style="height: 350px" />

        <h5 class="mt-4">Cambio porcentual por día de acciones AAPL (2017-01-05/2017-02-05)</h5>
        <DataTable :value="datosAcciones" :paginator="true" :rows="10" :rowsPerPageOptions="[5, 10, 20]" responsiveLayout="scroll" sortMode="multiple">
            <Column field="date" header="Fecha" :sortable="true" />
            <Column field="open" header="Valor Apertura" :sortable="true" />
            <Column field="close" header="Valor Cierre" :sortable="true" />
        </DataTable>
    </div>
</template>

<script>
import ApiDatosAcciones from '@/service/ApiDatosAcciones';
import Chart from 'primevue/chart';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';

export default {
    name: 'RepoGrafica',
    components: { Chart, DataTable, Column },
    data() {
        return {
            datosAcciones: [],
            listafechas: [],
            listavalores: [],
            lineData: {},
            lineOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    x: { ticks: { maxRotation: 45 } }
                }
            }
        };
    },
    async mounted() {
        const res = await ApiDatosAcciones.readAcciones();
        this.datosAcciones = res;

        // Extraer fechas y valores de cierre en listas separadas
        for (var i = 0; i < this.datosAcciones.length; i++) {
            var counter = this.datosAcciones[i];
            this.listafechas.push(counter.date);
            this.listavalores.push(counter.close);
        }

        this.lineData = {
            labels: this.listafechas,
            datasets: [
                {
                    label: 'Cambio porcentual trimestral',
                    data: this.listavalores,
                    fill: false,
                    backgroundColor: '#2f4860',
                    borderColor: '#2f4860',
                    tension: 0.4
                }
            ]
        };
    }
};
</script>
