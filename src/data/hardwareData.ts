import { BomItem, RtosTask } from '../types';

export const BOM_ITEMS: BomItem[] = [
  {
    id: 'lilygo',
    component: 'LILYGO T-Display ESP32',
    componentEn: 'LILYGO T-Display ESP32',
    gpio: 'Вбудовано (ST7789, GPIO0, GPIO4)',
    roleUa: 'Мікроконтролер ESP32 (Wi-Fi/BLE) + кольоровий IPS-дисплей 1.14" 135×240 ST7789, USB Type-C, контролер заряду TP4054',
    roleEn: 'ESP32 MCU (Wi-Fi/BLE) + 1.14" 135x240 ST7789 IPS color display, USB Type-C, TP4054 battery charging IC',
    approxPriceUah: 380,
    approxPriceUsd: 9.5,
    notesUa: 'Готова заводська плата. Дисплей і кнопка BOOT (SW1) уже розпаяні',
    notesEn: 'Ready-to-use factory board. Display & BOOT button (SW1) onboard'
  },
  {
    id: 'ldr',
    component: 'Фоторезистор LDR (GL5516) + R 10 кОм',
    componentEn: 'Photoresistor LDR (GL5516) + 10k resistor',
    gpio: 'GPIO33 (ADC1_CH5)',
    roleUa: 'Датчик освітлення для плавного ПІ-регулятора яскравості підсвітки (не сліпить очі вночі)',
    roleEn: 'Ambient light sensor feeding the PI-regulator for auto-dimming night mode',
    approxPriceUah: 15,
    approxPriceUsd: 0.4,
    notesUa: 'Підключено до ADC1, оскільки ADC2 блокується при роботі Wi-Fi модуля ESP32',
    notesEn: 'Wired to ADC1; ADC2 is disabled when ESP32 Wi-Fi is transmitting'
  },
  {
    id: 'piezo',
    component: 'П\'єзозумер (Buzzer) + R 220 Ом',
    componentEn: 'Piezo buzzer + 220 Ohm resistor',
    gpio: 'GPIO25 (LEDC PWM)',
    roleUa: 'Акустичне сповіщення про початок і відбій тривоги з підтримкою мелодій та модуляції',
    roleEn: 'Acoustic siren and alert buzzer driven by hardware LEDC PWM frequencies',
    approxPriceUah: 25,
    approxPriceUsd: 0.6,
    notesUa: 'R 220 Ом обмежує піковий струм через п\'єзоелемент',
    notesEn: '220 Ohm resistor protects GPIO and limits peak acoustic current'
  },
  {
    id: 'led_alarm',
    component: 'Червоний індикатор тривоги (LED1) + R 330 Ом',
    componentEn: 'Red Alarm Indicator LED + 330 Ohm',
    gpio: 'GPIO2',
    roleUa: 'Апаратний світловий сигнал тривоги (пульсує при активній загрозі)',
    roleEn: 'Hardware optical alarm beacon (pulses during active threat)',
    approxPriceUah: 10,
    approxPriceUsd: 0.25,
    notesUa: 'Видно навіть з іншого кінця кімнати без погляду на екран',
    notesEn: 'Visible across the entire room without looking at the screen'
  },
  {
    id: 'led_wifi',
    component: 'Синій індикатор статусу мережі (LED2) + R 330 Ом',
    componentEn: 'Blue Network Status LED + 330 Ohm',
    gpio: 'GPIO15',
    roleUa: 'Візуалізація стану з\'єднання (горить при онлайні, блимає при підключенні/SoftAP)',
    roleEn: 'Network connectivity indicator (solid when online, blinks in SoftAP)',
    approxPriceUah: 10,
    approxPriceUsd: 0.25,
    notesUa: 'Керується апаратним таймером esp_timer окремо від завдань RTOS',
    notesEn: 'Driven by esp_timer callback independently of RTOS tasks'
  },
  {
    id: 'battery',
    component: 'Акумулятор Li-Po 602030 (3.7V, 300-500 мА·год)',
    componentEn: 'Li-Po 602030 Battery (3.7V, 300-500 mAh)',
    gpio: 'GPIO34 (ADC1_CH6) + GPIO14',
    roleUa: 'Автономне резервне живлення під час вимкнень електроенергії (до 4-6 год безперервної роботи)',
    roleEn: 'Autonomous power backup during blackouts (4-6 hours active life)',
    approxPriceUah: 95,
    approxPriceUsd: 2.4,
    notesUa: 'Підключається у штатний роз\'єм JST GH 1.25мм. Контроль напруги через дільник на GPIO14/34',
    notesEn: 'Plugs directly into JST GH 1.25mm port. Voltage monitored via switchable divider'
  },
  {
    id: 'case_3d',
    component: '3D-друкований настільний корпус',
    componentEn: '3D-printed desktop enclosure',
    gpio: 'Механіка (PLA / PETG)',
    roleUa: 'Захисний корпус із кутом нахилу 65° для ідеального огляду з робочого крісла',
    roleEn: 'Ergonomic tilted enclosure (65° angle) optimized for desktop viewing',
    approxPriceUah: 60,
    approxPriceUsd: 1.5,
    notesUa: 'STL-файли для друку доступні у репозиторії безкоштовно',
    notesEn: 'Free downloadable open-source STL models in repository'
  }
];

