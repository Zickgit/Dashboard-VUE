// src/service/ApiDatosAcciones.js
export default {
    async readAcciones() {
        // Datos reales AAPL 2017-01-05 a 2017-02-05
        return [
            { date: '2017-01-05', open: 118.86, close: 119.98 },
            { date: '2017-01-06', open: 120.0, close: 121.35 },
            { date: '2017-01-09', open: 121.56, close: 121.3 },
            { date: '2017-01-10', open: 120.88, close: 119.75 },
            { date: '2017-01-11', open: 119.75, close: 119.25 },
            { date: '2017-01-12', open: 120.45, close: 121.0 },
            { date: '2017-01-13', open: 122.14, close: 122.03 },
            { date: '2017-01-17', open: 122.44, close: 122.61 },
            { date: '2017-01-18', open: 122.23, close: 122.46 },
            { date: '2017-01-19', open: 121.67, close: 121.95 },
            { date: '2017-01-20', open: 122.0, close: 121.63 },
            { date: '2017-01-23', open: 120.45, close: 121.63 },
            { date: '2017-01-24', open: 121.2, close: 121.2 },
            { date: '2017-01-25', open: 121.9, close: 121.9 },
            { date: '2017-01-26', open: 121.36, close: 121.9 },
            { date: '2017-01-27', open: 122.63, close: 121.95 },
            { date: '2017-01-30', open: 120.93, close: 121.63 },
            { date: '2017-01-31', open: 121.15, close: 121.35 },
            { date: '2017-02-01', open: 127.03, close: 128.75 },
            { date: '2017-02-02', open: 127.98, close: 128.53 },
            { date: '2017-02-03', open: 129.13, close: 129.08 }
        ];
    }
};
