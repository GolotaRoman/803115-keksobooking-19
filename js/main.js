'use strict';

// Константы
var OBJECTS_QUANTITY = 8;
var TITLE = 'some random title';
var LOCATION = 'location.x, location.y';
var DESCRIPTION = 'some random description';
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var CHECKIN_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var HOUSING_TYPES = [
  'flat',
  'palace',
  'house',
  'bungalo'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var MAP = document.querySelector('.map');
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WRAPPER = document.querySelector('.map__pins');
var PIN_SIZE = 40;
var Keys = {
  ESC: 'Escape',
  ENTER: 'Enter'
};

// Переменные
var array = [];
var forms = document.querySelector('.ad-form');
var filters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var mainPinElementX = document.querySelector('.map__pin--main').style.left;
var mainPinElementY = document.querySelector('.map__pin--main').style.top;
var address = document.querySelector('#address');
var filter = document.querySelector('.map__filters');
var mapFilters = filter.children;

// Функции
var generatePins = function () { // Отрисовывает пины на странице
  var pinObjects = createArrayData();

  pinObjects.forEach(function (item) {
    var pinElement = getPinElement(item);

    fragment.appendChild(pinElement);
  });
  console.log('+');
};

var generateRandomInt = function (min, max) { // Возвращает рандомное число в заданном диапазоне
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomLength = function (data) { // Возвращает массив рандомной длины
  var copy = data.slice();
  copy.length = generateRandomInt(0, copy.length - 1);
  return copy;
};

var turnPageInactive = function () { // Приводит страницу в неактивное состояние
  for (var i = 0; i < forms.children.length; i++) {
    forms.children[i].setAttribute('disabled', true);
  }
  for (i = 0; i < filters.children.length; i++) {
    filters.children[i].setAttribute('disabled', true);
  }
  MAP.classList.add('map--faded');
};

var turnPageActive = function () { // Приводит страницу в активное состояние
  generatePins();
  for (var i = 0; i < forms.children.length; i++) {
    forms.children[i].setAttribute('disabled', false);
  }
  for (i = 0; i < filters.children.length; i++) {
    filters.children[i].setAttribute('disabled', false);
  }
  for (i = 0; i < mapFilters.length; i++) {
    mapFilters[i].removeAttribute('disabled');
  }
  MAP.classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');

  for (i = 2; i < document.querySelector('.map__pins').children.length; i++) {
    document.querySelector('.map__pins').children[i].removeAttribute('hidden');
  }

  for (i = 2; i < document.querySelector('.ad-form').children.length; i++) {
    document.querySelector('.ad-form').children[i].removeAttribute('disabled');
  }
  document.querySelector('.ad-form__element').removeAttribute('disabled');
};

var fillInTheAddressField = function () { // Заполнение поля Адрес
  address.placeholder = parseInt(mainPinElementX, 10) + ',' + parseInt(mainPinElementY, 10);
};

// 3.2.1.Функция для создания массива из сгенерированных объектов.

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
        'type': HOUSING_TYPES[generateRandomInt(0, CHECKIN_CHECKOUT_TIME.length)],
        'rooms': generateRandomInt(1, 4),
        'quests': generateRandomInt(1, 5),
        'checkin': CHECKIN_CHECKOUT_TIME[generateRandomInt(0, CHECKIN_CHECKOUT_TIME.length)],
        'checkout': CHECKIN_CHECKOUT_TIME[generateRandomInt(0, CHECKIN_CHECKOUT_TIME.length)],
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

// 3.2.2. У блока .map убран класс .map--faded.

MAP.classList.remove('map--faded');

// 3.2.3. Создание DOM элементов и заполнение их данными из массива.

var fragment = document.createDocumentFragment();

function getPinElement(pinObject) {
  var pinElement = PIN_TEMPLATE.cloneNode(true);

  pinElement.querySelector('.pin__img').src = pinObject.author.avatar;
  pinElement.querySelector('.pin__img').alt = pinObject.offer.title;
  pinElement.style.left = pinObject.location.x + (PIN_SIZE * Math.random()) + 'px';
  pinElement.style.top = pinObject.location.y + (PIN_SIZE * Math.random()) + 'px';

  return pinElement;
}

// 3.2.4. Отрисовка сгенерированных DOM-элементов в блок .map__pins.

PIN_WRAPPER.appendChild(fragment);

// Модуль 4.2

turnPageInactive(); // Приводит страницу в стартовое неактивное состояние

mapPinMain.addEventListener('mousedown', function (evt) { // Приводит страницу в активное состояние при нажатии на пин ЛКМ мыши
  if (evt.which === 1) {
    turnPageActive();
  }
});

mapPinMain.addEventListener('keydown', function (evt) { // Приводит страницу в активное состояние при нажатии Enter
  if (evt.key === Keys.ENTER_KEY) {
    turnPageActive();
  }
});

fillInTheAddressField(); // Заполнение поля Адрес

var numberOfRooms = document.querySelector('#room_number');
var numberOfGuests = document.querySelector('#capacity');

numberOfRooms.addEventListener('change', function () { // Выдает сообщение об ошибке при неправильном выборе количества комнат
  console.log(numberOfGuests.value > numberOfRooms.value);
  if (numberOfGuests.value > numberOfRooms.value) {
    numberOfRooms.setCustomValidity('Вы ввели число комнат менее количества гостей');
  }
});

numberOfGuests.addEventListener('change', function () { // Выдает сообщение об ошибке при неправильном выборе количества комнат
  console.log(numberOfGuests.value > numberOfRooms.value);
  if (numberOfGuests.value > numberOfRooms.value) {
    numberOfRooms.setCustomValidity('Вы ввели число комнат менее количества гостей');
  }
});