export const RTOS_TASKS: RtosTask[] = [
  {
    name: 'wifi_task',
    folder: 'task/wifi_task/',
    priority: 4,
    blockedOn: 'event group (тайм-аут)',
    descriptionUa: 'Підключення та перепідключення Wi-Fi, експоненційний backoff при збоях зв\'язку, авто-запуск SoftAP captive portal',
    descriptionEn: 'Wi-Fi connection maintenance, exponential backoff, auto SoftAP fallback',
    stackWatermark: 3120,
    status: 'BLOCKED'
  },
  {
    name: 'fetch_task',
    folder: 'task/fetch_task/',
    priority: 4,
    blockedOn: 'vTaskDelay (період опитування 10-15с)',
    descriptionUa: 'Виконує HTTP GET до IoT API alerts.in.ua, розбирає 27-байтовий статус у статичному 8КБ буфері (без фрагментації heap), передає результат у alert_queue',
    descriptionEn: 'HTTP GET to alerts.in.ua IoT API, 27-byte zero-fragmentation parsing, pushes to alert_queue',
    stackWatermark: 4096,
    status: 'BLOCKED'
  },
  {
    name: 'render_task',
    folder: 'task/render_task/',
    priority: 5,
    blockedOn: 'xQueueReceive(alert_queue)',
    descriptionUa: 'Єдиний власник та "письменник" framebuffer ST7789. Відмальовує векторну мапу України та кольорові стани тривог без тихих race conditions',
    descriptionEn: 'Single exclusive ST7789 framebuffer writer. Renders vectorized map without race conditions',
    stackWatermark: 2840,
    status: 'RUNNING'
  },
  {
    name: 'button_task',
    folder: 'task/button_task/',
    priority: 5,
    blockedOn: 'xQueueReceive(ISR events)',
    descriptionUa: 'Обробка переривань кнопки BOOT, апаратний дебаунс, розрізнення короткого кліку та утримання для скидання налаштувань Wi-Fi',
    descriptionEn: 'BOOT button ISR events, debounce filter, short vs long press detection for provisioning',
    stackWatermark: 1980,
    status: 'BLOCKED'
  },
  {
    name: 'buzzer_task',
    folder: 'task/buzzer_task/',
    priority: 4,
    blockedOn: 'xQueueReceive(команди)',
    descriptionUa: 'Неблокуюча сирена та звукові сигнали. Забезпечує звуковий супровід без затримки малювання чи мережі',
    descriptionEn: 'Non-blocking audio engine. Generates alerts without choking display or network tasks',
    stackWatermark: 2048,
    status: 'BLOCKED'
  },
  {
    name: 'brightness_task',
    folder: 'task/brightness_task/',
    priority: 3,
    blockedOn: 'vTaskDelay (період 500мс)',
    descriptionUa: 'ПІ-регулятор яскравості з анти-windup захистом за даними фоторезистора LDR. Плавне керування LEDC PWM підсвітки',
    descriptionEn: 'PI-regulator with anti-windup using LDR lux readings for smooth display backlight PWM',
    stackWatermark: 2210,
    status: 'BLOCKED'
  },
  {
    name: 'monitor_task',
    folder: 'task/monitor_task/',
    priority: 1,
    blockedOn: 'vTaskDelay (30с)',
    descriptionUa: 'Збір статистики CPU usage, контроль стану батареї (ADC1), репортинг у Task Watchdog Timer (TWDT) для захисту від підвисання',
    descriptionEn: 'CPU load telemetry, battery monitoring, and periodic Task Watchdog check-in',
    stackWatermark: 1760,
    status: 'BLOCKED'
  }
];
