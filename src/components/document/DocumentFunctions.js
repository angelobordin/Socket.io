import { FrontGenericFunctions } from "../utils/FrontGenericFunctions.js";

const socket = io('/usuarios', {
    auth: {
        token: FrontGenericFunctions.getCookie('tokenJwt')
    }
});

class DocumentFunctions {
    documentList;

    constructor(documentList) {
        this.documentList = documentList;   
    }

    getDocumentList() {
        socket.emit('getDocumentList', (documents) => {
            if (!documents) return;
            for (const document of documents) {
                this.generateDocumentTemplate(document.name);
            };
        });
    };

    connectError() {
        socket.on('connectError', (erro) => {
            alert(erro);
            windows.location.href = '/login/index.html'
        });
    };

    createNewDocument(newDocument) {
        socket.emit('createNewDocument', newDocument.value, (error) => {
            alert(error);
            window.location.href = '/';
        });
    };

    deleteDocument(documentName) {
        socket.emit('deleteDocument', documentName, (windowRefresh) => {
            if (!windowRefresh) return alert(`Error in delete operation!`);
    
            // removeDocumentDeleted(documentName);
            window.location.href = '/'
            alert(`Document ${documentName} deleted sucessful`);
        });
    };

    updateDocumentText(data) {
        socket.emit('updateDocumentText', data);
    };

    listenNewDocument() {             
        socket.on('newDocument', (newDocumentName) => {
            this.generateDocumentTemplate(newDocumentName);
        });
    };

    generateDocumentTemplate(documentName) {
        const newDocument = `<a href="../document/document.html?nome=${documentName}" class="list-group-item list-group-item-action" id="document-${documentName}">${documentName}</a>`
        this.documentList.innerHTML += newDocument;
    };
    
    listenUserAuthenticated() {
        socket.on('userAuthenticated', (userName) => {
            console.log(userName)
        });
    };

    // listenUpdateDocumentText() {
    //     socket.on('updateDocumentText', (text) => {
    //         textDocumentSelected.value = text;
    //     });
    // }

    // getDocumentSelected(documentSelected) {
    //     return socket.emit('getDocumentSelected', documentSelected, (textDocument) => {
    //         return textDocument
    //     });
    // }
};

export { DocumentFunctions };