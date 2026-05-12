<script setup>
import { ref } from 'vue';

// 1. Variables del Formulario (se actualizan mientras escribes)
const inputNombre = ref('Diego');
const inputPaterno = ref('Pineda');
const inputMaterno = ref('Gumeta');
const inputFecha = ref('22/08/1992');
const inputRfc = ref('ROMS920822MCSRRS09');

// 2. Variables de la Tarjeta (solo se actualizan al dar clic en Generar)
const cardNombre = ref('Diego');
const cardPaterno = ref('Pineda');
const cardMaterno = ref('Gumeta');
const cardRfc = ref('ROMS920822MCSRRS09');

// Variable para la URL de la imagen del QR
const qrUrl = ref(`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=ROMS920822MCSRRS09`);

// 3. Función que transfiere los datos y actualiza el QR
const generarRFC = () => {
    // Pasar los datos del formulario a la tarjeta
    cardNombre.value = inputNombre.value;
    cardPaterno.value = inputPaterno.value;
    cardMaterno.value = inputMaterno.value;
    cardRfc.value = inputRfc.value;

    // Crear la información que guardará el QR (puedes poner lo que quieras)
    const datosParaQR = `ID:${cardRfc.value} | Nombre:${cardNombre.value} ${cardPaterno.value}`;

    // Actualizar la imagen del QR de forma dinámica
    qrUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(datosParaQR)}`;
};
</script>

<template>
    <div class="custom-layout">
        <div class="custom-col">
            <div class="card">
                <h5 class="mb-4">GENERAR EL RFC DE UNA PERSONA</h5>

                <div class="custom-field">
                    <label for="nombre" class="font-medium text-sm">Nombre(s):</label>
                    <InputText id="nombre" v-model="inputNombre" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="paterno" class="font-medium text-sm">Apellido Paterno:</label>
                    <InputText id="paterno" v-model="inputPaterno" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="materno" class="font-medium text-sm">Apellido Materno:</label>
                    <InputText id="materno" v-model="inputMaterno" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="fecha" class="font-medium text-sm">Fecha Nacimiento:</label>
                    <InputText id="fecha" v-model="inputFecha" class="full-width-input" />
                </div>

                <div class="custom-field">
                    <label for="rfc" class="font-medium text-sm">RFC:</label>
                    <InputText id="rfc" v-model="inputRfc" class="full-width-input" />
                </div>

                <div class="mt-4">
                    <Button label="GENERAR" severity="success" class="full-width-input p-button-success" @click="generarRFC" />
                </div>
            </div>
        </div>

        <div class="custom-col">
            <div class="card" style="height: 100%; display: flex; flex-direction: column; align-items: center">
                <h5 style="align-self: flex-start; width: 100%; margin-bottom: 2rem">TARJETA DIGITAL</h5>

                <div class="id-card-wrapper">
                    <div class="id-header">
                        <span class="font-bold block text-xl">UNACH</span>
                        <span class="text-xs mt-1" style="font-weight: 300">Por la conciencia de la necesidad de servir</span>
                    </div>

                    <div class="id-avatar-container">
                        <div class="id-avatar">
                            <i class="pi pi-user text-4xl" style="color: var(--text-color)"></i>
                        </div>
                    </div>

                    <div class="id-body">
                        <h2 class="m-0 text-xl font-bold uppercase mt-2" style="color: var(--text-color)">
                            {{ cardNombre }} <br />
                            {{ cardPaterno }} {{ cardMaterno }}
                        </h2>
                        <span class="block mt-2 mb-3 text-500 font-medium">Empleado</span>

                        <div class="font-bold text-sm" style="color: var(--text-color)">ID : {{ cardRfc }}</div>
                    </div>

                    <div class="id-qr-section pb-3">
                        <img :src="qrUrl" alt="Código QR del empleado" class="qr-image" />
                    </div>

                    <div class="id-footer"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
}

.custom-col {
    flex: 1;
    width: 100%;
}

@media (min-width: 992px) {
    .custom-layout {
        flex-direction: row;
    }
}

.custom-field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.full-width-input {
    width: 100% !important;
}

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

/* NUEVOS ESTILOS PARA EL QR */
.id-qr-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
}

.qr-image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    padding: 5px;
    background-color: white; /* Asegura que el QR se lea bien en modo oscuro */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.id-footer {
    height: 20px;
    background-color: #007bff;
    border-top-left-radius: 50% 100%;
    border-top-right-radius: 50% 100%;
    margin-top: 20px;
}
</style>
