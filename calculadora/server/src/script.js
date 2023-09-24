const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
	// 1 - Soma
	// 2 - Subtração
	// 3 - Multiplicação
	// 4 - Divisão
	const n1 = req.body.numero1;
	const n2 = req.body.numero2;
	const operacao = req.body.operacao;

	if (n1 == undefined || n2 == undefined || operacao == undefined) {
		return res.status(400).json('Prencha os campos');
	}

	let resultado;
	switch (operacao) {
		case '1':
			resultado = n1 + n2;
			break;
		case '2':
			resultado = n1 - n2;
			break;
		case '3':
			resultado = n1 * n2;
			break;
		case '4':
			if(n2 == 0) return res.status(400).json('Divisão invalido')
			resultado = n1 / n2;
			break;
		default:
			return res.status(400).json('Operação inválida');
	}
	res.json(resultado);
});

app.listen(8000);
