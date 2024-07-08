// constants.js

// module.exports = {
//     databaseErrorFindingMessages: 'Database error finding messages.',
//     databaseErrorFindingMessage: 'Database error finding the message.',
//     databaseErrorSavingMessage: 'Database error saving new message.',
//     databaseErrorUpdatingMessage: 'Database error updating the message.',
//     databaseErrorDeletingMessage: 'Database error deleting the message.',
//     textFieldRequired: 'Text field is required',
//     idFieldRequired: 'id field is required',
//     messageNotFound: 'Message not found',
//     textMustBeUnique: 'Text must be unique',
//     messageRemoved: 'The message has been removed.'
// };

const messages = {
    en: {
        databaseErrorFindingMessages: 'Database error finding messages.',
        databaseErrorFindingMessage: 'Database error finding the message.',
        databaseErrorSavingMessage: 'Database error saving new message.',
        databaseErrorUpdatingMessage: 'Database error updating the message.',
        databaseErrorDeletingMessage: 'Database error deleting the message.',
        textFieldRequired: 'Text field is required',
        idFieldRequired: 'id field is required',
        messageNotFound: 'Message not found',
        textMustBeUnique: 'Text must be unique',
        messageRemoved: 'The message has been removed.'
    },
    es: {
        databaseErrorFindingMessages: 'Error de base de datos al encontrar mensajes.',
        databaseErrorFindingMessage: 'Error de base de datos al encontrar el mensaje.',
        databaseErrorSavingMessage: 'Error de base de datos al guardar el mensaje nuevo.',
        databaseErrorUpdatingMessage: 'Error de base de datos al actualizar el mensaje.',
        databaseErrorDeletingMessage: 'Error de base de datos al eliminar el mensaje.',
        textFieldRequired: 'El campo de texto es obligatorio',
        idFieldRequired: 'El campo de ID es obligatorio',
        messageNotFound: 'Mensaje no encontrado',
        textMustBeUnique: 'El texto debe ser único',
        messageRemoved: 'El mensaje ha sido eliminado.'
    }
    // Add more languages here
};


module.exports = function(){
    const lang = process.env.LANG || 'en'; // Default to English
    const trans = messages[lang] || messages['en'];
    return trans;
}
