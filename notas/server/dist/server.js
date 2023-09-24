"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var StatusHTTP;
(function (StatusHTTP) {
    StatusHTTP[StatusHTTP["OK"] = 200] = "OK";
    StatusHTTP[StatusHTTP["CREATED"] = 201] = "CREATED";
    StatusHTTP[StatusHTTP["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusHTTP[StatusHTTP["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusHTTP[StatusHTTP["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(StatusHTTP || (StatusHTTP = {}));
// POST Cadastrar usuário
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const password = req.body.password;
    try {
        yield prisma.user.create({
            data: {
                name: name,
                password: password,
            },
        });
        res.status(StatusHTTP.CREATED).json(name);
    }
    catch (err) {
        res.status(StatusHTTP.SERVER_ERROR).json('Erro ao inserir no banco');
    }
}));
// POST Login de usuário
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud
    const name = req.body.name;
    const password = req.body.password;
    const user = yield prisma.user.findUnique({
        where: {
            name: name,
        },
    });
    if (user === null) {
        return res.status(StatusHTTP.NOT_FOUND).json('Usuário não encontrado');
    }
    if (user.password == password) {
        return res.status(StatusHTTP.OK).json(user);
    }
    else {
        return res.status(StatusHTTP.BAD_REQUEST).json('Senha incorreta');
    }
}));
// POST Criar nota
// GET Listar notas do usuário
app.get('/notes/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (userId == null) {
        return res.status(StatusHTTP.BAD_REQUEST).json('Nenhum id encontrado');
    }
    const notas = yield prisma.notes.findMany({
        where: {
            userId: parseInt(userId),
        },
    });
    if (notas.length === 0) {
        return res.status(StatusHTTP.NOT_FOUND).json('Nenhuma nota encontrada');
    }
    else {
        return res.status(StatusHTTP.OK).json(notas);
    }
}));
// DELETE Deletar nota
app.listen(8000);
