// import { Injectable } from '@nestjs/common';
// import { Cat } from './interfaces/cat.interface';
// import { CreateCatDto } from './dto/create-cat.dto';

// @Injectable()
// export class CatsService {

//   private cats: Cat[] = [];

//   create(cat: CreateCatDto) {
//     this.cats.push(cat);
//   }

//   findAll(): Cat[] {
//     return this.cats;
//   }

// }


import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { NarimanException } from '../common/exception/nariman.exception';
import { Cat } from '../cats/interfaces/cat.interface';


@Injectable()
export class CatsService {
  private cats: Cat[] = [
    { id: 1, name: 'Барсик', age: 3, breed: 'Сиамский' },
    { id: 2, name: 'Мурка', age: 5, breed: 'Персидский' },
    { id: 3, name: 'Рыжик', age: 2, breed: 'Дворовой' },
    { id: 4, name: 'Снежок', age: 4, breed: 'Британский' },
  ];

  // ✅ Метод для GET /cats - получение всех котов
  findAll(): Cat[] {
    return this.cats;
  }

  // ✅ Метод для GET /cats/:age - поиск по возрасту с ParseIntPipe
  findOne(age: number): Cat {
    const cat = this.cats.find(cat => cat.age === age);
    if (!cat) {
      throw new NotFoundException(`Кот с возрастом ${age} лет не найден`);
    }
    return cat;
  }

  // ✅ Метод для GET /cats/excep - выбрасывает HttpException('forbidden', 403)
  getException(): void {
    throw new HttpException('forbidden', HttpStatus.FORBIDDEN);
  }

  // ✅ Метод для GET /cats/custom - выбрасывает исключение с полным кастомным телом
  getCustomException(): void {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Доступ запрещен',
        message: 'У вас нет прав для выполнения этой операции',
        timestamp: new Date().toISOString(),
        details: 'Требуется роль администратора',
        customField: 'Это кастомное поле',
      },
      HttpStatus.FORBIDDEN,
      {
        cause: new Error('Пользователь не авторизован для выполнения этого действия'),
      },
    );
  }

  // ✅ Метод для GET /cats/NarimanException - выбрасывает кастомное исключение
  getNarimanException(): void {
    throw new NarimanException('Это моё кастомное исключение Nariman!');
  }

  // ✅ Дополнительный метод для создания кота (если нужен)
  create(catData: Partial<Cat>): Cat {
    const newCat: Cat = {
      id: this.cats.length + 1,
      name: catData.name || 'Новый кот',
      age: catData.age || 1,
      breed: catData.breed || 'Неизвестная порода',
    };
    this.cats.push(newCat);
    return newCat;
  }
}