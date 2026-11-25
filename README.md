
# ELEC 3 - Node.js

**Name:** John Nicole R Adolfo  
**Section:** IV-BSIT A  
**Course:** ELEC 3 - Node.js

## Set 1 Activities

### N1 - Project Setup and Package Management

A Node.js project that demonstrates npm initialization, package.json configuration, and installation of dependencies and development dependencies.

**Activity Folder:** [N1](set1/n1-setup/)

**How to Run:**

```bash
cd set1/n1-setup
npm install
npm start
```

**Sample Outputs:**

![N1 Versions](set1/n1-setup/screenshots/n1_versions.png)

![N1 Package JSON](set1/n1-setup/screenshots/n1_package_json.png)

![N1 Start](set1/n1-setup/screenshots/n1_start.png)

### N2 - Modular Calculator

A command-line calculator using custom modules and the built-in path module. It supports addition, subtraction, multiplication, division, and average, with error handling.

**Activity Folder:** [N2](set1/n2-calculator/)

**How to Run:**

```bash
node set1/n2-calculator/index.js add 12 8
```

**Sample Outputs:**

![N2 Operations](set1/n2-calculator/screenshots/n2_operations.png)

![N2 Errors](set1/n2-calculator/screenshots/n2_errors.png)

### N3 - File Manager with fs and path

A command-line file manager that uses the built-in fs and path modules to create, read, update, delete, and list text files.

**Activity Folder:** [N3](set1/n3-file-manager/)

**How to Run:**

```bash
node set1/n3-file-manager/index.js list
```

**Sample Outputs:**

![N3 Create and Read](set1/n3-file-manager/screenshots/n3_create_read.png)

![N3 Update](set1/n3-file-manager/screenshots/n3_update.png)

![N3 Delete](set1/n3-file-manager/screenshots/n3_delete.png)

![N3 List](set1/n3-file-manager/screenshots/n3_list.png)



---

## Set 2 – Node.js Activities

### N4 – Basic HTTP Server

A Node.js HTTP server with Home, About, Contact, and 404 pages.

**Folder:** [N4](set2/n4-server/)

**Run:**
`node set2/n4-server/server.js`

**Screenshots:**

![N4 Home](set2/n4-server/screenshots/n4_home.png)

![N4 About](set2/n4-server/screenshots/n4_about.png)

![N4 Contact](set2/n4-server/screenshots/n4_contact.png)

![N4 404](set2/n4-server/screenshots/n4_404.png)

### N5 – Books REST API

A REST API that supports GET, POST, PUT, and DELETE requests for managing books.

**Folder:** [N5](set2/n5-api/)

**Run:**
`node set2/n5-api/server.js`

**Endpoints:**
- GET /api/books
- GET /api/books/:id
- POST /api/books
- PUT /api/books/:id
- DELETE /api/books/:id

### N6 – Middleware and API Testing

A Books REST API with request logging and automatic JSON response headers.

**Folder:** [N6](set2/n6-middleware/)

**Run:**
`node set2/n6-middleware/server.js`

**Screenshots:**

![N6 JSON Header](set2/n6-middleware/screenshots/n6_json_header.png)

![N6 Logger](set2/n6-middleware/screenshots/n6_logger.png)

![N6 GET](set2/n6-middleware/screenshots/n6_get.png)

![N6 POST](set2/n6-middleware/screenshots/n6_post.png)

![N6 PUT](set2/n6-middleware/screenshots/n6_put.png)

![N6 DELETE](set2/n6-middleware/screenshots/n6_delete.png)

**Written Answers:** [N6_answers.docx](set2/n6-middleware/N6_answers.docx)
