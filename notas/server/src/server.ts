import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

enum StatusHTTP {
	OK = 200,
	CREATED = 201,
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	SERVER_ERROR = 500,
}

// POST Cadastrar usuário
app.post('/register', async (req: Request, res: Response) => {
	const name = req.body.name;
	const password = req.body.password;
	try {
		await prisma.user.create({
			data: {
				name: name,
				password: password,
			},
		});
		res.status(StatusHTTP.CREATED).json(name);
	} catch (err) {
		res.status(StatusHTTP.SERVER_ERROR).json('Erro ao inserir no banco');
	}
});

// POST Login de usuário
app.post('/login', async (req: Request, res: Response) => {
	// https://www.prisma.io/docs/concepts/components/prisma-client/crud
	const name = req.body.name;
	const password = req.body.password;
	const user = await prisma.user.findUnique({
		where: {
			name: name,
		},
	});

	if (user === null) {
		return res.status(StatusHTTP.NOT_FOUND).json('Usuário não encontrado');
	}

	if (user.password == password) {
		return res.status(StatusHTTP.OK).json(user);
	} else {
		return res.status(StatusHTTP.BAD_REQUEST).json('Senha incorreta');
	}
});

// POST Criar nota

// GET Listar notas do usuário
app.get('/notes/:userId', async (req: Request, res: Response) => {
	const userId = req.params.userId;
	if (userId == null) {
		return res.status(StatusHTTP.BAD_REQUEST).json('Nenhum id encontrado');
	}

	const notas = await prisma.notes.findMany({
		where: {
			userId: parseInt(userId),
		},
	});

	if (notas.length === 0) {
		return res.status(StatusHTTP.NOT_FOUND).json('Nenhuma nota encontrada');
	} else {
		return res.status(StatusHTTP.OK).json(notas);
	}
});

// DELETE Deletar nota

app.listen(8000);
