import { Injectable } from '@angular/core'; // Permite que o serviço seja injetado em outros lugares
import { HttpClient } from '@angular/common/http'; // Para fazer requisições HTTP
import { Observable, Subscribable } from 'rxjs'; // Para trabalhar com programação reativa (observables)

// O serviço fica disponível em toda a aplicação (providedIn: 'root')
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarioLogado: any = null; // Guarda o usuário logado em memória
  private apiUrl = 'http://localhost:3000/usuarios';  // URL do json-server (banco fake)
  currentUser$!: Observable<unknown> | Subscribable<unknown> | Promise<unknown>; // Pode ser usado futuramente para observar o usuário atual

  constructor(private http: HttpClient) {} // Injeta o HttpClient para consumir API

  // Função de login (verifica email e senha)
  login(email: string, senha: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Busca todos os usuários cadastrados no json-server
      this.http.get<any[]>(this.apiUrl).subscribe((usuarios) => {
        // Procura um usuário com email e senha correspondentes
        const usuario = usuarios.find(u => u.email === email && u.senha === senha);
        if (usuario) {
          // Se achou → salva em memória e no localStorage
          this.usuarioLogado = usuario;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          observer.next(true);  // Login bem-sucedido
        } else {
          observer.next(false);  // Usuário não encontrado
        }
        observer.complete(); // Finaliza o observable
      });
    });
  }

  // Função de logout (remove usuário da memória e do localStorage)
  logout() {
    this.usuarioLogado = null;
    localStorage.removeItem('usuario');
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    // Se não tem usuário em memória, tenta recuperar do localStorage
    if (!this.usuarioLogado) {
      const user = localStorage.getItem('usuario');
      this.usuarioLogado = user ? JSON.parse(user) : null;
    }
    // Retorna true se tiver usuário logado
    return !!this.usuarioLogado;
  }

  // Retorna o perfil/tipo do usuário logado
  getPerfilUsuario(): string {
    const user = localStorage.getItem('usuario');
    if (user) {
      const usuario = JSON.parse(user);
      return usuario.tipo || ''; // Ex.: 'admin', 'corretor', 'cliente' etc.
    }
    return '';
  }

  // Cadastra um novo cliente no json-server
  cadastrarCliente(nome: string, email: string, senha: string, tipo: string): Observable<any> {
    const novoCliente = { nome, email, senha, tipo };

    // Faz POST no endpoint do json-server
    return this.http.post(this.apiUrl, novoCliente);
  }
}
