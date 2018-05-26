import { JsonController, Get, Post, Put, HttpCode, Body, Param, NotFoundError } from 'routing-controllers'
import Game, {randomColor, Color} from './entity'



@JsonController()
export default class ProductController {

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
    @Body() update: Partial<Game>
) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Game not found!')

    return Game.merge(game, update).save()
    }

}