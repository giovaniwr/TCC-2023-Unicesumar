## Sobre

TCC Giovani Welington Raitz

## Tecnologias


Utilizei a Stack: Para o Backend o laravel(php) e para o FrontEnd foi utilizado Vue.JS, no banco fui utilizado o mysql com o Xampp
## Rodando

### **Baixando o repositório**

```bash
git clone 
```

### **DataBase**

```bash
CREATE DATABASE db_tcc
```

Acesso ao banco de dados pelas credenciais

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_tcc
DB_USERNAME=root
DB_PASSWORD=
```

### **Back-end**

```bash
cd TCC-Back 
```

### Instalar as dependências 

```bash
npm install
```

### Rodar as migrations :

```bash
php artisan migrate
```

### Rodar as seeders de do Nivel:
```bash
php artisan db:seed   
```

### Projeto
> Para start o servidor

```bash
php artisan serve
```

### **Front-end**

No front-end foi utilizado Vue.js, para consumir a APi do back end, com o layout resposivo, com algumas biliotecas para seu desempenho


```bash
cd web 
```
### Instalar as dependências 

```bash
npm install
```

### Projeto
> Para start 

```bash
npm run serve
```

## End-points 

### **Nível**

**Cadastrar um novo Nivel [POST]**

```bash
/niveis
```

**Buscar os níveis existentes  [POST]**
```bash
/niveis
```

**Alterar o nível existentes  [PUT]**
```bash
niveis/id
```

Deletar o nível existentes  [DELETE]**
```bash
niveis/id
```

### **Desenvolvedores**

**Cadastrar um novo Desenvolvedor[POST]**
```bash
/desenvolvedor/desenvolvedores
```

**Buscar todos os Desenvolvedor[GET]**
```bash
/desenvolvedor/desenvolvedores
```

**Buscar um Desenvolvedor[GET]**
```bash
/desenvolvedor/desenvolvedores/id
```

**Alterar um Desenvolvedor[PUT]**
```bash
/desenvolvedor/desenvolvedores/id
```

**Buscar um Desenvolvedor[DELETE]**
```bash
/desenvolvedor/desenvolvedores/id
```
