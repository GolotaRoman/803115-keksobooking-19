'use strict';

// Константы
var OBJECTS_QUANTITY = 8;
var TITLE = 'some random title';
var LOCATION = 'location.x, location.y';
var DESCRIPTION = 'some random description';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOUSING_TYPES = [
  'flat',
  'palace',
  'house',
  'bungalo'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
var MAP = document.querySelector('.map');
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WRAPPER = document.querySelector('.map__pins');
var PIN_SIZE = 40;

// Функции
var generateRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomLength = function (data) { // Возвращает массив рандомной длины
  var copy = data.slice();
  copy.length = generateRandomInt(0, copy.length - 1);
  return copy;
};

var getRandomValue = function (value) { // Возвращает рандомный элемент массива
  return value[Math.floor(Math.random() * value.length)];
};

// Переменные
var array = [];

// 1.Функция для создания массива из сгенерированных объектов.

var createArrayData = function (i) {
  for (i = 0; i < OBJECTS_QUANTITY; i++) {
    array.push({
      'author': {
        'avatar': 'img/avatars/user0' + generateRandomInt(1, 8) + '.png'
      },
      'offer': {
        'title': TITLE,
        'address': LOCATION,
        'price': generateRandomInt(1000, 10000),
        'type': getRandomValue(HOUSING_TYPES),
        'rooms': generateRandomInt(1, 4),
        'quests': generateRandomInt(1, 5),
        'checkin': getRandomValue(CHECKIN_CHECKOUT_TIME),
        'checkout': getRandomValue(CHECKIN_CHECKOUT_TIME),
        'features': getRandomLength(FEATURES),
        'description': DESCRIPTION,
        'photos': getRandomLength(PHOTOS)
      },
      'location': {
        'x': generateRandomInt(1, document.body.offsetWidth),
        'y': generateRandomInt(130, 630)
      }
    });
  }
  return array;
};

// 2. У блока .map убран класс .map--faded.

MAP.classList.remove('map--faded');

// 3. Создание DOM элементов и заполнение их данными из массива.

var fragment = document.createDocumentFragment();

function getPinElement(pinObject) {
  var pinElement = PIN_TEMPLATE.cloneNode(true);

  pinElement.querySelector('.pin__img').src = pinObject.author.avatar;
  pinElement.querySelector('.pin__img').alt = pinObject.offer.title;
  pinElement.style.left = pinObject.location.x + (PIN_SIZE * Math.random()) + 'px';
  pinElement.style.top = pinObject.location.y + (PIN_SIZE * Math.random()) + 'px';

  return pinElement;
}

function generatePins() {
  var pinObjects = createArrayData();

  pinObjects.forEach(function (item) {
    var pinElement = getPinElement(item);

    fragment.appendChild(pinElement);
  });
}

generatePins();
// 4. Отрисовка сгенерированных DOM-элементов в блок .map__pins.

PIN_WRAPPER.appendChild(fragment);
