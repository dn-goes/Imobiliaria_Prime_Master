import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImoveisService } from 'src/app/core/services/imoveis.service';

@Component({
  selector: 'app-detalhes-imovel',
  templateUrl: './detalhes-imovel.component.html',
  styleUrls: ['./detalhes-imovel.component.scss']
})
export class DetalhesImovelComponent implements OnInit {
  imovel: any = null;
  erro: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private imoveisService: ImoveisService
  ) {}

  ngOnInit(): void {
    // Obter o ID da rota
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam); // Converta para número

      if (isNaN(id)) {
        this.erro = 'ID inválido.';
        return;
      }

      this.carregarImovel(id);
    } else {
      this.erro = 'ID não encontrado.';
    }
  }

  

  carregarImovel(id: number): void {
    this.imoveisService.getImovel(id).subscribe({
      next: (data) => {
        this.imovel = data;
      },
      error: (err) => {
        console.error('Erro ao carregar imóvel:', err);
        this.erro = 'Erro ao carregar imóvel.';
      }
    });
  }
}