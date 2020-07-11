const admin = require("firebase-admin");
const http = require('http');
const serviceAccount = require("./private/key.json");
const request = require('request-promise');

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


function conteo_edad(edad, condicion, innerDeptoData){
    if (edad >= 10 && edad < 30){
        innerDeptoData[condicion]["10-29"] += 1;

    } else if (edad >= 30 && edad < 50){
        innerDeptoData[condicion]["30-49"] += 1;

    } else if (edad >= 50 && edad < 70){
        innerDeptoData[condicion]["50-69"] += 1;

    } else if (edad >= 70 && edad < 90){
        innerDeptoData[condicion]["70-89"] += 1;

    } else if (edad >= 90){
        innerDeptoData[condicion]["90-99"] += 1;
    }
}


const firestore = admin.firestore();
let _Est_Grave = 0;
let _Est_Moderado = 0;

let totales = {
    "Confirmados": {
        "M":0,
        "F":0,
        "10-29":0,
        "30-49":0,
        "50-69":0,
        "70-89":0,
        "90-99":0,
    },

    "Recuperado": {
        "M":0,
        "F":0,
        "10-29":0,
        "30-49":0,
        "50-69":0,
        "70-89":0,
        "90-99":0,
    },

    "Fallecido": {
        "M":0,
        "F":0,
        "10-29":0,
        "30-49":0,
        "50-69":0,
        "70-89":0,
        "90-99":0,
    },

    "Moderado": 0,
    "Grave": 0,
}


async function getData(){
    for (let depto of deptosList){
        let url = `http://www.datos.gov.co/resource/gt2j-8ykr.json?departamento=${depto}&$limit=99999999999&$$app_token=2wez7eXZ52N8BLFYZExTeAbpI`
                    .replace(/ /g, "%20")
                    .replace(/í/g, "%C3%AD")
                    .replace(/á/g, "%C3%A1")
                    .replace(/ñ/g, "%C3%B1")
                    .replace(/é/g, "%C3%A9")
                    .replace(/ó/g, "%C3%B3");

        let options = {
            url: url,
            method: 'GET',
            json: true
        };

        let deptosData = firestore.collection('deptos').doc(depto);
        let info_departamento;
        let _Est_Grave = 0;
        let _Est_Moderado = 0;
    
        let innerDeptoData = {
            "Confirmados": {
                "M":0,
                "F":0,
                "10-29":0,
                "30-49":0,
                "50-69":0,
                "70-89":0,
                "90-99":0,
            },
            "Recuperado": {
                "M":0,
                "F":0,
                "10-29":0,
                "30-49":0,
                "50-69":0,
                "70-89":0,
                "90-99":0,
            },
            "Fallecido": {
                "M":0,
                "F":0,
                "10-29":0,
                "30-49":0,
                "50-69":0,
                "70-89":0,
                "90-99":0,
            }
        }
    
        await request(options).then(data => {
            depto_res = Array.from(data);
            
            depto_res.forEach((persona) => {
                let edad = parseInt(persona["edad"]);
                innerDeptoData["Confirmados"][persona.sexo.toUpperCase()] += 1;
                conteo_edad(edad, "Confirmados", innerDeptoData);
                
                if (persona.atenci_n === "Recuperado" || persona.atenci_n === "Fallecido"){
                    innerDeptoData[persona.atenci_n][persona.sexo.toUpperCase()] += 1;
                    conteo_edad(edad, persona.atenci_n, innerDeptoData);
                }
                
                if (persona.estado === "Moderado") {
                    _Est_Moderado += 1;
                
                } else if(persona.estado === "Grave"){
                    _Est_Grave += 1;
                }
            
            });

            totales["Moderado"] += _Est_Moderado;
            totales["Grave"] += _Est_Grave;
            totales["Confirmados"]["M"] += innerDeptoData["Confirmados"]["M"];
            totales["Confirmados"]["F"] += innerDeptoData["Confirmados"]["F"];
            totales["Confirmados"]["10-29"] += innerDeptoData["Confirmados"]["10-29"];
            totales["Confirmados"]["30-49"] += innerDeptoData["Confirmados"]["30-49"];
            totales["Confirmados"]["50-69"] += innerDeptoData["Confirmados"]["50-69"];
            totales["Confirmados"]["70-89"] += innerDeptoData["Confirmados"]["70-89"];
            totales["Confirmados"]["90-99"] += innerDeptoData["Confirmados"]["90-99"];
            totales["Recuperado"]["M"] += innerDeptoData["Recuperado"]["M"];
            totales["Recuperado"]["F"] += innerDeptoData["Recuperado"]["F"];
            totales["Recuperado"]["10-29"] += innerDeptoData["Recuperado"]["10-29"];
            totales["Recuperado"]["30-49"] += innerDeptoData["Recuperado"]["30-49"];
            totales["Recuperado"]["50-69"] += innerDeptoData["Recuperado"]["50-69"];
            totales["Recuperado"]["70-89"] += innerDeptoData["Recuperado"]["70-89"];
            totales["Recuperado"]["90-99"] += innerDeptoData["Recuperado"]["90-99"];
            totales["Fallecido"]["M"] += innerDeptoData["Fallecido"]["M"];
            totales["Fallecido"]["F"] += innerDeptoData["Fallecido"]["F"];
            totales["Fallecido"]["10-29"] += innerDeptoData["Fallecido"]["10-29"];
            totales["Fallecido"]["30-49"] += innerDeptoData["Fallecido"]["30-49"];
            totales["Fallecido"]["50-69"] += innerDeptoData["Fallecido"]["50-69"];
            totales["Fallecido"]["70-89"] += innerDeptoData["Fallecido"]["70-89"];
            totales["Fallecido"]["90-99"] += innerDeptoData["Fallecido"]["90-99"];
            
            info_departamento = {
                "Departamento": depto,
                "Confirmados": depto_res.length,
                "Recuperados": innerDeptoData["Recuperado"]["M"] + innerDeptoData["Recuperado"]["F"] ,
                "Est.Moderado": _Est_Moderado,
                "Est.Grave": _Est_Grave,
                "Fallecidos": innerDeptoData["Fallecido"]["M"] + innerDeptoData["Fallecido"]["F"] ,
                "datos_extra": innerDeptoData,
            };
            // console.log(info_departamento);
            deptosData.set(info_departamento);
        });
        // req.on('error', function(e) {
            //     console.log(e.message);
            // });
        
        }
        
    firestore.collection('totales').doc("totales").set(totales);
    firestore.collection('totales').doc("fecha-actualización").set({"fecha": Date.now().toString()});
    // console.log(totales);
}

getData();
