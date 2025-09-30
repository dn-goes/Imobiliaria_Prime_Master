import { inject } from '@angular/core'; // Permite injetar dependências fora de classes
import { CanActivateFn, Router } from '@angular/router'; // CanActivateFn define o tipo do guarda de rota
import { AuthService } from '../services/auth.service'; // Serviço de autenticação

// Declaração do guarda de rota (authGuard)
export const authGuard: CanActivateFn = (route, state) => {
  // Injeta o serviço de autenticação
  const authService = inject(AuthService);
  // Injeta o roteador para permitir navegação programática
  const router = inject(Router);

  // Verifica se o usuário está autenticado
  if (authService.isAuthenticated()) {
    return true; // Usuário autenticado → rota liberada
  } else {
    router.navigate(['/login']); // Redireciona para a página de login
    return false; // Bloqueia o acesso à rota
  }
};
