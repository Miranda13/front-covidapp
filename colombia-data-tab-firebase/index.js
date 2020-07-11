const admin = require("firebase-admin");
const http = require('http');
const serviceAccount = require("./private/key.json");

let deptosList = [
    "Bogotá D.C.",
    "Barranquilla D.E.",
    "Atlántico",
    "Valle del Cauca",
    "Cartagena D.T. y C.",
    "Antioquia",
    "Nariño",
    "Cundinamarca",
    "Amazonas",
    "Chocó",
    "Sucre",
    "Buenaventura D.E.",
    "Meta",
    "Cesar",
    "Santa Marta D.T. y C.",
    "Tolima",
    "Bolívar",
    "Córdoba",
    "Magdalena",
    "Santander",
    "Risaralda",
    "La Guajira",
    "Cauca",
    "Boyacá",
    "Huila",
    "Norte de Santander",
    "Caldas",
    "Quindío",
    "Casanare",
    "Arauca",
    "Caquetá",
    "Guaviare",
    "Putumayo",
    "Archipiélago de San Andrés Providencia y Santa Catalina",
    "Vaupés",
    "Guainía",
    "Vichada"
];


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-xovid.firebaseio.com"
});

const firestore = admin.firestore();

for (let depto of deptosList){
    let deptosData = firestore.collection('deptos').doc(depto);
    let url = `http://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto}&$limit=99999999999&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`;
    let _recuperados = 0;
    let _fallecidos = 0;
    let _Est_Grave = 0;
    let _Est_Moderado = 0;
    let deptoData;

    let req = http.get(url, function(res) {
        let data = '';
        let depto_res;

        res.on('data', function(stream) {
            data += stream;
        });
        res.on('end', function() {
            depto_res = Array.from(JSON.parse(data));

            depto_res.forEach((persona) => {
                if (persona.atenci_n === "Recuperado"){
                    _recuperados += 1;
                }

                if (persona.atenci_n === "Fallecido"){
                    _fallecidos += 1;
                }

                if (persona.estado === "Moderado"){
                    _Est_Moderado += 1;
                }

                if (persona.estado === "Grave"){
                    _Est_Grave += 1;
                }
            });

            deptoData = {
                "Departamento": depto,
                "Confirmados": depto_res.length,
                "Recuperados": _recuperados,
                "Est.Moderado": _Est_Moderado,
                "Est.Grave": _Est_Grave,
                "Fallecidos": _fallecidos
            };

            deptosData.set(deptoData);
        });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });
    
}
