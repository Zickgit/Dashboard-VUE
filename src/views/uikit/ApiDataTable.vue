<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const objects = ref([]);
const loading = ref(true);

const fetchObjects = async () => {
    try {
        const response = await axios.get('https://api.restful-api.dev/objects');
        objects.value = response.data;
    } catch (error) {
        console.error('Error al obtener datos:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchObjects();
});
</script>

<template>
    <div class="card">
        <h5>DATOS DESDE API REST (RESTFUL-API)</h5>
        <DataTable
            :value="objects"
            :paginator="true"
            :rows="5"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 20]"
            responsiveLayout="scroll"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} objetos"
        >
            <Column field="id" header="ID" :sortable="true"></Column>
            <Column field="name" header="Nombre del Dispositivo" :sortable="true"></Column>
            <Column header="Detalles Técnicos">
                <template #body="slotProps">
                    <div v-if="slotProps.data.data">
                        <span v-if="slotProps.data.data.color">Color: {{ slotProps.data.data.color }} | </span>
                        <span v-if="slotProps.data.data.capacity">Capacidad: {{ slotProps.data.data.capacity }}</span>
                    </div>
                    <span v-else>Sin detalles adicionales</span>
                </template>
            </Column>
        </DataTable>
    </div>
</template>
