# Angular Material Boilerplate

A comprehensive Angular Material boilerplate application with code splitting, dynamic CRUD services, Docker support, and preparation for future authentication integration.

## Features

- **Angular 15+ with Angular Material**: Modern UI components
- **Lazy Loading**: Code splitting for optimal performance
- **Dynamic CRUD Service**: Easily connect to any API
- **Authentication Ready**: Prepared for future auth integration
- **Docker Support**: Easy deployment with dynamic configuration
- **Responsive Design**: Works on all device sizes
- **Well-Structured**: Organized code with best practices

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- Angular CLI (\`npm install -g @angular/cli\`)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/angular-material-boilerplate.git
   cd angular-material-boilerplate
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   ng serve
   \`\`\`

4. Open your browser and navigate to \`http://localhost:4200\`

## Project Structure

\`\`\`
angular-material-boilerplate/
├── src/
│   ├── app/
│   │   ├── core/                  # Core module (services, guards, interceptors)
│   │   │   ├── auth/              # Authentication services
│   │   │   ├── http/              # HTTP interceptors
│   │   │   ├── services/          # Global services
│   │   │   └── core.module.ts
│   │   ├── features/              # Feature modules (lazy loaded)
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   └── settings/
│   │   ├── shared/                # Shared components, directives, pipes
│   │   │   ├── components/
│   │   │   ├── directives/
│   │   │   ├── pipes/
│   │   │   └── shared.module.ts
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts
│   │   └── app.module.ts
│   ├── assets/
│   ├── environments/
│   └── styles/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── README.md
\`\`\`

## Using the CRUD Service

The dynamic CRUD service makes it easy to connect to any API endpoint:

\`\`\`typescript
// Example usage in a component
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../core/services/crud.service';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  
  // Inject the service with the endpoint name
  constructor(private userService: CrudService<User>) {
    // Initialize with the endpoint
    this.userService = new CrudService<User>(http, 'users');
  }
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.userService.getAll().subscribe(
      data => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }
  
  addUser(user: User): void {
    this.userService.create(user).subscribe(
      newUser => this.users.push(newUser),
      error => console.error('Error adding user', error)
    );
  }
  
  // And so on for update, delete, etc.
}
\`\`\`


## Using auth service

The auth service makes it easy to connect to any API endpoint:

\`\`\`typescript
// Example usage in a component
// Example usage in a component
import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.loginForm).subscribe(
      response => {
        // Store token
        this.authService.setToken(response.token);
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error => console.error('Login failed', error)
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe(
      user => console.log('Current user:', user),
      error => console.error('Error fetching user', error)
    );
  }
}
\`\`\`

## Add new menu and routing

To add a new feature/menu to the application:

  1. Create a new feature module:
    ```bash
    ng generate module features/products --routing
    ```
  2. Create the main component for the feature:
    ```bash
    ng generate component features/products/products
    ```
  3. Update the feature routing module (src/app/features/products/products-routing.module.ts):
   \`\`\`typescript
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { ProductsComponent } from './products.component';

    const routes: Routes = [
      {
        path: '',
        component: ProductsComponent
      }
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    })
    export class ProductsRoutingModule { }
    \`\`\`

  4. Update the feature module to import necessary modules (src/app/features/products/products.module.ts):

    \`\`\`typescript

    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { ProductsRoutingModule } from './products-routing.module';
    import { ProductsComponent } from './products.component';
    import { SharedModule } from '../../shared/shared.module';

    @NgModule({
      declarations: [
        ProductsComponent
      ],
      imports: [
        CommonModule,
        ProductsRoutingModule,
        SharedModule
      ]
    })
    export class ProductsModule { }
    \`\`\`

  5. Update the main routing module (src/app/app-routing.module.ts):

    \`\`\`typescript

    {
      path: 'products',
      loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
    },
    \`\`\`

  6. Add the new menu item to the sidebar in app.component.html

    \`\`\`html
    <a mat-list-item routerLink="/products" routerLinkActive="active-link">Products</a>
     \`\`\`

 
## Docker Deployment

To deploy the application using Docker:

1. Build and run with Docker Compose:
   \`\`\`bash
   docker-compose up -d
   \`\`\`

2. With custom configuration:
   \`\`\`bash
   APP_NAME=\"My Custom App\" API_URL=\"https://api.example.com\" PORT=8080 docker-compose up -d
   \`\`\`

## Authentication Integration

The boilerplate includes an authentication service that's ready to be connected to your authentication API. To use it:

1. Update the API endpoints in the \`AuthService\`
2. Implement the login/register components
3. Add route guards to protect routes

## Customization

### Changing the App Name

1. Update the \`appName\` in the environment files
2. For Docker deployment, set the \`APP_NAME\` environment variable

### Connecting to Your API

1. Update the \`apiUrl\` in the environment files
2. For Docker deployment, set the \`API_URL\` environment variable

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
