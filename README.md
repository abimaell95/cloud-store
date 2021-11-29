# Estructura de los documentos de la base de datos no relacional (Firestore)

Para este proyecto utilizamos Firebase para almacenar los datos de nuestro dataset. Firebase maneja una base de datos como una colección de documentos que tiene un formato muy parecido a un archivo JSON.

## Nombre de la colección - eCommerce 
### Estructura de los documentos:

```json
document_id = {
    brand: "<string>",
    categoryCode: "<string>",
    categoryId: "<number>",
    eventTime: "<timestamp>",
    eventType: "<string>",
    price: "<number>",
    productId: "<number>",
    userId: "<number>",
    userSession: "<string>"
}
```
