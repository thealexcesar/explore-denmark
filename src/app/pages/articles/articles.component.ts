import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {Article} from "@models/articles/article";
import {ArticleService} from "@services/article.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ErrorService} from "@services/error.service";
import {SharedImports} from "../../shared/imports/SharedImports";

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
