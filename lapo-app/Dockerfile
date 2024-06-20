# Вказуємо базовий образ з Node.js
FROM node:16 as builder

# Встановлюємо робочу директорію всередині контейнера
WORKDIR /app

# Копіюємо package.json та package-lock.json (якщо він є)
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів додатку
COPY . .

# Будуємо додаток
RUN npm run build

# Встановлюємо Nginx для сервінгу статичних файлів
FROM nginx:alpine

# Копіюємо побудовані файли у відповідну директорію Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо Nginx
CMD ["nginx", "-g", "daemon off;"]
