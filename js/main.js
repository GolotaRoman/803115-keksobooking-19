'use strict';

var OBJECTS_QUANTITY = 8;
var ARRAY_AVATAR = 'img/avatars/user0' + Math.floor(Math.random() * 8) + '.png';
var ARRAY_TITLE = 'some random title';
var ARRAY_ADDRESS = 'location.x, location.y';
var ARRAY_PRICE = Math.floor(Math.random() * 1000);
var ARRAY_TYPE = ['flat', 'palace', 'house', 'bungalo'];
var ARRAY_ROOMS = Math.floor((Math.random() * 3) + 1);
var ARRAY_QUESTS = Math.floor((Math.random() * 4) + 1);
var ARRAY_CHECKIN = ['12:00', '13:00', '14:00'];
var ARRAY_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi',
  'dishwasher',
  'parking', 'washer',
  'elevator',
  'conditioner'];
var ARRAY_DESCRIPTION = 'some random description';
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_X = Math.floor(Math.random() * 3000);
var LOCATION_Y = Math.floor(Math.random() * 500 + 130);
var PIN_SIZE = 40;

var MAP = document.querySelector('.map');
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WRAPPER = document.querySelector('.map__pins');

var getRandomLength = function (data) { // Возвращает массив рандомной длины
  data.length = Math.floor(Math.random() * data.length + 1);
  return data;
};

var getRandomValue = function (value) { // Возвращает рандомный элемент массива
  return value[Math.floor(Math.random() * value.length)];
};

var array = [];

// 1.Функция для создания массива из сгенерированных объектов.

var createArrayData = function () {
  for (var i = 0; i < OBJECTS_QUANTITY; i++) {
    array.push({
      'author': {
        'avatar': ARRAY_AVATAR
      },
      'offer': {
        'title': ARRAY_TITLE,
        'address': ARRAY_ADDRESS,
        'price': ARRAY_PRICE,
        'type': getRandomValue(ARRAY_TYPE),
        'rooms': ARRAY_ROOMS,
        'quests': ARRAY_QUESTS,
        'checkin': getRandomValue(ARRAY_CHECKIN),
        'checkout': getRandomValue(ARRAY_CHECKOUT),
        'features': getRandomLength(FEATURES),
        'description': ARRAY_DESCRIPTION,
        'photos': getRandomLength(PHOTOS)
      },
      'location': {
        'x': LOCATION_X,
        'y': LOCATION_Y
      }
    });
  }
  return array;
};

// 2. У блока .map убран класс .map--faded.

MAP.classList.remove('map--faded');

// 3. Создание DOM элементов и заполнение их данными из массива.

var getDescription = function () {
  var pinElement = PIN_TEMPLATE.cloneNode(true);
  createArrayData().forEeach(function (item) {
    pinElement.querySelector('.pin__img').src = item.avatar;
    pinElement.querySelector('.pin__img').alt = item.title;
    pinElement.querySelector('.map-pin').style.left = item.location.x + (PIN_SIZE * Math.random());
    pinElement.querySelector('.map-pin').style.top = item.location.y + (PIN_SIZE * Math.random());
  });
  return pinElement;
};

var fragment = document.createDocumentFragment();
createArrayData().forEach(function (item, i) {
  fragment.appendChild(getDescription(item, i));
});

// 4. Отрисовка сгенерированных DOM-элементов в блок .map__pins.

PIN_WRAPPER.appendChild(fragment);
