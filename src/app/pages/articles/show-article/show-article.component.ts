import {Component, OnInit} from '@angular/core';
import {Article} from "@models/articles/article";
import {ArticleService} from "@services/article.service";
import {ActivatedRoute} from "@angular/router";
import {DatePipe, NgIf} from "@angular/common";
import {CategoryType} from "@models/articles/category-type";

@Component({
  selector: 'denmark-show-article',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './show-article.component.html',
  styles: ``
})
export class ShowArticleComponent implements OnInit {
  article: Article | undefined;
  msg = '';
  submitted = false;
  loading = true;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getArticle(id);
    }
  }

  getArticle(id: number | string) {
    this.articleService.findById(Number(id)).subscribe({
      next: (data) => {
        if (data) {
          console.log('Artigo carregado:', data);
          this.article = data;
        } else {
          console.warn('Artigo não encontrado.');
          this.msg = 'Artigo não encontrado.';
        }
        this.loading = false;
      },
      error: (e) => {
        console.error('Erro ao carregar o artigo:', e);
        this.msg = 'Erro ao carregar o artigo.';
        this.loading = false;
      }
    });
  }

  protected readonly CategoryType = CategoryType;

  getCategoryValue(category: string): string {
    return CategoryType[category as keyof typeof CategoryType] || category;
  }
}
