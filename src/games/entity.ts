import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn } from 'class-validator'

export type Color = 'red' | 'blue' | 'green' | 'yellow' | 'magenta'
const colorArray: Array<Color> = ['red', 'blue', 'green', 'yellow', 'magenta']

export const defaultBoard = [
	['o', 'o', 'o'],
	['o', 'o', 'o'],
	['o', 'o', 'o']
]


export const randomColor = () => colorArray[Math.floor(Math.random()* colorArray.length)]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @IsIn(colorArray)
  @Column('text', {nullable:false})
  color: Color

  @Column('json', {default: defaultBoard})
  board: {}

}

