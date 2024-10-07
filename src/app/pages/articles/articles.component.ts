import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {Article} from "@models/articles/article";
import {ArticleService} from "@services/article.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  MatTableDataSource
} from "@angular/material/table";
import {SharedImports} from "../../shared/imports/SharedImports";
import {ErrorService} from "@services/errors/error.service";

@Component({
  selector: 'denmark-articles',
  standalone: true,
  imports: [
    RouterOutlet,
    DatePipe,
    NgIf,
    NgForOf,
    FormsModule,
    SharedImports
  ],
  templateUrl: './articles.component.html',
  styles: ``
})
export class ArticlesComponent {
  displayedColumns: string[] = ['title', 'createdBy', 'createdAt','photoUrl', 'actions'];
  dataSource = new MatTableDataSource<Article>();
  articles: Article[] = [];
  filterTitle: string = '';
  filterAuthor: string = '';

  constructor(private articleService: ArticleService, private router: Router, private error: ErrorService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    const filters = {
      title: this.filterTitle,
      author: this.filterAuthor,
    };

    this.articleService.findAll(filters).subscribe(
      articles => {
        this.dataSource.data = articles;
        console.log('Artigos:', articles);
      },
      error => {
        this.error.handleError(error);
      }
    );
  }

  getArticleImage(photoUrl: string | undefined): string {
    return photoUrl ? photoUrl : 'assets/images/article_default.jpg';
  }


  redirectToNewArticle(): void {
    this.router.navigate(['/']).then(r => r); // TODO path correto
  }

  // deleteArticle(id: number | string) {
  //   if (confirm('Você tem certeza de que deseja excluir este artigo?')) {
  //     this.articleService.delete(id).subscribe({
  //       next: () => this.loadArticles(),
  //       error: (e) => console.error('Erro:', e),
  //     });
  //   }
  // }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
