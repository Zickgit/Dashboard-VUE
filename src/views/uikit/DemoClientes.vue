<script setup>
import { ref } from 'vue';

const nombre = ref('Diego');
const apellidoPaterno = ref('Pineda');
const apellidoMaterno = ref('Gumeta');
const fechaNacimiento = ref('22/08/1992');
const rfc = ref('ROMS920822MCSRRS09');

const generarRFC = () => {
    console.log('Generando RFC para:', nombre.value);
};
</script>

<template>
    <!-- Contenedor Flexbox a prueba de fallos -->
    <div class="custom-layout">
        <!-- COLUMNA IZQUIERDA: FORMULARIO -->
        <div class="custom-col">
            <div class="card">
                <h5 class="mb-4">GENERAR EL RFC DE UNA PERSONA</h5>

                <div class="custom-field">
                    <label for="nombre" class="font-medium text-sm">Nombre(s):</label>
                    <InputText id="nombre" v-model="nombre" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="paterno" class="font-medium text-sm">Apellido Paterno:</label>
                    <InputText id="paterno" v-model="apellidoPaterno" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="materno" class="font-medium text-sm">Apellido Materno:</label>
                    <InputText id="materno" v-model="apellidoMaterno" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="fecha" class="font-medium text-sm">Fecha Nacimiento:</label>
                    <InputText id="fecha" v-model="fechaNacimiento" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="rfc" class="font-medium text-sm">RFC:</label>
                    <InputText id="rfc" v-model="rfc" class="full-width-input" />
                </div>

                <div class="mt-4">
                    <!-- En la nueva versión se usa severity="success", agregamos la clase anterior por si acaso -->
                    <Button label="GENERAR" severity="success" class="full-width-input p-button-success" @click="generarRFC" />
                </div>
            </div>
        </div>

        <!-- COLUMNA DERECHA: TARJETA DIGITAL -->
        <div class="custom-col">
            <!-- Forzamos el centrado vertical y horizontal con estilos en línea para evitar bloqueos del framework -->
            <div class="card" style="height: 100%; display: flex; flex-direction: column; align-items: center">
                <h5 style="align-self: flex-start; width: 100%; margin-bottom: 2rem">TARJETA DIGITAL</h5>

                <!-- Gafete -->
                <div class="id-card-wrapper">
                    <!-- Encabezado -->
                    <div class="id-header">
                        <span class="font-bold block text-xl">UNACH</span>
                        <span class="text-xs mt-1" style="font-weight: 300">Por la conciencia de la necesidad de servir</span>
                    </div>

                    <!-- Avatar centrado -->
                    <div class="id-avatar-container">
                        <div class="id-avatar">
                            <i class="pi pi-user text-4xl" style="color: var(--text-color)"></i>
                        </div>
                    </div>

                    <!-- Datos de la Persona -->
                    <div class="id-body">
                        <h2 class="m-0 text-xl font-bold uppercase mt-2" style="color: var(--text-color)">
                            {{ nombre }} <br />
                            {{ apellidoPaterno }} {{ apellidoMaterno }}
                        </h2>
                        <span class="block mt-2 mb-3 text-500 font-medium">Empleado</span>

                        <div class="font-bold text-sm" style="color: var(--text-color)">ID : {{ rfc }}</div>
                    </div>

                    <!-- Código de Barras -->
                    <div class="id-barcode pb-3">
                        <div class="barcode-lines">|| ||||| | ||| |||| || |</div>
                        <span class="text-xs mt-2 text-500 block">0 12345 67890 12345 7</span>
                    </div>

                    <div class="id-footer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* --- 1. CSS PARA EL DISEÑO A COLUMNAS (REEMPLAZA AL GRID) --- */
.custom-layout {
    display: flex;
    flex-direction: column; /* En celulares se apila */
    gap: 1.5rem;
    width: 100%;
}

.custom-col {
    flex: 1;
    width: 100%;
}

/* Cuando la pantalla es mayor a 992px (Laptops/Monitores), se divide a la mitad */
@media (min-width: 992px) {
    .custom-layout {
        flex-direction: row;
    }
}

/* --- 2. CSS PARA LOS INPUTS --- */
.custom-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.full-width-input {
    width: 100% !important;
}

/* --- 3. CSS PARA LA TARJETA DIGITAL --- */
.id-card-wrapper {
    width: 100%;
    max-width: 320px;
    background-color: var(--surface-overlay);
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    border: 1px solid var(--surface-border);
}

.id-header {
    background: linear-gradient(180deg, #0f2b46 0%, #007bff 100%);
    color: white;
    padding: 1.5rem 1rem 3.5rem 1rem;
    border-bottom-left-radius: 50% 20%;
    border-bottom-right-radius: 50% 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.id-avatar-container {
    display: flex;
    justify-content: center;
    margin-top: -45px;
    position: relative;
}

.id-avatar {
    width: 85px;
    height: 85px;
    background-color: var(--surface-ground);
    border: 4px solid var(--surface-overlay);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.id-body {
    text-align: center;
    padding: 1rem;
}

.id-barcode {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.barcode-lines {
    font-size: 1.8rem;
    font-weight: 900;
    letter-spacing: 2px;
    transform: scaleY(1.5);
    color: var(--text-color);
    margin-top: 10px;
}

.id-footer {
    height: 20px;
    background-color: #007bff;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    margin-top: 20px;
}
</style>
