import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Orphanage from '../models/orphanage'
import orphanageView from '../views/orphanages_view'
import * as Yup from 'yup'

export default {
    async index(req: Request, res: Response,){
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    // Funcao para pegar o detalhe de cada orfanato
    async show(req: Request, res: Response,){
        // Pegando o id do parametro que foi passado pelo banco de dados
        const { id } = req.params

        // fazendo uma instancia na classe Orphanage com o metodo getRepository
        const orphanagesRepository = getRepository(Orphanage)

        // Essa variavel vai  ser o resultado da instancia da classe, usando o metodo findOneOrFail(encontre um ou falhe), passando o parametro id
        const orphanage = await orphanagesRepository.findOneOrFail(id, {relations: ['images']})

        return res.json(orphanageView.render(orphanage))
    },

    async create(req: Request, res: Response){
        console.log(req.files)
        // essa variavel vai pegar todos esses nomes diretamente da requisição que foi feita
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body
    
        // Essa constante vai pegar a função getrepository diretamente do TypeORM e vai passar como parametro a classe Orphanage, contendo todos os valores das colunas
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                }))
        })

        await schema.validate(data, {
            abortEarly: false,
        })
    
        // Nessa parte vamos criar uma variavel que vai receber a funcao de pegar o repositorio, e criar um banco de dados passando todos esses parametros para a funçao CREATE
        // que vai criar a tabela no banco de dados
        const orphanage = orphanagesRepository.create(data)
    
        // uma função assincrona que vai salvar todos os valores que foi criado diretamente no banco de dados
        // o await vai servir para ele aguardar que todos os dados tenha sido salvos, para assim continuar com o codigo
        await orphanagesRepository.save(orphanage)
    
        // Aqui estamos dando um return na resposta, passando o status code 201 (criado), e passando todos os parametros e valores que foi criado no banco de dados
        return res.status(201).json(orphanage)
    }
}