 - Iniciar um projeto NodeJS
```bash
    npm init -y
```

 - Instalar o Express
```bash
    npm i express
```

 - Crie a pasta src, onde seu código vai ficar
 - Crie o arquivo .js dentro dela
 - Importe o express
```js
    const express = require("express");
```

 - Instancie o app, crie sua rota, e ouça uma porta
 ```js
    app = express();

    app.get("/", (req, res) => {
        res.send("Hello World!");
    })

    app.listen(8000);
```

 - Execute o .js com o node
 ```bash
    node nome_do_seu_arquivo.js
```