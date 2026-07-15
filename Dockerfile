# syntax=docker/dockerfile:1

# Stage 1: install dependencies, run all checks, and build the React production files.
FROM node:20-alpine AS build

WORKDIR /Habeeb_Mohamed_ui_garden_build_checks

COPY package.json package-lock.json ./

ENV HUSKY=0
RUN npm ci --no-audit --no-fund

COPY . .

ENV CI=true
RUN npm run quality
RUN npm run build

# Stage 2: serve only the optimized production files with Nginx.
FROM nginx:1.27-alpine AS production

LABEL assignment.container.name="Habeeb_Mohamed_coding_assignment13"
LABEL assignment.course="WEBD-3012"
LABEL assignment.student="Mohamed Habeeb"

WORKDIR /Habeeb_Mohamed_ui_garden_build_checks

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /Habeeb_Mohamed_ui_garden_build_checks/build ./

EXPOSE 8018

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8018/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
