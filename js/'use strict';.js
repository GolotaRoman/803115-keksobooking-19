'use strict';

var OBJECTS_QUANTITY = 8;
var ARRAY_AVATAR = function () {
  return 'img/avatars/user0' + (Math.floor(Math.random() * 8) + 1) + '.png';
};
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
var LOCATION_X = Math.floor(Math.random() * document.body.offsetWidth) + 1;
var LOCATION_Y = Math.floor(Math.random() * 630) + 130;
var PIN_SIZE = 200;

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
        'avatar': ARRAY_AVATAR()
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
  var pinElements = [];

  var pins = createArrayData();
  pins.forEach(function (item) {
    var pinElement = PIN_TEMPLATE.cloneNode(true);

    pinElement.querySelector('.pin__img').src = item.author.avatar;
    pinElement.querySelector('.pin__img').alt = item.offer.title;
    pinElement.style.left = item.location.x + (PIN_SIZE * Math.random()) + 'px';
    pinElement.style.top = item.location.y + (PIN_SIZE * Math.random()) + 'px';

    pinElements.push(pinElement);
  });

  return pinElements;
};

var fragment = document.createDocumentFragment();
// createArrayData().forEach(function (item, i) {
//   var pins = getDescription(item, i);

//   pins.forEach(function (pin) {
//     fragment.appendChild(pin);
//   });
// });

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
