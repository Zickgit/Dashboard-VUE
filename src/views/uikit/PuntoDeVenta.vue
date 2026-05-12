<script setup>
import { computed, ref } from 'vue';

const productos = ref([
    { id: 1, nombre: 'Impresora LaserJet Color', precio: 5200.0, cantidad: 2 },
    { id: 2, nombre: 'Monitor LED 31 plg.', precio: 1700.0, cantidad: 3 }
]);

const formProducto = ref({ id: null, nombre: '', precio: null, cantidad: null });
const editando = ref(false);
let contadorId = 3;

const subtotal = computed(() => {
    return productos.value.reduce((suma, prod) => suma + prod.precio * prod.cantidad, 0);
});

const iva = computed(() => {
    return subtotal.value * 0.16;
});

const total = computed(() => {
    return subtotal.value + iva.value;
});

const formatoMoneda = (valor) => {
    if (valor == null) return '$0.00';
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};

const registrarProducto = () => {
    if (!formProducto.value.nombre || !formProducto.value.precio || !formProducto.value.cantidad) {
        alert('Por favor, llena todos los campos.');
        return;
    }

    if (editando.value) {
        const index = productos.value.findIndex((p) => p.id === formProducto.value.id);
        if (index !== -1) {
            productos.value[index] = { ...formProducto.value };
        }
    } else {
        productos.value.push({
            id: contadorId++,
            nombre: formProducto.value.nombre,
            precio: formProducto.value.precio,
            cantidad: formProducto.value.cantidad
        });
    }

    limpiarFormulario();
};

const editarProducto = (producto) => {
    formProducto.value = { ...producto };
    editando.value = true;
};

const eliminarProducto = (id) => {
    productos.value = productos.value.filter((p) => p.id !== id);
};

const limpiarFormulario = () => {
    formProducto.value = { id: null, nombre: '', precio: null, cantidad: null };
    editando.value = false;
};
</script>

<template>
    <!-- Contenedor principal estilo Tarjeta -->
    <div class="card pos-wrapper">
        <h4 class="pos-title">PUNTO DE VENTA (POS)</h4>

        <!-- Barra Superior: Formulario -->
        <div class="pos-form-bar">
            <InputText v-model="formProducto.nombre" placeholder="Nombre del producto..." class="input-stretch" />
            <InputNumber v-model="formProducto.cantidad" placeholder="Cant" class="input-fixed" :min="1" />
            <InputNumber v-model="formProducto.precio" placeholder="$ Precio U." class="input-fixed" mode="currency" currency="MXN" locale="es-MX" />

            <Button :label="editando ? 'Guardar' : 'Registrar'" :icon="editando ? 'pi pi-save' : 'pi pi-plus'" severity="success" @click="registrarProducto" class="btn-registrar" />
            <Button v-if="editando" icon="pi pi-times" severity="secondary" @click="limpiarFormulario" />
        </div>

        <!-- Tabla -->
        <div class="pos-table-container">
            <DataTable :value="productos" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]" class="p-datatable-gridlines">
                <template #empty> No hay productos registrados. </template>

                <Column field="id" header="Cns" sortable style="width: 10%"></Column>
                <Column field="nombre" header="Nombre del Producto" style="width: 35%"></Column>

                <Column header="Precio U." style="width: 15%">
                    <template #body="slotProps">
                        {{ formatoMoneda(slotProps.data.precio) }}
                    </template>
                </Column>

                <Column field="cantidad" header="Cant." style="width: 10%"></Column>

                <Column header="Precio P." style="width: 15%">
                    <template #body="slotProps">
                        {{ formatoMoneda(slotProps.data.precio * slotProps.data.cantidad) }}
                    </template>
                </Column>

                <Column header="Acciones" style="width: 15%">
                    <template #body="slotProps">
                        <div class="action-buttons">
                            <Button icon="pi pi-pencil" severity="success" class="action-btn" @click="editarProducto(slotProps.data)" />
                            <Button icon="pi pi-trash" severity="danger" class="action-btn" @click="eliminarProducto(slotProps.data.id)" />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>

        <!-- Barra Inferior: Totales -->
        <div class="pos-totals-bar">
            <div class="total-group">
                <label>Subtotal:</label>
                <InputText :value="formatoMoneda(subtotal)" readonly class="readonly-input" />
            </div>

            <div class="total-group">
                <label>IVA (16%):</label>
                <InputText :value="formatoMoneda(iva)" readonly class="readonly-input" />
            </div>

            <div class="total-group total-final">
                <label>Total:</label>
                <InputText :value="formatoMoneda(total)" readonly class="readonly-input highlight-total" />
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Contenedor principal que envuelve todo */
.pos-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Define el espacio exacto entre formulario, tabla y totales */
    padding: 2rem;
    border: 1px solid var(--surface-border);
    border-radius: 8px;
}

.pos-title {
    margin: 0;
    font-weight: 700;
}

/* --- BARRA DEL FORMULARIO --- */
.pos-form-bar {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    background-color: var(--surface-ground);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--surface-border);
}

.input-stretch {
    flex: 2; /* Obliga al input del nombre a ocupar el espacio grande */
    min-width: 200px;
}

.input-fixed {
    flex: 1; /* Inputs más pequeños para cant y precio */
    min-width: 120px;
}

.btn-registrar {
    min-width: 130px;
}

/* --- TABLA --- */
.pos-table-container {
    width: 100%;
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
}

/* --- BARRA DE TOTALES --- */
.pos-totals-bar {
    display: flex;
    flex-direction: row;
    justify-content: center; /* Centra los 3 bloques horizontalmente */
    gap: 2rem;
    background-color: var(--surface-ground);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--surface-border);
}

.total-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.total-group label {
    font-weight: 500;
    white-space: nowrap;
    color: var(--text-color);
}

.total-final label {
    font-weight: bold;
    font-size: 1.1rem;
}

.readonly-input {
    width: 140px;
    pointer-events: none; /* Evita que parezca que se puede escribir */
}

.highlight-total {
    font-weight: bold;
    background-color: var(--surface-overlay) !important;
}

/* Adaptación para pantallas pequeñas / celulares */
@media (max-width: 900px) {
    .pos-form-bar {
        flex-direction: column;
        align-items: stretch;
    }
    .pos-totals-bar {
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
    }
}
</style>
