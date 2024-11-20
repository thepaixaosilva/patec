import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Creates a new user
   * @param createUserDto - User creation data
   * @returns Promise with the created user (without password)
   * @throws ConflictException if a user with the same email or RA already exists
   * @throws InternalServerErrorException if there's an error creating the user
   */
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    try {
      const existingUser = await this.findOneByEmail(createUserDto.email)
      if (existingUser) {
        throw new ConflictException('Email já está em uso')
      }

      if (createUserDto.ra) {
        const existingRa = await this.userRepository.findOneBy({ ra: createUserDto.ra })
        if (existingRa) {
          throw new ConflictException('RA já está em uso')
        }
      }

      // Criar uma instância de User com os dados corretos
      const user = new User()
      Object.assign(user, {
        ...createUserDto,
        password: await this.hashPassword(createUserDto.password),
      })

      const savedUser = await this.userRepository.save(user)

      // Usar type assertion para garantir que savedUser é User
      const { password, ...result } = savedUser as User
      return result
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Erro ao criar usuário')
    }
  }

  /**
   * Returns all users
   * @returns Promise with array of users (without passwords)
   */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.find({
      select: ['id', 'name', 'email', 'ra', 'role'],
      relations: ['userSubject', 'answers'],
    })
    return users
  }

  /**
   * Finds a specific user
   * @param ra - User's RA
   * @returns Promise with the found user (without password)
   * @throws NotFoundException if the user is not found
   */
  async findOne(ra: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { ra },
      select: ['id', 'name', 'email', 'ra', 'role'],
      relations: ['userSubject', 'answers'],
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  /**
   * Finds a specific user
   * @param ID - User's ID
   * @returns Promise with the found user (without password)
   * @throws NotFoundException if the user is not found
   */
  async findOneById(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'ra', 'role'],
      relations: ['userSubject', 'answers'],
    })

    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    return user
  }

  /**
   * Finds a user by email
   * @param email - User's email
   * @returns Promise with the found user or null
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email })
  }

  /**
   * Updates a user
   * @param ra - User's RA
   * @param updateUserDto - Update data
   * @returns Promise with the updated user (without password)
   * @throws NotFoundException if the user is not found
   * @throws ConflictException if the new email is already in use
   * @throws InternalServerErrorException if there's an error updating
   */
  async update(ra: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOneBy({ ra })
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findOneByEmail(updateUserDto.email)
      if (existingUser) {
        throw new ConflictException('Email já está em uso')
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password)
    }

    try {
      // Criar uma nova instância com os dados atualizados
      const userToUpdate = new User()
      Object.assign(userToUpdate, {
        ...user,
        ...updateUserDto,
      })

      const updatedUser = await this.userRepository.save(userToUpdate)

      // Usar type assertion para garantir que updatedUser é User
      const { password, ...result } = updatedUser as User
      return result
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar usuário: ' + error)
    }
  }

  /**
   * Removes a user
   * @param ra - User's RA
   * @throws NotFoundException if the user is not found
   * @throws InternalServerErrorException if there's an error removing
   */
  async remove(ra: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ ra })
    if (!user) {
      throw new NotFoundException('Usuário não encontrado')
    }

    try {
      await this.userRepository.remove(user)
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover usuário: ' + error)
    }
  }

  /**
   * Gera o hash de uma senha
   * @param password - Senha em texto plano
   * @returns Promise com o hash da senha
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
