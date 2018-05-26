import { JsonController, Get, Post, Put, HttpCode, Body, Param, NotFoundError, BadRequestError } from 'routing-controllers'
import Game, {randomColor, Color} from './entity'
import {validate} from "class-validator";

@JsonController()
export default class GameController {

@Get('/games')
async allGames() {
  const games = await Game.find()
  return { games }
}

@Post('/games')
@HttpCode(201)
async createGame(
      @Body() game: {'color': Color, 'name': 'new name', 'board': 'board' }
    ) {
        game.color = randomColor()
        return Game.create(game).save()
    }

@Put('/games/:id')
async updateGame(
    @Param('id') id: number,
    @Body() update: {'color': Color, 'name': 'new name', 'board': 'board' }
) {
    let game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Game not found!')

    Game.merge(game, update)

    return validate(game).then(errors => { 
        if (errors.length > 0) {
            throw new BadRequestError(`wrong input!`)
        } else {
            game!.save()
            return game
        }
    })
    
    }

}